import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/utils/session";

export default async function SchoolAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // if (!session) {
  //   redirect("/login");
  // }

  if (!session) {
    return <div>No session on school admin page</div>;
  }

  // if (session.user.role !== "ADMIN") {
  //   alert("You are not authorized to view this page");
  // }

  return <>{children}</>;
}
