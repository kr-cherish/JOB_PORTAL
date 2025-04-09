"use server";

import { prisma } from "@/utils/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const getMyAppliedJobs = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return [];

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return [];

  const applied = await prisma.appliedJob.findMany({
    where: { userId: user.id },
    include: {
      job: {
        include: {
          company: true,
        },
      },
    },
  });

  return applied.map((item) => ({
    id: item.job.id,
    title: item.job.title,
    description: item.job.description,
    skills: item.job.skills,
    experience: item.job.experience,
    salary: item.job.salary,
    location: item.job.location,
    company: {
      name: item.job.company?.name || "Unknown Company",
    },
  }));
};
