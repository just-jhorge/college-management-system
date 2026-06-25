"use client";

import {
  SidebarInset,
  SidebarTrigger,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Role } from "@/generated/prisma/enums";
import React, { PropsWithChildren } from "react";
import { Separator } from "@/components/ui/separator";

interface DashboardLayoutShellProps extends PropsWithChildren {
  content: React.ReactNode;
  role: Role;
}

export default function DashboardLayoutShell({
  children,
  content,
  role,
}: DashboardLayoutShellProps) {
  return (
    <SidebarProvider>
      {content}
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2" />
            {/* FIXME: Replace below with the name of the school */}
            <p className="truncate text-sm">
              {role !== "SUPER_ADMIN"
                ? "Nursing and Midwifery Training College, Kumasi"
                : "Super Admin Account"}
            </p>
          </div>
        </header>
        <div className="px-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
