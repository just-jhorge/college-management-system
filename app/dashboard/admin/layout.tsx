import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/utils/session";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) redirect("/login");

  if (session.user.role !== "SUPER_ADMIN") {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
