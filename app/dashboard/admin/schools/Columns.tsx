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
import {
  AlertTriangle,
  ArrowUpDown,
  MoreHorizontal,
  TrashIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    cell: ({ row }) => {
      const name = row.original.name;
      const isPending = row.original.status === "PENDING";
      return (
        <div className="flex items-center gap-2">
          {isPending && (
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertTriangle className="size-4 text-red-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Please assign a school admin</p>
              </TooltipContent>
            </Tooltip>
          )}
          {name}
        </div>
      );
    },
  },
  {
    accessorKey: "primaryAdmin",
    header: "School Admin",
    cell: ({ row }) => {
      const primaryAdmin = row.original.primaryAdmin;
      if (!primaryAdmin) {
        return (
          <div className="flex items-center gap-1">
            <p className="text-muted-foreground text-sm italic">
              No admin assigned
            </p>
            -
            <Button size="xs" variant="outline" className="text-sm">
              Assign admin
            </Button>
          </div>
        );
      }
      return <h4 className="text-sm font-medium">{primaryAdmin.name}</h4>;
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
