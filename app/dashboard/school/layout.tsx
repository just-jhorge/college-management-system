import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/utils/session";
import { Role } from "@/generated/prisma/enums";
import { getUserSchool } from "@/actions/getUserSchool";
import SidebarSchool from "../_components/SidebarSchool";
import DashboardLayoutShell from "../_components/DashboardLayoutShell";

export default async function SchoolAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const user = session?.user;

  if (!session || !user) redirect("/login");

  if (user.role !== "ADMIN") {
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
      content={<SidebarSchool user={user} />}
    >
      {children}
    </DashboardLayoutShell>
  );
}
