"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Lightbulb } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import LogoutButton from "@/components/buttons/LogoutButton";
import ThemeSwitcher from "@/components/custom/ThemeSwitcher";

export default function NavUser() {
  return (
    <SidebarMenu className="gap-3">
      <SidebarMenuItem className="space-y-2">
        <h6 className="text-muted-foreground text-xs">APPEARANCE</h6>
        <ThemeSwitcher />
      </SidebarMenuItem>
      <Separator />
      <SidebarMenuItem>
        <SidebarMenuButton>
          <Lightbulb /> Help & Support
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuButton asChild>
        <LogoutButton />
      </SidebarMenuButton>
    </SidebarMenu>
  );
}
