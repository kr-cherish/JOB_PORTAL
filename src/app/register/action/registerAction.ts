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
    skills?: string;
    experience?: number;
    bio?: string;
}) {
    console.log("🚀 ~ formData:", formData)
    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: formData.email },
        });
        console.log("🚀 ~ existingUser:", existingUser)

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
                resume: formData.role === "USER" ? formData.resume : null,
                skills: formData.role === "USER" ? formData.skills : null,
                experience: formData.role === "USER" ? formData.experience?.toString() : null,
                bio: formData.role === "USER" ? formData.bio : null,
            },
        });
        console.log(newUser);

        return { success: "User registered successfully!", user: newUser };
    } catch (error: any) {
        console.error("Registration Error:", error);
        return { error: "Something went wrong. Please try again." };
    }
}
