// app/(admin)/allJobs/action/jobAction.ts

"use server";

import prisma from "@/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const getMyPostedJobs = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return [];

    const company = await prisma.company.findFirst({
      where: {
        user: {
          email: session.user.email,
        },
      },
    });

    if (!company) {
      console.log("No company found for this admin.");
      return [];
    }

    const jobs = await prisma.job.findMany({
      where: {
        companyId: company.id,
      },
      include: {
        company: true,
      },
    });

    return jobs;
  } catch (error) {
    console.error("Error in getMyPostedJobs:", error);
    return [];
  }
};
