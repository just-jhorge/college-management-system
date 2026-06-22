"use client";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import { z } from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { InputField } from "../fields/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordField } from "../fields/PasswordField";
import { CheckboxField } from "../fields/CheckboxField";
import { Field, FieldGroup } from "@/components/ui/field";
import { useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

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

      console.log(data, error);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-6 min-w-sm lg:min-w-88">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Login to your account</CardTitle>
          <CardDescription className="text-xs">
            Enter your email and password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
              <Field>
                <Button type="submit" disabled={isPending}>
                  {isPending && <Loader2 className="animate-spin" />}
                  {isPending ? "Logging in..." : "Log in"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
