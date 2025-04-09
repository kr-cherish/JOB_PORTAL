import { getMyPostedJobs } from "./action/jobAction";
import JobList from "@/components/admin/allJobs"; 

export default async function AllJobsPage() {
  const jobs = await getMyPostedJobs();

  return <JobList jobs={jobs} />;
}
