"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/utils/db";

export const applyToJob = async (jobId: string) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await prisma.appliedJob.create({
      data: {
        userId: session.user.id,
        jobId,
        // resume:  // add resume if needed
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Apply Job Error:", error);
    return { success: false, message: "Already applied or internal error" };
  }
};
