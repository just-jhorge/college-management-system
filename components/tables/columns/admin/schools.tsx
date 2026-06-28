"use client";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { SchoolStatus } from "@/generated/prisma/enums";
import { ArrowUpDown, MoreHorizontal, TrashIcon } from "lucide-react";
import AssignAdminButton from "@/components/buttons/AssignAdminButton";

export type School = {
  id: string;
  name: string;
  createdAt: Date;
  status: SchoolStatus;
  studentCount: number;
  primaryAdmin: { name: string; email: string } | null;
};

export const columns: ColumnDef<School>[] = [
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
    header: "Institution name",
  },
  {
    accessorKey: "primaryAdmin",
    header: "School Admin",
    cell: ({ row }) => {
      const primaryAdmin = row.original.primaryAdmin;

      return (
        <>
          {primaryAdmin ? (
            <Link href="#" className="space-x-1">
              <span className="text-sm font-medium">{primaryAdmin.name}</span>
              <span className="text-sm truncate text-muted-foreground">
                ({primaryAdmin.email})
              </span>
            </Link>
          ) : (
            <AssignAdminButton
              schoolId={row.original.id}
              schoolName={row.original.name}
            />
          )}
        </>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="size-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;
      return <StatusBadge status={status} />;
    },
  },
  {
    accessorKey: "studentCount",
    header: "Student Count",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return <div>{format(createdAt, "eee, dd MMM yyyy HH:mm")}</div>;
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Suspend</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <TrashIcon /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const statusConfig: Record<SchoolStatus, { label: string; bgColor: string }> = {
  ACTIVE: {
    label: "Active",
    bgColor: "bg-green-100 text-green-800 border-green-200",
  },
  PENDING_SETUP: {
    label: "Pending",
    bgColor: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  SUSPENDED: {
    label: "Suspended",
    bgColor: "bg-red-100 text-red-800 border-red-200",
  },
};

function StatusBadge({ status }: { status: SchoolStatus }) {
  return (
    <Badge className={cn("rounded-sm", statusConfig[status].bgColor)}>
      {statusConfig[status].label}
    </Badge>
  );
}
