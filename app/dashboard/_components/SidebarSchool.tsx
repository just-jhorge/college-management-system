"use client";

import {
  UsersIcon,
  BookOpenIcon,
  SettingsIcon,
  LayoutDashboard,
  GraduationCapIcon,
  CalendarRangeIcon,
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

const schoolNavigationItems = [
  { title: "DASHBOARD", url: "#", icon: LayoutDashboard },
  { title: "USERS", url: "#", icon: UsersIcon },
  { title: "STUDENTS", url: "#", icon: SettingsIcon },
  { title: "PROGRAMMES", url: "#", icon: GraduationCapIcon },
  { title: "SEMESTERS", url: "#", icon: CalendarRangeIcon },
  { title: "COURSES", url: "#", icon: BookOpenIcon },
];

export default function SidebarSchool({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: User }) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarContent>
        <NavMain items={schoolNavigationItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
