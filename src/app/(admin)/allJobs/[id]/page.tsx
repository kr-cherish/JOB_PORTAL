import { getJobsWithApplicants } from "../../adminApplication/action/ApplyerUserAction";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function Page({ params }: { params: { id: string } }) {
  const jobId = params.id;
  const applicants = await getJobsWithApplicants(jobId);
  console.log("🚀 ~ Page ~ applicants:", applicants)

  return (
    <div className="p-6">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applicants.map((applicant) => (
          <Card key={applicant.id}>
            <CardHeader>
              <CardTitle>{applicant.user.fname} {applicant.user.lname}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2 text-sm">
              <p><strong>Email:</strong> {applicant.user.email}</p>
              <p><strong>Experience:</strong> {applicant.user.experience}</p>
              <p><strong>Skills:</strong> {applicant.user.skills}</p>
              <p><strong>Bio:</strong> {applicant.user.bio}</p>
              <p><strong>Applied At:</strong> {new Date(applicant.appliedAt).toLocaleString()}</p>
            
            <div className="flex items-end-safe">
              <Button asChild variant="outline">
                <a href={applicant.user.resume || "#"} target="_blank">
                  View Resume
                </a>
              </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
