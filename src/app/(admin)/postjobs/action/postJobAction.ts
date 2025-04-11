"use server";
import { prisma } from "@/utils/db";
interface JobForm {
  title: string;
  description: string;
  salary: string;
  location: string;
  skills: string;
  experience: string;
}

export async function postJobAction(formData: JobForm,session:any) {
  // console.log("🚀 ~ postJobAction ~ session:", session)
  try {
    
    if (!session || !session.user?.email) {
      throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const company = await prisma.company.findUnique({
      where: { userId: user.id },
    });

    if (!company) {
      throw new Error("Please add a company profile before posting a job.");
    }

    await prisma.job.create({
      data: {
        title: formData.title,
        description: formData.description,
        salary: formData.salary,
        location: formData.location,
        skills: formData.skills,
        experience: formData.experience,
        companyId: company.id,
        createdBy: user.id,
      },
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to post job" };
  }
}
