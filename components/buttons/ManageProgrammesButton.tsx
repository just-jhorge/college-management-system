"use client";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProgrammeType } from "@/generated/prisma/client";
import ProgrammeTransferList from "../custom/ProgrammeTransferList";
import { updateProgrammeOfferings } from "@/actions/superadmin/updateProgrammeOfferings";
import { useState } from "react";

export default function ManageProgrammesButton({
  schoolId,
  assigned,
  available,
}: {
  schoolId: string;
  assigned: ProgrammeType[];
  available: ProgrammeType[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Manage Programmes</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-fit">
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogHeader>
        <ProgrammeTransferList
          schoolId={schoolId}
          available={available}
          assigned={assigned}
          onSave={async (schoolId, ids) => {
            await updateProgrammeOfferings(schoolId, ids);
            setIsOpen(false);
          }}
        />
        {/* <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
