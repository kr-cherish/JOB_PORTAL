"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/register/action/registerAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import uploadImagetoPinata  from "@/utils/uploadPinata"



const RegisterPage = () => {
  const [error, setError] = useState("");

 
  const [userData, setUserData] = useState<{ fname: string, lname: string, email: string, password: string, role: "USER" | "ADMIN "| string , resume: string, skills: string, bio: string, experience: number } | undefined>({
    fname: "",
    lname: "",
    email: "",
    role: "USER",
    password: "",
    resume: "",
    skills: "",
    bio: "",
    experience: 0
  })
  console.log("🚀 ~ RegisterPage ~ userData:", userData)
  const router = useRouter();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
  
    if (!file) return;
  
    try {
      const imageURL = await uploadImagetoPinata(file);
      if (imageURL) {
        setUserData((prev) => ({
          ...prev!,
          resume: imageURL,
        }));
      } else {
        setError("Failed to upload resume. Try again.");
      }
    } catch (err) {
      console.error("Error uploading resume:", err);
      setError("Error uploading file. Please try again.");
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!userData) return;
  
    try {
      const response = await registerUser(userData);
      if (response.error) {
        setError(response.error);
      } else {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (

    <Card className="w-full shadow-none bg-[#F6F8D5] border-none">
      <CardHeader>
        <CardTitle className="text-center">
          {userData?.role === "USER" ? "User Registration" : "Admin Registration"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 justify-between mb-4">
          <Button
          onClick={() =>
            setUserData((user) => ({
              ...user,
              role: "USER"
            }))
          }
            className="w-[50%]"
            variant={userData?.role === "USER" ? "default" : "outline"}
          >
            User
          </Button>
          <Button
            className="w-[50%]"
            onClick={() =>
              setUserData((user) => ({
                ...user,
                role: "ADMIN"
              }))
            }

            variant={userData?.role === "ADMIN" ? "default" : "outline"}
          >
            Admin
          </Button>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label>First Name</Label>
            <Input name="fname" type="text" required onChange={(e) => setUserData((user: any) => ({ ...user, fname: e.target.value }))} />
          </div>
          <div>
            <Label>Last Name</Label>
            <Input name="lname" type="text" required onChange={(e) => setUserData((user: any) => ({ ...user, lname: e.target.value }))} />
          </div>
          <div>
            <Label>Email</Label>
            <Input name="email" type="email" required onChange={(e) => setUserData((user: any) => ({ ...user, email: e.target.value }))} />
          </div>
          <div>
            <Label>Password</Label>
            <Input name="password" type="password" required onChange={(e) => setUserData((user: any) => ({ ...user, password: e.target.value }))} />
          </div>

          {userData?.role === "USER" && (
            <>
              <div>
                <Label>Upload Resume</Label>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleImageChange} 
                />
              </div>
              <div>
                <Label>Skills</Label>
                <Input name="skills" type="text" placeholder="e.g. React, Next.js, MongoDB" onChange={(e) => setUserData((user: any) => ({ ...user, skills: e.target.value }))} />
              </div>
              <div>
                <Label>Experience (Years)</Label>
                <Input name="experience" type="number" min="0" placeholder="e.g. 3" onChange={(e) => setUserData((user: any) => ({ ...user, experience: e.target.value }))} />
              </div>
              <div>
                <Label>Bio</Label>
                <textarea
                  name="bio"
                  className="w-full border p-2 rounded-md"
                  placeholder="Short bio about yourself"
                  onChange={(e) => setUserData((user: any) => ({ ...user, bio: e.target.value }))}
                />
              </div>
            </>
          )}

          <Button type="submit" className="w-full">
            Sign up as {userData?.role === "USER" ? "User" : "Admin"}
          </Button>
          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </form>

      </CardContent>
    </Card>

  );
};

export default RegisterPage;