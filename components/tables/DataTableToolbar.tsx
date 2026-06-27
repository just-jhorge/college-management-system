"use client";

import { type Table } from "@tanstack/react-table";
import { PropsWithChildren } from "react";
import { Input } from "../ui/input";

interface DataTableToolbarProps<TData> extends PropsWithChildren {
  table: Table<TData>;
  filterColumn?: string;
  filterPlaceholder?: string;
}

export default function DataTableToolbar<TData>({
  table,
  filterColumn,
  filterPlaceholder = "Search...",
  children,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between gap-3 lg:gap-0">
      {filterColumn ? (
        <Input
          className="max-w-sm"
          placeholder={filterPlaceholder}
          value={
            (table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""
          }
          onChange={(e) =>
            table
              .getColumn(filterColumn)
              ?.setFilterValue(e.target.validationMessage)
          }
        />
      ) : (
        <div />
      )}

      <div className="flex items-center gap-1">{children}</div>
    </div>
  );
}
