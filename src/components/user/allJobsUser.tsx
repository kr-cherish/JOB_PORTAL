"use client";

import { applyToJob } from "@/app/(user)/allJobsUser/action/applyJobAction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { searchJobsByTitle } from "@/app/(user)/allJobsUser/action/searchAction";

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

export default function JobListClient({
  jobs,
  appliedJobIds = [],
}: {
  jobs: Job[];
  appliedJobIds: string[];
}) {
  const [appliedJobs, setAppliedJobs] = useState<string[]>(appliedJobIds);

  const [search, setSearch] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    const jobs = await searchJobsByTitle(search);
    setResults(jobs);
  };


  const handleClick = async (jobId: string) => {
    const res = await applyToJob(jobId);
    if (res?.success) {
      setAppliedJobs((prev) => [...prev, jobId]);
    } else {
      console.warn(res.message);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      
      <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4"> Search Jobs</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter job title..."
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {results.length > 0 ? (
        <ul className="space-y-4">
          {results.map((job) => (
            <li key={job.id} className="p-4 border rounded">
              <h2 className="font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                Company: {job.company?.name}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No jobs found.</p>
      )}
    </div>


      {jobs.map((job) => {
        const isApplied = appliedJobs.includes(job.id);
        return (
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
                  disabled={isApplied}
                >
                  {isApplied ? "Applied" : "Apply Now"}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
