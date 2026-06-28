"use server";

import { redirect } from "next/navigation";
import { getSession } from "@/utils/session";
import { prisma } from "@/lib/prisma";

export async function getUserSchool() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  return user.role !== "SUPER_ADMIN"
    ? await prisma.school.findUnique({
        where: { adminId: user.id },
        select: { name: true },
      })
    : null;
}
