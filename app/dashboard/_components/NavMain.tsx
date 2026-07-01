"use client";

import {
  useSidebar,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type NavItem = {
  url: string;
  title: string;
  icon: LucideIcon;
};

interface NavMainProps {
  items: NavItem[];
}

export default function NavMain({ items }: NavMainProps) {
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarMenu className="px-4">
      <div className="text-xs text-muted-foreground mb-4">MENU</div>
      <div className="space-y-4">
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <Link
              href={item.url}
              className="flex items-center gap-2 text-lg"
              onClick={() => setOpenMobile(false)}
            >
              <item.icon className="size-5 text-muted-foreground" />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuItem>
        ))}
      </div>
    </SidebarMenu>
  );
}
