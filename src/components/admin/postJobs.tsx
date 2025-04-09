"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { postJobAction } from "@/app/(admin)/postjobs/action/postJobAction";

export default function PostJobForm() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
    skills: "",
    experience: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await postJobAction(formData, session);
    if (result.success) {
      toast.success("Job posted successfully!");
      setFormData({
        title: "",
        description: "",
        salary: "",
        location: "",
        skills: "",
        experience: "",
      });
    } else {
      toast.error(result.message || "Failed to post job.");
    }

    setLoading(false);
  };

  const isFormValid = Object.values(formData).every((val) => val.trim() !== "");

  const inputFields = [
    { name: "title", label: "Job Title", placeholder: "e.g. Full Stack Developer" },
    { name: "salary", label: "Salary", placeholder: "e.g. $70k - $100k" },
    { name: "location", label: "Location", placeholder: "e.g. Remote or New York" },
    { name: "experience", label: "Experience", placeholder: "e.g. 2+ years" },
    { name: "skills", label: "Skills", placeholder: "e.g. React, Node.js, Prisma", fullWidth: true },
  ];

  return (
    <Card className="shadow-lg border mx-10 my-10 bg-[#F2EFE7] rounded-4xl">
      <CardHeader>
        <CardTitle className="text-3xl">Post a New Job</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            {inputFields.map((field) => (
              <div
                key={field.name}
                className={field.fullWidth ? "md:col-span-2"  : ""}
              >
                <Label>{field.label}</Label>
                <Input
                  name={field.name}
                  placeholder={field.placeholder}
                  value={(formData as any)[field.name]}
                  onChange={handleChange}
                  required={field.name === "title"}
                />
              </div>
            ))}

            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea
                name="description"
                placeholder="Detailed job responsibilities..."
                value={formData.description}
                onChange={handleChange}
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading || !isFormValid}>
              {loading ? "Posting..." : "Post Job"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
