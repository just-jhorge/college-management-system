import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/utils/session";
import { Role } from "@/generated/prisma/enums";
import SidebarTutor from "../_components/SidebarTutor";
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

  return (
    <DashboardLayoutShell
      role={user.role as Role}
      content={<SidebarTutor user={user} />}
    >
      {children}
    </DashboardLayoutShell>
  );
}
