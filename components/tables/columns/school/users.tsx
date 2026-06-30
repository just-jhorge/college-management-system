"use client";

import { format } from "date-fns";
import { Role } from "@/generated/prisma/enums";
import { ColumnDef } from "@tanstack/react-table";

export type User = {
  id: string;
  name: string;
  image: string | null;
  email: string;
  contact: string;
  role: Role;
  createdAt: Date;
};

export const columns: ColumnDef<User>[] = [
  {
    id: "#",
    header: "#",
    cell: ({ row }) => {
      const index = row.index;
      return <div className="text-muted-foreground">{index + 1}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Full name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return <p>{format(createdAt, "EEE, dd MMM yyyy")}</p>;
    },
  },
];
