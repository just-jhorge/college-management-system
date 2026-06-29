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
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { InputField } from "../fields/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { addSchool } from "@/actions/superadmin/addSchool";

const formSchema = z.object({
  name: z.string(),
});

export default function AddSchoolButton() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const response = await addSchool(values.name);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      form.reset();
      toast.success(response.message);
      setIsOpen(false);
      router.refresh();
    });
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <PlusIcon /> Add new
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add School</DialogTitle>
            <DialogDescription>
              Create a new school tenant and assign its primary admin.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <InputField
              name="name"
              control={form.control}
              label="Name of institution"
              placeholder="Nursing and Midwifery Training College..."
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button disabled={isPending} type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isPending}>
                {isPending && <Loader2 className="animate-spin" />}
                {isPending ? "Adding..." : "Add School"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
