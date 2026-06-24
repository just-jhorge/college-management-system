import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/utils/session";
import SidebarSchool from "../_components/SidebarSchool";
import DashboardLayoutShell from "../_components/DashboardLayoutShell";

export default async function SchoolAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const user = session?.user;

  if (!session || !user) {
    redirect("/dashboard");
  }

  return (
    <DashboardLayoutShell content={<SidebarSchool user={user} />}>
      {children}
    </DashboardLayoutShell>
  );
}
