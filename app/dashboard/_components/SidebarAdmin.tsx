"use client";

import {
  Sidebar,
  SidebarFooter,
  SidebarContent,
} from "@/components/ui/sidebar";
import React from "react";
import NavMain from "./NavMain";
import NavUser from "./NavUser";
import { User } from "@/lib/auth";
import {
  Building2Icon,
  LayoutDashboard,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

const adminNavigationItems = [
  { title: "DASHBOARD", url: "#", icon: LayoutDashboard },
  { title: "SCHOOLS", url: "#", icon: Building2Icon },
  { title: "USERS", url: "#", icon: UsersIcon },
  { title: "SETTINGS", url: "#", icon: SettingsIcon },
];

export default function SidebarAdmin({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: User }) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarContent>
        <NavMain items={adminNavigationItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
