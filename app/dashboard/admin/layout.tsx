import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/utils/session";
import DashboardLayoutShell from "../_components/DashboardLayoutShell";
import SidebarAdmin from "../_components/SidebarAdmin";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const user = session?.user;

  if (!session || !user) redirect("/login");

  if (session.user.role !== "SUPER_ADMIN") {
    redirect("/dashboard");
  }

  return (
    <DashboardLayoutShell content={<SidebarAdmin user={user} />}>
      {children}
    </DashboardLayoutShell>
  );
}
