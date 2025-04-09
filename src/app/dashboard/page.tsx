"use client";

import  Sidebar  from "@/components/SideBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    router.push('/login')
    return <p>You need to log in first.</p>;
  }

  return (
    <div className="flex h-full">
        <Sidebar/>
    </div>
  );
};

export default Dashboard;
