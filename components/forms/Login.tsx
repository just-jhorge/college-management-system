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
import Link from "next/link";
import { toast } from "sonner";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { InputField } from "../fields/InputField";
import { FieldGroup } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordField } from "../fields/PasswordField";
import { CheckboxField } from "../fields/CheckboxField";

const formSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string(),
  rememberMe: z.boolean(),
});

export default function Login() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const { data, error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
      });

      if (error) {
        toast.error(error.message || "Something went wrong. Please try again");
        return;
      }

      if (data && data.user) {
        toast.success("Logged in successfully.");
        router.refresh();
      }
    });
  }

  return (
    <div className="flex flex-col gap-6 min-w-sm">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Login to your account</CardTitle>
          <CardDescription className="text-xs">
            Enter your email and password below to login to your account
          </CardDescription>
        </CardHeader>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FieldGroup>
              <InputField
                type="email"
                name="email"
                label="Email"
                control={form.control}
                placeholder="m@institution.com"
              />
              <PasswordField
                name="password"
                label="Password"
                control={form.control}
                placeholder="******"
              />
              <div className="flex items-center justify-between">
                <CheckboxField
                  name="rememberMe"
                  label="Remember me"
                  control={form.control}
                />
                <Link
                  href="/forgot-password"
                  className="text-nowrap hover:underline underline-offset-2"
                >
                  Forgot password?
                </Link>
              </div>
            </FieldGroup>
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && <Loader2 className="animate-spin" />}
              {isPending ? "Logging in..." : "Log in"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
