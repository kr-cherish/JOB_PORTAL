import { getAllJobs } from "@/app/(user)/allJobsUser/action/allJobsAction";
import JobListClient from "@/components/allJobsUser";

export default async function AllJobsUserPage() {
  const jobs = await getAllJobs();
  return <JobListClient jobs={jobs} />;
}
