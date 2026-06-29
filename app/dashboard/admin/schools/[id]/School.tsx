"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeCheckIcon, GraduationCap, UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditIcon, Trash } from "lucide-react";
import ManageProgrammesButton from "@/components/buttons/ManageProgrammesButton";
import { ProgrammeType } from "@/generated/prisma/client";

export default function School({
  available,
  assigned,
}: {
  available: ProgrammeType[];
  assigned: ProgrammeType[];
}) {
  const CARD_DETAILS = [
    { id: 1, title: "Students", data: 1983, icon: UsersIcon, actions: null },
    { id: 2, title: "Tutors", data: 135, icon: UsersIcon, actions: null },
    {
      id: 3,
      title: "Programmes",
      data: 5,
      icon: GraduationCap,
      actions: (
        <ManageProgrammesButton
          available={available}
          assigned={assigned}
          onChange={() => {}}
        />
      ),
    },
    {
      id: 4,
      title: "Status",
      data: "ACTIVE",
      icon: BadgeCheckIcon,
      actions: null,
    },
  ];

  return (
    <div className="py-4 space-y-5">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-0">
        <div className="flex items-center gap-2 lg:gap-4">
          <div className="size-20 rounded-md border border-border">Logo</div>
          <div className="flex-1 leading-5">
            <h3 className="text-xl font-bold max-w-87.5">
              Nursing and Midwifery Training College, Kumasi
            </h3>
            <p className="text-sm text-muted-foreground">
              Joined at: Sun, 27 June 2026
            </p>
          </div>
        </div>
        <div className="space-x-1 w-full lg:w-auto">
          <Button size="lg" variant="secondary">
            <EditIcon /> Edit School
          </Button>
          <Button size="lg" variant="destructive">
            <Trash /> Delete School
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {CARD_DETAILS.map((item) => (
          <Card key={item.id}>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-muted-foreground font-normal text-sm">
                {item.title}
              </CardTitle>
              <item.icon className="size-5" />
            </CardHeader>
            <CardContent>
              <h2 className="font-bold text-4xl">{item.data}</h2>
            </CardContent>
            <CardFooter className="justify-end">
              {item.actions ? (
                item.actions
              ) : (
                <Button size="sm" variant="ghost" disabled>
                  No action needed
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
