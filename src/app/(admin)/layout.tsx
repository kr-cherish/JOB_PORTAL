"use client";

import Sidebar from "@/components/SideBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading" && (!session || session.user.role !== "ADMIN")) {
      router.push("/dashboard"); 
    }
  }, [session, status, router]);

  if (status === "loading") return <p>Loading...</p>;

  if (!session || session.user.role !== "ADMIN") {
    return <p>Redirecting...</p>;
  }

  return (
    <div className="flex  h-screen">
      <Sidebar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default AdminLayout;
