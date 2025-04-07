'use server';

import { auth } from "@/utils/auth";
import prisma from "@/utils/db";

export const getMyCompany = async (session) => {
 
  const userId = session?.user?.id;
  if (!session?.user?.email) return null;
  if (!userId) return null;
 
  const company = await prisma.company.findFirst({
    where: {
      userId, 
    },
  });
  console.log("🚀 ~ getMyCompany ~ company:", company)

  return company;

};
