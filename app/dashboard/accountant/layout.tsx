import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/utils/session";
import { Role } from "@/generated/prisma/enums";
import SidebarAccountant from "../_components/SidebarAccountant";
import DashboardLayoutShell from "../_components/DashboardLayoutShell";
import { getUserSchool } from "@/actions/getUserSchool";

export default async function AccountantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const user = session?.user;

  if (!session || !user) redirect("/login");

  if (user.role !== "ACCOUNTANT") {
    redirect("/dashboard");
  }

  if (user.requiresPasswordChange) {
    redirect("/update-password");
  }

  const school = await getUserSchool();

  return (
    <DashboardLayoutShell
      role={user.role as Role}
      schoolName={school?.name}
      content={<SidebarAccountant user={user} />}
    >
      {children}
    </DashboardLayoutShell>
  );
}
