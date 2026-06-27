"use client";

import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { z } from "zod";
import { toast } from "sonner";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, School2 } from "lucide-react";
import { FieldGroup } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordField } from "../fields/PasswordField";
import { changePassword } from "@/app/update-password/actions";

const formSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
  confirmNewPassword: z.string(),
});

export default function UpdatePassword({ email }: { email: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const response = await changePassword({ ...values });

      if (!response.success) {
        toast.error(
          response.message || "Something went wrong. Please try again",
        );
        return;
      }

      toast.success(response.message);
      form.reset();
      router.push("/dashboard");
    });
  }

  return (
    <div className="flex flex-col gap-6 min-w-sm">
      <Card>
        <CardHeader>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <School2 className="size-5" />
              <h3 className="text-lg font-semibold">Collegerr</h3>
            </div>
            <p className="font-medium underline">{email}</p>
          </div>
          <CardTitle className="text-sm">Update your password</CardTitle>
          <CardDescription className="text-xs">
            You need to update your password because this is the first time you
            are logging in, or because your password has expired.
          </CardDescription>
        </CardHeader>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FieldGroup>
              <PasswordField
                name="currentPassword"
                label="Current password"
                control={form.control}
                placeholder="********"
              />
              <PasswordField
                name="newPassword"
                label="New password"
                control={form.control}
                placeholder="********"
              />
              <PasswordField
                name="confirmNewPassword"
                label="Confirm password"
                control={form.control}
                placeholder="********"
              />
            </FieldGroup>
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="animate-spin" />}
              {isPending ? "Updaing Password..." : "Update Password"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
