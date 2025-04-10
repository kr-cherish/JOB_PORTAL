import { getJobsWithApplicants } from "../../adminApplication/action/ApplyerUserAction";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { updateApplicationStatus } from "../action/pdateApplicationStatusAction";

export default async function Page({ params }: { params: { id: string } }) {
  const jobId = params.id;
  const applicants = await getJobsWithApplicants(jobId);
  console.log("🚀 ~ Page ~ applicants:", applicants)

  async function handleStatus(formData: FormData) {
    "use server";
    const applicationId = formData.get("applicationId") as string;
    const status = formData.get("status") as "ACCEPTED" | "REJECTED";
    await updateApplicationStatus(applicationId, status);
  }

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
            
              <div className="flex gap-2">
                {applicant.status === "PENDING" && (
                  <>
                    <form action={handleStatus}>
                      <input type="hidden" name="applicationId" value={applicant.id} />
                      <input type="hidden" name="status" value="ACCEPTED" />
                      <Button type="submit" variant="outline">Accept</Button>
                    </form>

                    <form action={handleStatus}>
                      <input type="hidden" name="applicationId" value={applicant.id} />
                      <input type="hidden" name="status" value="REJECTED" />
                      <Button type="submit" variant="destructive">Reject</Button>
                    </form>
                  </>
                )}

                <Button asChild variant="secondary">
                  <a href={applicant.user.resume || "#"} target="_blank">View Resume</a>
                </Button>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
