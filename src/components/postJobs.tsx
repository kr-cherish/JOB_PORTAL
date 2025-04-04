"use client";
import { useState } from "react";
import { postJob } from "@/app/(admin)/postjobs/action/postJobAction";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PostJob = () => {
  const { data: session } = useSession();
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    formData.append("createdBy", session?.user?.id || "");

    const response = await postJob(formData);

    if (response.error) {
      setMessage(response.error);
    } else {
      setMessage(response.success);
      e.currentTarget.reset();
    }
  };

  return (
    <Card className="max-w mt-10 border-none  bg-[#F6F8D5] shadow-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-semibold">
          Post a New Job
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input name="title" placeholder="Job Title" required />
          <Textarea name="description" placeholder="Job Description" required />
          <Input name="salary" placeholder="Salary Range (Optional)" />
          <Input name="location" placeholder="Job Location (Optional)" />
          <Input name="skills" placeholder="Required Skills (Optional)" />
          <Input name="experience" placeholder="Experience Required (Optional)" />

          <Button type="submit" className="w-full">
            Post Job
          </Button>

          {message && <p className="text-center text-red-500 mt-2">{message}</p>}
        </form>
      </CardContent>
    </Card>
  );
};

export default PostJob;
