'use server';

import { prisma } from '@/utils/db';

export async function searchJobsByTitle(searchTerm: string) {
  const jobs = await prisma.job.findMany({
    where: {
      title: {
        contains: searchTerm,
        mode: 'insensitive', 
      },
    },
    include: {
      company: true,
    },
  });

  return jobs;
}
