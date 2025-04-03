"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password.");
    } else {
      setError("");
      router.push("/dashboard");
    }
  };

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-semibold">
          Login to your account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium pb-4">Email</label>
            <Input name="email" type="email" required />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <Input name="password" type="password" required />
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
