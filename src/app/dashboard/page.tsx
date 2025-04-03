"use client";

import  Sidebar  from "@/components/adminSideBar";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
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
