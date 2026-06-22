import { redirect } from "next/navigation";
import { getSession } from "@/utils/session";
import React from "react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session) redirect("/dashboard");

  return (
    <main className="w-full h-dvh flex items-center justify-center bg-muted">
      <div>{children}</div>
    </main>
  );
}
