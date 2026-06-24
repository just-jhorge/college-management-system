import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/utils/session";
import DashboardLayoutShell from "../_components/DashboardLayoutShell";
import SidebarStudent from "../_components/SidebarStudent";

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
    <DashboardLayoutShell content={<SidebarStudent user={user} />}>
      {children}
    </DashboardLayoutShell>
  );
}
