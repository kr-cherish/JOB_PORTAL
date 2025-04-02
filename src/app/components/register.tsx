"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/actions/users/registerUser";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const [role, setRole] = useState("USER");
  const [resume, setResume] = useState<File | null>(null);
  const [companyName, setCompanyName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const userData = {
      fname: formData.get("fname") as string,
      lname: formData.get("lname") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      role,
      ...(role === "USER" ? { resume: resume ? resume.name : undefined } : { companyName }),
    };

    const response = await registerUser(userData);
    if (response.error) {
      setError(response.error);
    } else {
      setError("");
      router.push("/login");
    }
  };

  return (
    <div className="flex min-h-screen flex-col p-8">
      <div className="w-full max-w-2xl bg-white p-6 shadow-lg rounded-md">
        <div className="flex justify-between mb-6">
          <button onClick={() => setRole("USER")} className={`px-4 py-2 rounded-md text-white bg-indigo-600`}>
            User
          </button>
          <button onClick={() => setRole("ADMIN")} className={`px-4 py-2 rounded-md text-white bg-indigo-600`}>
            Admin
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6">{role === "USER" ? "User Registration" : "Admin Registration"}</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-900">First Name</label>
            <input name="fname" type="text" required className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Last Name</label>
            <input name="lname" type="text" required className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Email</label>
            <input name="email" type="email" required className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Password</label>
            <input name="password" type="password" required className="input-field" />
          </div>

          {role === "USER" && (
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Upload Resume
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files?.[0] || null)}
                className="input-field"
              />
            </div>
          )}


          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md shadow-sm hover:bg-indigo-700">
            Sign up as {role === "USER" ? "User" : "Admin"}
          </button>
          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
