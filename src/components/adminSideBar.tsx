"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, Briefcase, User, Menu, LogOut,Component } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Compnay Profile", href: "/adminCompany", icon: <Component  className="w-5 h-5" /> },
    { name: "Post Jobs", href: "/postjobs", icon: <Home className="w-5 h-5" /> },
    { name: "All Jobs", href: "/allJobs", icon: <Briefcase className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile Sidebar  */}
      <div className="md:hidden p-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-white p-4">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  <div
                    className={`flex items-center gap-3 p-2 rounded-lg ${
                      pathname === item.href ? "bg-gray-200" : "hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                </Link>
              ))}
              <Button variant="destructive" className="w-full mt-4">
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="max-w-lg hidden md:flex flex-col w-64 p-4 border-r bg-[#4F959D]">
        <nav className="space-y-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-3 p-2 rounded-lg font-semibold ${
                  pathname === item.href ? "bg-gray-200" : "hover:bg-white-100"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
          
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
