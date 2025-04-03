"use server";
import { compare } from "bcryptjs";
import prisma from "@/utils/db";

export async function loginUser(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return { error: "Invalid email or password." };
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return { error: "Invalid email or password." };
    }

    return { success: "Login successful!", role: user.role };
  } catch (error) {
    console.error("Login Error:", error);
    return { error: "Something went wrong. Please try again." };
  }
}
