"use server";

import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/utils/session";
import { cache } from "react";

export const getUserSchool = cache(async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user) redirect("/login");

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      schoolId: true,
      role: true,
      school: { select: { id: true, name: true } },
    },
  });

  if (!dbUser) notFound();
  if (dbUser.role === "SUPER_ADMIN") redirect("/dashboard/login");
  if (!dbUser.schoolId) return null;

  return dbUser.school;
});

// export async function getUserSchool() {

// const user = session?.user;

//   if (!user) redirect("/login");
//   return user.role !== "SUPER_ADMIN"
//     ? await prisma.school.findUnique({
//         where: { adminId: user.id },
//         select: { name: true },
//       })
//     : null;
// }
