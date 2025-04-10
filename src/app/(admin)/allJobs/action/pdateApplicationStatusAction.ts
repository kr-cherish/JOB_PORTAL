"use server";

import { prisma } from "@/utils/db";

export async function updateApplicationStatus(applicationId: string, status: "ACCEPTED" | "REJECTED") {
  try {
    const updated = await prisma.appliedJob.update({
      where: { id: applicationId },
      data: { status },
    });
    return updated;
  } catch (error) {
    console.error("Error updating status", error);
    throw error;
  }
}
