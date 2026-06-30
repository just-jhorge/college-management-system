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
  SidebarHeader,
} from "@/components/ui/sidebar";
import React from "react";
import NavMain from "./NavMain";
import NavUser from "./NavUser";
import { User } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const schoolNavigationItems = [
  { title: "Dashboard", url: "#", icon: LayoutDashboard },
  { title: "Staff", url: "/dashboard/school/staff", icon: UsersIcon },
  { title: "Students", url: "#", icon: SettingsIcon },
  { title: "Programmes", url: "#", icon: GraduationCapIcon },
  { title: "Semesters", url: "#", icon: CalendarRangeIcon },
  { title: "Courses", url: "#", icon: BookOpenIcon },
];

export default function SidebarSchool({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: User }) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader className="mb-4">
        <div className="flex items-center gap-2">
          <Avatar size="lg" className="rounded-md">
            <AvatarImage
              src={user.image ?? "https://github.com/evilrabbit.png"}
              alt={user.name}
              className="rounded-md"
            />
            <AvatarFallback className="rounded-md">ME</AvatarFallback>
          </Avatar>
          <div className="flex-1 leading-tight">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={schoolNavigationItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
