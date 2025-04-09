// app/(admin)/adminCompany/page.tsx
import AdminCompanyForm from "@/components/admin/adminCompnay";
import { getMyCompany } from "./action/getMyCompany";

export default async function AdminCompanyPage() {
  

  return (
    <div className="p-4">
      <AdminCompanyForm />
    </div>
  );
}
