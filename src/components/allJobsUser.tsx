"use client";

import { applyToJob } from "@/app/(user)/allJobsUser/action/applyJobAction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Job = {
  id: string;
  title: string;
  description: string;
  skills: string;
  experience: string;
  salary: string;
  location: string;
  company?: {
    name: string;
  };
};

export default function JobListClient({ jobs }: { jobs: Job[] }) {
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  const handleClick = async (jobId: string) => {
    const res = await applyToJob(jobId);
    if (res?.success) {
      setAppliedJobs((prev) => [...prev, jobId]);
    }
    console.log("Applied to job:", jobId);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {jobs.map((job) => (
        <Card
          key={job.id}
          className="flex flex-col justify-between shadow-md bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition"
        >
          <CardHeader className="pb-2">
            <p className="text-3xl text-black font-bold">{job.company?.name}</p>
            <CardTitle className="text-xl font-bold text-gray-800">
              {job.title}
              <Badge variant="secondary" className="ml-2 text-xs">
                {job.location}
              </Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="text-sm text-gray-700 space-y-2">
            <p className="line-clamp-3">{job.description}</p>
            <div>
              <strong>Skills:</strong> {job.skills}
            </div>
            <div>
              <strong>Experience:</strong> {job.experience}
            </div>
            <div>
              <strong>Salary:</strong> {job.salary}
            </div>
            <div className="pt-2">
              <Button
                className="w-full"
                onClick={() => handleClick(job.id)}
                disabled={appliedJobs.includes(job.id)}
              >
                {appliedJobs.includes(job.id) ? "Applied" : "Apply Now"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
