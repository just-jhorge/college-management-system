"use client";

import {
  SettingsIcon,
  GraduationCap,
  LayoutDashboard,
  ReceiptTextIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarFooter,
  SidebarContent,
} from "@/components/ui/sidebar";
import React from "react";
import NavMain from "./NavMain";
import NavUser from "./NavUser";
import { User } from "@/lib/auth";

const studentNavigationItems = [
  { title: "DASHBOARD", url: "#", icon: LayoutDashboard },
  { title: "SEMESTER", url: "#", icon: GraduationCap },
  { title: "INVOICES", url: "#", icon: ReceiptTextIcon },
  { title: "SETTINGS", url: "#", icon: SettingsIcon },
];

export default function SidebarStudent({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: User }) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarContent>
        <NavMain items={studentNavigationItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
