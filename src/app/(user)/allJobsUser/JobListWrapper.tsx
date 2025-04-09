import JobListClient from "@/components/user/allJobsUser";
import { getAllJobs } from "./action/allJobsAction";
import { getAppliedJobIds } from "./action/applyJobAction";

export default async function AllJobsUserPage() {
  const jobs = await getAllJobs();
  const appliedJobIds = await getAppliedJobIds();

  return <JobListClient jobs={jobs} appliedJobIds={appliedJobIds} />;
}
