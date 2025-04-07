"use server";

import prisma from "@/utils/db";
import { FORMDATA } from "@/components/adminCompnay";

export const createCompany = async (formData: FORMDATA, session: any) => {
  const userId = session?.user?.id;
  if (!userId) throw new Error("Unauthorized");

  try {
    await prisma.company.create({
      data: {
        name: formData.name,
        description: formData.description,
        logo: formData.logo,
        website: formData.website,
        employeeSize: formData.employeeSize,
        foundedYear: formData.foundedYear,
        specialities: formData.specialities,
        overview: formData.overview,
        userId: userId
      },
    });
    return { success: true };
  } catch (error: any) {
    console.error("Error creating company:", error);
    return { success: false, error: error.message };
  }
};
