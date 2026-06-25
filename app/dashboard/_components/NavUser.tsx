"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Lightbulb } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import LogoutButton from "@/components/buttons/LogoutButton";

export default function NavUser() {
  return (
    <SidebarMenu className="gap-3">
      <SidebarMenuItem>
        <SidebarMenuButton>
          <Lightbulb /> Help & Support
        </SidebarMenuButton>
      </SidebarMenuItem>
      <Separator />
      <SidebarMenuButton asChild>
        <LogoutButton />
      </SidebarMenuButton>
    </SidebarMenu>
  );
}
