import { getMyPostedJobs } from "./action/jobAction";
import JobList from "@/components/allJobs"; 

export default async function AllJobsPage() {
  const jobs = await getMyPostedJobs();

  return <JobList jobs={jobs} />;
}
