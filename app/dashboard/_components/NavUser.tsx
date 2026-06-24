"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { User } from "@/lib/auth";
import { Separator } from "@/components/ui/separator";
import LogoutButton from "@/components/buttons/LogoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NavUser({ user }: { user: User }) {
  return (
    <SidebarMenu className="gap-3">
      <Separator />
      <SidebarMenuItem>
        <div className="bg-muted py-2 px-3 rounded-sm flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user.image ?? ""} alt={user.name} />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
          <div className="flex-1 leading-tight">
            <p className="truncate text-xs font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
      </SidebarMenuItem>
      <SidebarMenuButton asChild>
        <LogoutButton />
      </SidebarMenuButton>
    </SidebarMenu>
  );
}
