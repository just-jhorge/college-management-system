"use client";

import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProgrammeType } from "@/generated/prisma/client";
import ProgrammeTransferList from "../custom/ProgrammeTransferList";

export default function ManageProgrammesButton({
  available,
  assigned,
  onChange,
}: {
  available: ProgrammeType[];
  assigned: ProgrammeType[];
  onChange: (newAssigned: ProgrammeType[]) => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Manage Programmes</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-fit">
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogHeader>
        <ProgrammeTransferList
          available={available}
          assigned={assigned}
          onChange={onChange}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
