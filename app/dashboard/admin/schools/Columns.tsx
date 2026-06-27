"use client";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { SchoolStatus } from "@/generated/prisma/enums";
import { ArrowUpDown, MoreHorizontal, TrashIcon } from "lucide-react";

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
            <h4 className="text-sm font-medium">{primaryAdmin.name}</h4>
          ) : (
            <p className="text-muted-foreground text-sm italic">
              No admin assigned
            </p>
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
      return <div>{format(createdAt, "eeee, dd MMMM yyyy HH:mm:ss")}</div>;
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const isPending = !!row.original.primaryAdmin;

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
            {!isPending && (
              <>
                <DropdownMenuItem>Assign Admin</DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
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
  PENDING: {
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
