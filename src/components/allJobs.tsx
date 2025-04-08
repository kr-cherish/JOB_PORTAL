// app/(admin)/allJobs/JobList.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Job {
  id: string;
  title: string;
  description: string;
  salary: string;
  location: string;
  skills: string;
  experience: string;
  company: {
    name: string;
    logo?: string;
  };
}

export default function JobList({ jobs }: { jobs: Job[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {jobs.map((job) => (
        <Card key={job.id} className="shadow-md bg-[#F2EFE7] border rounded-xl hover:shadow-lg transition">
          <CardHeader>
            <CardTitle className="text-lg">
              {job.title}
              <Badge variant="secondary" className="ml-2 text-xs">
                {job.location}
              </Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground">{job.company?.name}</p>
          </CardHeader>
          <CardContent>
            <p className="text-sm line-clamp-3">{job.description}</p>
            <div className="text-sm mt-3">
              <strong>Skills:</strong> {job.skills}
              <br />
              <strong>Experience:</strong> {job.experience}
              <br />
              <strong>Salary:</strong> {job.salary}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
