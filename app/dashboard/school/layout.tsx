import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/utils/session";
import { Role } from "@/generated/prisma/enums";
import SidebarSchool from "../_components/SidebarSchool";
import DashboardLayoutShell from "../_components/DashboardLayoutShell";
import { prisma } from "@/lib/prisma";

export default async function SchoolAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const user = session?.user;

  if (!session || !user) redirect("/login");

  if (session.user.requiresPasswordChange) {
    redirect("/update-password");
  }

  const school =
    user.role !== "SUPER_ADMIN"
      ? await prisma.school.findUnique({
          where: { adminId: user.id },
          select: { name: true },
        })
      : null;

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
