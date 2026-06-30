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
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { CopyIcon, Loader2, PlusIcon } from "lucide-react";
import { InputField } from "../fields/InputField";
import { FieldGroup } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "@/actions/superadmin/createUser";
import { CopyButton } from "./CopyButton";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(5, "Min 5 characters")
    .max(100, "Max 100 characters"),
  email: z.email(),
  contact: z
    .string()
    .min(1, "Contact is required")
    .min(10, "Contact should be 10 characters long")
    .max(10, "Contact should be 10 characters long"),
});

export default function AddUserButton() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [tempPassword, setTempPassword] = useState("");
  const [showCredentials, setShowCredentials] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const response = await createUser(values);

      if (response.success) {
        setTempPassword(response.tempPassword as string);
        setShowCredentials(true);
        toast.success(response.message);
        router.refresh();
      } else {
        toast.error(response.message);
        return;
      }
    });
  }

  function handleClose() {
    setIsOpen(false);
    form.reset();
    setTempPassword("");
    setShowCredentials(false);
  }

  const text = `Email: ${form.getValues("email")}\nPassword: ${tempPassword}`;

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <PlusIcon /> Add User
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
            <DialogDescription>
              Add a new admin user then assign to a school
            </DialogDescription>
          </DialogHeader>
          {showCredentials ? (
            <div className="space-y-6">
              <div className="w-full rounded-md py-10 border border-border text-center relative">
                <div className="absolute top-1 right-1">
                  <CopyButton text={text} />
                </div>
                <p>
                  <span className="text-muted-foreground">Email:</span>{" "}
                  {form.getValues("email")}
                </p>
                <p>
                  <span className="text-muted-foreground">Password:</span>{" "}
                  {tempPassword}
                </p>
              </div>
              <DialogFooter>
                <Button
                  disabled={isPending}
                  onClick={handleClose}
                  type="button"
                  variant="outline"
                >
                  Close
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <InputField
                  name="name"
                  type="text"
                  control={form.control}
                  label="Full name"
                  placeholder="John Doe"
                />
                <InputField
                  name="email"
                  type="email"
                  control={form.control}
                  label="Email"
                  placeholder="john.doe@example.com"
                />
                <InputField
                  name="contact"
                  type="tel"
                  control={form.control}
                  label="Contact"
                  placeholder="024xxxxxxx"
                />
              </FieldGroup>
              <DialogFooter>
                <DialogClose asChild>
                  <Button disabled={isPending} type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button disabled={isPending}>
                  {isPending && <Loader2 className="animate-spin" />}
                  {isPending ? "Creating..." : "Create user"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
