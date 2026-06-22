"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import React from "react";

export default function Register({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className={cn("flex flex-col gap-6 min-w-sm", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email and password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input id="name" type="name" placeholder="John Doe" required />
              </Field>
              <div className="flex items-center gap-2">
                <Field>
                  <FieldLabel htmlFor="tel">Contact</FieldLabel>
                  <Input
                    id="tel"
                    type="tel"
                    placeholder="0241385150"
                    required
                  />
                </Field>
                <Field className="w-full max-w-xs">
                  <FieldLabel>Role</FieldLabel>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="design">Tutor</SelectItem>
                        <SelectItem value="sales">Student</SelectItem>
                        <SelectItem value="engineering">Admin</SelectItem>
                        <SelectItem value="marketing">Accountant</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  required
                  id="password"
                  placeholder="******"
                  type={showPassword ? "text" : "password"}
                />
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="showPassword" name="showPassword" />
                <FieldLabel htmlFor="showPassword">Show password</FieldLabel>
              </Field>
              <Field>
                <Button type="submit">Login</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
