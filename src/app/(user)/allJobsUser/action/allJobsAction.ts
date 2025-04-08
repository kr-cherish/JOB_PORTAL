// app/(user)/allJobsUser/action/allJobsAction.ts
import prisma from "@/utils/db";

export const getAllJobs = async () => {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        company: true,
      }
    });

    return jobs;
  } catch (error) {
    console.error("Error fetching all jobs:", error);
    return [];
  }
};
