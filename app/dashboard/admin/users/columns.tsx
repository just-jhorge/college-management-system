"use client";

import { Role } from "@/generated/prisma/enums";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export type User = {
  id: string;
  name: string;
  email: string;
  contact: string;
  role: Role;
  createdAt: Date;
  institution: string | null;
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
    accessorKey: "institution",
    header: "Institution",
    cell: ({ row }) => {
      const institution = row.original.institution;
      return <p>{institution ? institution : "Not found."}</p>;
    },
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
      return <p>{format(createdAt, "EEE, dd MMMM yyyy HH:mm:ss")}</p>;
    },
  },
];
