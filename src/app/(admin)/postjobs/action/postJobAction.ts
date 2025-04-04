"use server";

import prisma from "@/utils/db";

export async function postJob(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const companyId = formData.get("companyId") as string;
    const createdBy = formData.get("createdBy") as string;
    const salary = formData.get("salary") as string;
    const location = formData.get("location") as string;
    const skills = formData.get("skills") as string;
    const experience = formData.get("experience") as string;

    if (!title || !description || !companyId || !createdBy) {
      return { error: "All required fields must be filled." };
    } 

    await prisma.job.create({
      data: {
        title,
        description,
        companyId,
        createdBy,
        salary,
        location,
        skills,
        experience,
      },
    });

    return { success: "Job posted successfully!" };
  } catch (error) {
    console.error("Error posting job:", error);
    return { error: "Something went wrong. Please try again." };
  }
}
