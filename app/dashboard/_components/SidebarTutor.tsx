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
  SidebarHeader,
} from "@/components/ui/sidebar";
import React from "react";
import NavMain from "./NavMain";
import NavUser from "./NavUser";
import { User } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const tutorNavigationItems = [
  { title: "Dashboard", url: "#", icon: LayoutDashboard },
  { title: "My Courses", url: "#", icon: GraduationCap },
  { title: "Students", url: "#", icon: UsersIcon },
  { title: "Settings", url: "#", icon: SettingsIcon },
];

export default function SidebarTutor({
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
        <NavMain items={tutorNavigationItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
