"use server";

import prisma from "@/utils/db";
import {FORMDATA} from "@/app/(admin)/adminCompany/page"
export const createCompany = async (formData:FORMDATA) => {
  console.log("🚀 ~ createCompany ~ formData:", formData)
  try {
   

    await prisma.company.create({
      data: {

        name:formData.name,
        description:formData.description,
        logo:formData.logo,
        website:formData.website,
        employeeSize:formData.employeeSize,
        foundedYear:formData.foundedYear,
        specialities:formData.specialities,
        overview:formData.overview,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating company:", error);
    // throw new Error("Failed to create company");
  }
};
