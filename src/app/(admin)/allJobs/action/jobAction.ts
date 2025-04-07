import prisma from "@/utils/db";
export const getMyPostedJobs = async (session:any) => {
    const userEmail = session?.user?.email;
  
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: { company: true },
    });
  
    if (!user || !user.company) return [];
  
    const jobs = await prisma.job.findMany({
      where: { companyId: user.company.id },
    });
  
    return jobs;
  };
  