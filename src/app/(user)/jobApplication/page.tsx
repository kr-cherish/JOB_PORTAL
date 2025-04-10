import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMyAppliedJobs } from "./action/jobApplicationAction";

export default async function MyApplicationsPage() {
  const jobs = await getMyAppliedJobs();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Job Applications</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-500 text-lg">You haven’t applied to any jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="border shadow-md hover:shadow-lg transition rounded-2xl bg-white flex flex-col"
            >
              <CardHeader>
                <p className="text-xl font-semibold text-gray-800">{job.company.name}</p>
                <CardTitle className="text-lg text-gray-700">
                  {job.title}
                  <Badge variant="secondary" className="ml-2">{job.location}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                <p className="line-clamp-3">{job.description}</p>
                <div>
                  <span className="font-medium">Skills:</span> {job.skills}
                </div>
                <div>
                  <span className="font-medium">Experience:</span> {job.experience}
                </div>
                <div>
                  <span className="font-medium">Salary:</span> {job.salary}
                </div>
                <div className="pt-4">
                  <Badge className="bg-green-500 text-white px-3 py-1 rounded-full">
                    Applied
                  </Badge>
                </div>
                <div className="pt-4">
                  {job.status === "PENDING" && (
                    <Badge className="bg-yellow-500 text-white px-3 py-1 rounded-full">
                      Pending
                    </Badge>
                  )}
                  {job.status === "ACCEPTED" && (
                    <Badge className="bg-green-600 text-white px-3 py-1 rounded-full">
                      Accepted
                    </Badge>
                  )}
                  {job.status === "REJECTED" && (
                    <Badge className="bg-red-500 text-white px-3 py-1 rounded-full">
                      Rejected
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
