"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import uploadImagetoPinata from "@/utils/uploadPinata";
import { createCompany } from "@/app/(admin)/adminCompany/action/companyAction";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { getMyCompany } from "@/app/(admin)/adminCompany/action/getMyCompany";

export interface FORMDATA {
  name: string;
  description: string;
  website: string;
  employeeSize: string;
  foundedYear: string;
  specialities: string;
  overview: string;
  logo: null | string;
}

interface AdminCompanyFormProps {
  existingCompany: FORMDATA | null;
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


  const [company, setCompany] = useState<FORMDATA | null>(null);
  useEffect(() => {
    const fetchCompany = async () => {
      try {

        const existingCompany = await getMyCompany(session);
        // console.log("🚀 ~ fetchCompany ~ existingCompany:", existingCompany);

        if (existingCompany) {
          setCompany(existingCompany);
        }
      } catch (error) {
        console.error("Error fetching company:", error);
      }
    };

    fetchCompany();
  }, []);

  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

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
      await createCompany(formData, session);
      toast.success("Company added successfully!");
      // setCompany(formData);
    } catch (error) {
      console.error("Error adding company:", error);
      toast.error("Failed to add company.");
    } finally {
      setLoading(false);
    }
  };
  const isFormValid = Object.values(formData).every(
    (value) => value && value.toString().trim() !== ""
  );

  if (company) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 ">
        {company ? (
          <div className="w-full p-6 border border-gray-200  bg-[#F2EFE7]  rounded-4xl shadow-lg">
            
            <div className="flex items-center gap-5">
              <div>{company.logo && (
                <div>
                  <img
                    src={company.logo}
                    alt="Company Logo"
                    className="w-20 h-20 object-cover rounded-full shadow-md"
                  />
                </div>
              )}</div>
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Company Information</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-7">
              <div>
                <p className="text-[17px] text-gay-500">Name</p>
                <p className="text-[25px] font-bold text-gray-900">{company.name}</p>
              </div>

              <div>
                <p className="text-[17px] text-gay-500">Website</p>
                <p className="text-[25px] font-bold text-gray-900">{company.website}</p>
              </div>

              <div>
                <p className="text-[17px] text-gay-500">Employee Size</p>
                <p className="text-[25px] font-bold text-gray-900">{company.employeeSize}</p>
              </div>

              <div>
                <p className="text-[17px] text-gay-500">Founded Year</p>
                <p className="text-[25px] font-bold text-gray-900">{company.foundedYear}</p>
              </div>

              <div>
                <p className="text-[17px] text-gay-500">Specialities</p>
                <p className="text-[25px] font-bold text-gray-900">{company.specialities}</p>
              </div>

              <div>
                <p className="text-[17px] text-gay-500">Description</p>
                <p className="text-[25px] font-bold text-gray-900">{company.description}</p>
              </div>

              <div className="md:col-span-2">
                <p className="text-[17px] text-gay-500">Overview</p>
                <p className="text-[25px] font-bold text-gray-900">{company.overview}</p>
              </div>


            </div>
          </div>
        ) : (
          // ✅ Company creation form if no existing company
          <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Add Company Information</h2>

            {/* Your form fields go here (as you already have in `formData` state) */}
            {/* ... All your <Input>, <Textarea>, and <Label> components ... */}

            <div className="mb-2 flex justify-end">
              <Button type="submit" disabled={loading || !isFormValid}>
                {loading ? "Saving..." : "Save Company"}
              </Button>
            </div>
          </form>
        )}
      </div>
    );

  }

  // ✅ If no company yet, show form
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
          <Button type="submit" disabled={loading || !isFormValid}>
            {loading ? "Saving..." : "Save Company"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminCompanyForm;
