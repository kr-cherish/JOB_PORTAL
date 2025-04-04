"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import uploadImagetoPinata from "@/utils/uploadPinata";
import { createCompany } from "@/app/(admin)/adminCompany/action/companyAction";
import { toast } from "sonner";

export interface FORMDATA {
  name: string,
  description: string,
  website: string,
  employeeSize: string,
  foundedYear: string,
  specialities: string,
  overview: string,
  logo: null | string, 
}

const AdminCompanyForm = () => {
  const [formData, setFormData] = useState<FORMDATA>({
    name: "",
    description: "",
    website: "",
    employeeSize: "",
    foundedYear: "",
    specialities: "",
    overview: "",
    logo: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imgURL = await uploadImagetoPinata(file);
      setFormData((prev) => ({ ...prev, logo: imgURL }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await createCompany(formData);
      toast.success("Company added successfully!");
      setFormData({
        name: "",
        description: "",
        website: "",
        employeeSize: "",
        foundedYear: "",
        specialities: "",
        overview: "",
        logo: "",
      });
    } catch (error) {
      console.error("Error adding company:", error);
      toast.error("Failed to add company.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w mx-6 my-6 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Company Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="mb-2">Company Name</Label>
          <Input name="name" placeholder="Enter company name" value={formData.name} onChange={handleChange} required />
        </div>

        <div>
          <Label className="mb-2">Company Description</Label>
          <Textarea name="description" placeholder="Enter company description" value={formData.description} onChange={handleChange} required />
        </div>

        <div>
          <Label className="mb-2">Website</Label>
          <Input name="website" placeholder="Enter company website" value={formData.website} onChange={handleChange} />
        </div>

        <div>
          <Label className="mb-2">Employee Size</Label>
          <Input name="employeeSize" placeholder="Enter employee size" value={formData.employeeSize} onChange={handleChange} />
        </div>

        <div>
          <Label className="mb-2">Founded Year</Label>
          <Input name="foundedYear" placeholder="Enter year founded" value={formData.foundedYear} onChange={handleChange} />
        </div>

        <div>
          <Label className="mb-2">Specialities</Label>
          <Input name="specialities" placeholder="Enter specialities (comma-separated)" value={formData.specialities} onChange={handleChange} />
        </div>

        <div>
          <Label className="mb-2">Overview</Label>
          <Textarea name="overview" placeholder="Enter company overview" value={formData.overview} onChange={handleChange} />
        </div>

        <div>
          <Label className="mb-2">Upload Logo</Label>
          <Input type="file" onChange={handleFileChange} />
        </div>

        <div className="mb-2 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Company"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminCompanyForm;
