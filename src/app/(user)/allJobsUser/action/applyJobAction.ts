"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/utils/db";

export const applyToJob = async (jobId: string) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return { success: false, message: "Not authenticated" };

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return { success: false, message: "User not found" };

  // Prevent double application
  const alreadyApplied = await prisma.appliedJob.findFirst({
    where: {
      userId: user.id,
      jobId,
    },
  });

  if (alreadyApplied) {
    return { success: false, message: "Already applied" };
  }

  await prisma.appliedJob.create({
    data: {
      userId: user.id,
      jobId,
    },
  });

  return { success: true };
};

export const getAppliedJobIds = async (): Promise<string[]> => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return [];

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return [];

  const applications = await prisma.appliedJob.findMany({
    where: { userId: user.id },
    select: { jobId: true },
  });

  return applications.map((app) => app.jobId);
};
