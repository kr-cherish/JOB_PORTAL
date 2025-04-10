"use client";

import Sidebar from "@/components/SideBar"; // You can use a different sidebar if needed
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading" && (!session || session.user.role !== "USER")) {
      router.push("/dashboard"); // Redirect admins or unauthenticated users
    }
  }, [session, status, router]);

  if (status === "loading") return <p>Loading...</p>;

  if (!session || session.user.role !== "USER") {
    return <p>Redirecting...</p>;
  }

  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 p-4 overflow-y-auto h-[calc(100vh-80px)]">{children}</main>
    </div>
  );
};

export default UserLayout;
