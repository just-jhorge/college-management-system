import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/utils/session";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) redirect("/login");

  if (session.user.role !== "STUDENT") {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
