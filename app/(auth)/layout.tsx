import React from "react";
import { School2 } from "lucide-react";
import { redirect } from "next/navigation";
import { getSession } from "@/utils/session";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session) redirect("/dashboard");

  return (
    <main className="w-full h-dvh flex flex-col gap-4 items-center justify-center bg-muted">
      <div className="flex items-center gap-1">
        <School2 />
        <h3 className="text-lg font-semibold">Collegerr</h3>
      </div>
      {children}
    </main>
  );
}
