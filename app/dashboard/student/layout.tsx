import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/utils/session";
import { Role } from "@/generated/prisma/enums";
import SidebarStudent from "../_components/SidebarStudent";
import DashboardLayoutShell from "../_components/DashboardLayoutShell";
import { getUserSchool } from "@/actions/getUserSchool";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const user = session?.user;

  if (!session || !user) redirect("/login");

  if (user.role !== "STUDENT") {
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
      content={<SidebarStudent user={user} />}
    >
      {children}
    </DashboardLayoutShell>
  );
}
