"use server";
import { prisma } from "@/utils/db";

export const getJobsWithApplicants = async (jobId: string) => {
  console.log("🚀 ~ getJobsWithApplicants ~ jobId:", jobId)
  try {
    const appliedUsers = await prisma.appliedJob.findMany({
      where: {
        jobId: jobId,
      },
      include: {
        user: true, // this fetches the related user data
      },
    });
    console.log("✅ Fetched jobs with applicants:", JSON.stringify(appliedUsers, null, 2)); // TEMP log

    return appliedUsers;
  } catch (error) {
    console.error("Error fetching jobs with applicants:", error);
    throw new Error("Failed to fetch job applicants");
  }
};