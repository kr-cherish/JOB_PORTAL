"use server";
import { compare } from "bcryptjs";
import prisma from "@/utils/db";
import { signIn } from "@/utils/auth";

export async function loginUser(email: string, password: string) {
  try {
    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return { error: "Invalid email or password." };
    }

    // Compare password
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return { error: "Invalid email or password." };
    }

    // Create session
    await signIn(user.id, user.email, user.role);

    return { success: "Login successful!", role: user.role };
  } catch (error) {
    console.error("Login Error:", error);
    return { error: "Something went wrong. Please try again." };
  }
}
