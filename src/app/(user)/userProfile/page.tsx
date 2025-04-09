import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getLoggedInUser } from "./action/getLoggedUser";

export default async function ProfilePage() {
  const user = await getLoggedInUser();

  if (!user) {
    return <p className="text-center text-gray-500 mt-10">User not found.</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card className="shadow-lg border border-gray-200 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">My Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <div><strong>First Name:</strong> {user.fname}</div>
          <div><strong>Last Name:</strong> {user.lname}</div>
          <div><strong>Email:</strong> {user.email}</div>
          <div><strong>Role:</strong> <Badge>{user.role}</Badge></div>
          {user.skills && <div><strong>Skills:</strong> {user.skills}</div>}
          {user.experience && <div><strong>Experience:</strong> {user.experience}</div>}
          {user.bio && <div><strong>Bio:</strong> {user.bio}</div>}
          {user.resume && (
            <div>
              <strong>Resume:</strong>{" "}
              <a
                href={user.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Resume
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
