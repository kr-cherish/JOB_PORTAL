"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/actions/users/loginUser";

const LoginPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await loginUser(
      formData.get("email") as string,
      formData.get("password") as string
    );

    if (response.error) {
      setError(response.error);
    } else {
      setError("");

      // Store login time
      localStorage.setItem("loginTime", response.loginTime);

      console.log("Login Time:", response.loginTime);
      console.log("User Role:", response.role);

      // Redirect based on role
      if (response.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-6 sm:px-6 lg:px-8">
      <div className="flex justify-center flex-col items-center">
        <h2 className="text-center text-2xl leading-9 tracking-tight text-gray-900">
          Login to your account
        </h2>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-[#FFFAFO] px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-900">Email address</label>
              <input name="email" type="email" required className="input-field" />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-900">Password</label>
              <input name="password" type="password" required className="input-field" />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold shadow-sm 
                  hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Login
              </button>
              {error && <p className="text-red-600 text-center mt-4">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
