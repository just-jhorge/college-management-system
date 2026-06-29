"use client";

import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Command,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from "@/components/ui/command";
import { useState } from "react";
import { Loader2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAvailableAdmins } from "@/actions/superadmin/getAvailableAdmins";
import { assignAdmin } from "@/actions/superadmin/assignAdmin";
import { toast } from "sonner";

type Admin = {
  id: string;
  name: string;
  email: string;
};

interface AssignAdminButtonProps {
  schoolId: string;
  schoolName: string;
}

export default function AssignAdminButton({
  schoolId,
  schoolName,
}: AssignAdminButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState<Admin | null>(null);

  async function handleOpenChange(nextOpen: boolean) {
    setIsOpen(nextOpen);
    if (nextOpen && admins.length === 0) {
      setLoading(true);
      try {
        const data = await getAvailableAdmins();
        setAdmins(data);
      } finally {
        setLoading(false);
      }
    }
  }

  function handleSelect(admin: Admin) {
    setSelected(admin);
    setSearchValue(`${admin.name} (${admin.email})`);
  }

  async function handleAssign() {
    if (!selected) return;
    const response = await assignAdmin(selected.id, schoolId);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    if (response.success) {
      toast.success(response.message);
      setIsOpen(false);
    }
  }

  return (
    <>
      <Button
        size="xs"
        variant="secondary"
        onClick={() => handleOpenChange(true)}
      >
        <UserPlus />
        Assign Admin
      </Button>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select an Admin</DialogTitle>
            <DialogDescription>
              Select an admin for {schoolName}
            </DialogDescription>
          </DialogHeader>
          <Command className="bg-neutral-100/50 dark:bg-neutral-800/50">
            <CommandInput
              placeholder="Search admins..."
              value={searchValue}
              onValueChange={(v) => {
                setSearchValue(v);
                if (selected) setSelected(null);
              }}
            />
            <CommandList>
              {loading ? (
                <div className="flex items-center justify-center py-6 text-muted-foreground">
                  <Loader2 className="mr-2 size-4 animate-spin" /> Loading...
                </div>
              ) : (
                <>
                  <CommandEmpty className="text-sm text-muted-foreground">
                    No available admins
                  </CommandEmpty>
                  <CommandGroup>
                    {admins.map((a) => (
                      <CommandItem
                        key={a.id}
                        value={a.email}
                        onSelect={() => handleSelect(a)}
                      >
                        <span className="text-sm font-medium">{a.name}</span>
                        <span className="truncate flex-1 text-sm text-muted-foreground">
                          ({a.email})
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={!selected} onClick={handleAssign}>
              Assign Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
