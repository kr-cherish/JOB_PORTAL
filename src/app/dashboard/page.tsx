"use client";

import  Sidebar  from "@/components/adminSideBar";
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
    <div>
      {session.user.role === "ADMIN" ? (
        <Sidebar/>
      ) : (
        <p>You are a Normal User</p>
      )}
    </div>
  );
};

export default Dashboard;
