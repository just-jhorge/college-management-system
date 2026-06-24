"use client";

import {
  ReceiptText,
  FileTextIcon,
  BarChart3Icon,
  CreditCardIcon,
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

const accountantNavigationItems = [
  { title: "DASHBOARD", url: "#", icon: LayoutDashboard },
  { title: "BILLS", url: "#", icon: FileTextIcon },
  { title: "INVOICES", url: "#", icon: ReceiptText },
  { title: "PAYMENTS", url: "#", icon: CreditCardIcon },
  { title: "REPORTS", url: "#", icon: BarChart3Icon },
];

export default function SidebarAccountant({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: User }) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarContent>
        <NavMain items={accountantNavigationItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
