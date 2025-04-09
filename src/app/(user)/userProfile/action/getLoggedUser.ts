"use server";

import { prisma } from "@/utils/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const getLoggedInUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      fname: true,
      lname: true,
      email: true,
      role: true,
      skills: true,
      experience: true,
      bio: true,
      resume: true,
    },
  });

  return user;
};
