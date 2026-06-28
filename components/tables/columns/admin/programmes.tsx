"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

export type Programme = {
  id: string;
  name: string;
  code: string;
};

export const columns: ColumnDef<Programme>[] = [
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
    header: "Programme name",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "qualification",
    header: "Qualification",
  },
  {
    accessorKey: "mode",
    header: "Programme stream",
  },
  {
    accessorKey: "durationYears",
    header: "Duration",
  },
  {
    id: "actions",
    header: () => {
      return <div className="text-right">Action</div>;
    },
    cell: () => {
      return (
        <div className="text-right space-x-2">
          <Button size="sm">Edit Programme</Button>
          <Button size="sm" variant="destructive">
            Delete Programme
          </Button>
        </div>
      );
    },
  },
];
