"use server";

import { prisma } from "@/lib/prisma";

export async function getAvailableAdmins() {
  return await prisma.user.findMany({
    where: { role: "ADMIN", schoolId: null },
    select: { id: true, name: true, email: true },
  });
}
