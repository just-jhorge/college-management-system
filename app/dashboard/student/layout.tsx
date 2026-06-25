import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/utils/session";
import { Role } from "@/generated/prisma/enums";
import SidebarStudent from "../_components/SidebarStudent";
import DashboardLayoutShell from "../_components/DashboardLayoutShell";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const user = session?.user;

  if (!session || !user) redirect("/login");

  if (session.user.role !== "STUDENT") {
    redirect("/dashboard");
  }

  return (
    <DashboardLayoutShell
      role={user.role as Role}
      content={<SidebarStudent user={user} />}
    >
      {children}
    </DashboardLayoutShell>
  );
}
