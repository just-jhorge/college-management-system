"use client";

import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProgrammeType } from "@/generated/prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProgrammeTransferList({
  schoolId,
  available: initialAvailable,
  assigned: initialAssigned,
  onSave,
}: {
  schoolId: string;
  available: ProgrammeType[];
  assigned: ProgrammeType[];
  onSave: (schoolId: string, programmeTypeIds: string[]) => Promise<void>;
}) {
  const [assigned, setAssigned] = React.useState(initialAssigned);
  const [available, setAvailabe] = React.useState(initialAvailable);
  const [isDirty, setIsDirty] = React.useState(false);
  const [leftSearch, setLeftSearch] = React.useState("");
  const [rightSearch, setRightSearch] = React.useState("");
  const [isPending, startTransition] = React.useTransition();
  const [leftChecked, setLeftChecked] = React.useState<Set<string>>(new Set());
  const [rightChecked, setRightChecked] = React.useState<Set<string>>(
    new Set(),
  );

  const leftItems = React.useMemo(
    () =>
      available
        .filter((p) => !assigned.some((a) => a.id === p.id))
        .filter((p) => p.name.toLowerCase().includes(leftSearch.toLowerCase())),
    [available, assigned, leftSearch],
  );
  const rightItems = React.useMemo(
    () =>
      assigned.filter((p) =>
        p.name.toLowerCase().includes(rightSearch.toLowerCase()),
      ),
    [assigned, rightSearch],
  );

  function toggle(
    set: Set<string>,
    setFn: (s: Set<string>) => void,
    id: string,
  ) {
    const next = new Set(set);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setFn(next);
  }

  function moveRight() {
    const moving = available.filter((p) => leftChecked.has(p.id));
    setAssigned([...assigned, ...moving]);
    setAvailabe(available.filter((p) => !leftChecked.has(p.id)));
    setLeftChecked(new Set());
    setIsDirty(true);
  }

  function moveLeft() {
    const moving = available.filter((p) => rightChecked.has(p.id));
    setAvailabe([...available, ...moving]);
    setAssigned(assigned.filter((p) => !rightChecked.has(p.id)));
    setRightChecked(new Set());
    setIsDirty(true);
  }

  function handleSave() {
    startTransition(async () => {
      try {
        await onSave(
          schoolId,
          assigned.map((p) => p.id),
        );
        setIsDirty(false);
        toast.success("Programmes updated.");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to save");
      }
    });
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col lg:flex-row items-center gap-3">
        <Panel
          title="Available Programmes"
          items={leftItems}
          checked={leftChecked}
          onToggle={(id) => toggle(leftChecked, setLeftChecked, id)}
          search={leftSearch}
          onSearch={setLeftSearch}
        />
        <div className="hidden lg:flex flex-col gap-2">
          <Button
            size="icon-sm"
            variant="outline"
            onClick={moveRight}
            disabled={leftChecked.size === 0}
          >
            <ChevronRight className="size-4" />
          </Button>
          <Button
            size="icon-sm"
            variant="outline"
            onClick={moveLeft}
            disabled={rightChecked.size === 0}
          >
            <ChevronLeft className="size-4" />
          </Button>
        </div>
        <div className="flex lg:hidden gap-2">
          <Button
            size="icon-sm"
            variant="outline"
            onClick={moveRight}
            disabled={leftChecked.size === 0}
          >
            <ChevronDown className="size-4" />
          </Button>
          <Button
            size="icon-sm"
            variant="outline"
            onClick={moveLeft}
            disabled={rightChecked.size === 0}
          >
            <ChevronUp className="size-4" />
          </Button>
        </div>
        <Panel
          title="Available Programmes"
          items={rightItems}
          checked={rightChecked}
          onToggle={(id) => toggle(rightChecked, setRightChecked, id)}
          search={rightSearch}
          onSearch={setRightSearch}
        />
      </div>
      <div className="flex items-center justify-end gap-3">
        {isDirty && (
          <span className="text-xs text-muted-foreground self-center">
            Unsaved changes
          </span>
        )}
        <Button onClick={handleSave} disabled={!isDirty || isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          {isPending ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </div>
  );
}

function Panel({
  title,
  items,
  checked,
  onToggle,
  search,
  onSearch,
}: {
  title: string;
  items: ProgrammeType[];
  checked: Set<string>;
  onToggle: (id: string) => void;
  search: string;
  onSearch: (v: string) => void;
}) {
  return (
    <Card className="w-full lg:w-72">
      <CardHeader>
        <CardTitle>
          {title} ({items.length})
        </CardTitle>
        <Input
          value={search}
          className="mt-2"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-48 lg:h-64">
          <div className="p-2 space-y-1">
            {items.map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-2 rounded px-2 py-0.5 text-sm hover:bg-muted cursor-pointer"
              >
                <Checkbox
                  checked={checked.has(item.id)}
                  onCheckedChange={() => onToggle(item.id)}
                />
                {item.name}
              </label>
            ))}
            {items.length === 0 && (
              <p className="text-xs text-muted-foreground px-2 py-4 text-center">
                No programmes found
              </p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
