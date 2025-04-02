"use server";
import { hash } from "bcryptjs";
import prisma from "@/utils/db";

export async function registerUser(formData: {
  fname: string;
  lname: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
  resume?: string;
}) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: formData.email },
    });

    if (existingUser) {
      return { error: "Email is already in use." };
    }

    const hashedPassword = await hash(formData.password, 10);

    const newUser = await prisma.user.create({
      data: {
        fname: formData.fname,
        lname: formData.lname,
        email: formData.email,
        password: hashedPassword,
        role: formData.role,
        resume: formData.role === "USER" ? formData.resume || "" : null,
      },
    });

    return { success: "User registered successfully!", user: newUser };
  } catch (error: any) {
    console.error("Registration Error:", error);

    if (error.code === "P2002") {
      return { error: "Email is already registered." }; 
    }

    return { error: "Something went wrong. Please try again." };
  }
}
