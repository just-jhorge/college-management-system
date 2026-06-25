import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/utils/session";
import { Role } from "@/generated/prisma/enums";
import SidebarAccountant from "../_components/SidebarAccountant";
import DashboardLayoutShell from "../_components/DashboardLayoutShell";

export default async function AccountantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const user = session?.user;

  if (!session || !user) redirect("/login");

  if (session.user.role !== "ACCOUNTANT") {
    redirect("/dashboard");
  }

  return (
    <DashboardLayoutShell
      role={user.role as Role}
      content={<SidebarAccountant user={user} />}
    >
      {children}
    </DashboardLayoutShell>
  );
}
