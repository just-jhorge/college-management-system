import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/utils/session";
import { Role } from "@/generated/prisma/enums";
import SidebarTutor from "../_components/SidebarTutor";
import { getUserSchool } from "@/actions/getUserSchool";
import DashboardLayoutShell from "../_components/DashboardLayoutShell";

export default async function TutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const user = session?.user;

  if (!session || !user) redirect("/login");

  if (session.user.role !== "TUTOR") {
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
      content={<SidebarTutor user={user} />}
    >
      {children}
    </DashboardLayoutShell>
  );
}
