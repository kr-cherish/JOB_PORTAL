import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";

export async function middleware(req: NextRequest) {
  const session = await getSession({ req });

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/company"], // Only protect the company form route
};
