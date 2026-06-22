"use client";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { InputField } from "../fields/InputField";
import { SelectField } from "../fields/SelectField";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordField } from "../fields/PasswordField";
import { Field, FieldGroup } from "@/components/ui/field";

const formSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  contact: z.string(),
  role: z.enum(["ADMIN", "STUDENT", "TUTOR", "ACCOUNTANT"]),
});

export default function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      password: "",
      role: "STUDENT",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <div className="flex flex-col gap-6 min-w-sm lg:min-w-[22rem]">
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
                name="name"
                type="text"
                label="Full name"
                control={form.control}
                placeholder="John Doe"
              />
              <div className="flex items-center gap-2">
                <InputField
                  type="tel"
                  name="contact"
                  label="Contact"
                  control={form.control}
                  placeholder="0244123456"
                />
                <SelectField
                  name="role"
                  label="Role"
                  control={form.control}
                  placeholder="Select a role"
                  options={[
                    { label: "Admin", value: "ADMIN" },
                    { label: "Student", value: "STUDENT" },
                    { label: "Tutor", value: "TUTOR" },
                    { label: "Accountant", value: "ACCOUNTANT" },
                  ]}
                />
              </div>
              <InputField
                name="email"
                type="email"
                label="Email address"
                control={form.control}
                placeholder="m@institution.com"
              />
              <PasswordField
                name="password"
                label="Password"
                placeholder="******"
                control={form.control}
              />
              <Field>
                <Button type="submit">Register</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
