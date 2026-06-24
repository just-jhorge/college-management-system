"use client";

import {
  UsersIcon,
  SettingsIcon,
  GraduationCap,
  LayoutDashboard,
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

const tutorNavigationItems = [
  { title: "DASHBOARD", url: "#", icon: LayoutDashboard },
  { title: "MY COURSES", url: "#", icon: GraduationCap },
  { title: "STUDENTS", url: "#", icon: UsersIcon },
  { title: "SETTINGS", url: "#", icon: SettingsIcon },
];

export default function SidebarTutor({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: User }) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarContent>
        <NavMain items={tutorNavigationItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
