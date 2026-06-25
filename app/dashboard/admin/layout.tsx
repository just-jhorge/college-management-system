import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/utils/session";
import { Role } from "@/generated/prisma/enums";
import SidebarAdmin from "../_components/SidebarAdmin";
import DashboardLayoutShell from "../_components/DashboardLayoutShell";

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
    <DashboardLayoutShell
      role={user.role as Role}
      content={<SidebarAdmin user={user} />}
    >
      {children}
    </DashboardLayoutShell>
  );
}
