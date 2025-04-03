"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Navbar = () => {
  const { data: session } = useSession();
  console.log("🚀 ~ Navbar ~ data:", session)
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-black text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Job Portal
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link href="/dashboard" className="hover:text-gray-400">
            Dashboard
          </Link>
          {!session ? (
            <>
              <Link href="/login" className="hover:text-gray-400">
                Login
              </Link>
              <Link href="/register" className="hover:text-gray-400">
                Sign Up
              </Link>
            </>
          ) : (
            <Button
              onClick={() => signOut()}
              variant="outline"
              className="text-black border-white hover:bg-white hover:text-black"
            >
              Logout
            </Button>
          )}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-black text-white">
            <nav className="flex flex-col gap-4 text-lg mt-4">
              <Link href="/" onClick={() => setOpen(false)}>
                Home
              </Link>
              <Link href="/dashboard" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
              {!session ? (
                <>
                  <Link href="/login" onClick={() => setOpen(false)}>
                    Login
                  </Link>
                  <Link href="/register" onClick={() => setOpen(false)}>
                    Sign Up
                  </Link>
                </>
              ) : (
                <Button
                  onClick={() => signOut()}
                  variant="outline"
                  className="text-black border-white hover:bg-white hover:text-black"
                >
                  Logout
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;