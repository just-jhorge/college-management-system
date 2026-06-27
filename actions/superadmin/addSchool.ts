"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/utils/session";
import { generateSlug } from "@/utils/generators";

export async function addSchool(name: string) {
  try {
    const session = await getSession();
    const user = session?.user;

    if (!session || !user || user.role !== "SUPER_ADMIN") {
      return { success: false, message: "Unauthorized." };
    }

    await prisma.school.create({
      data: { name: name, slug: generateSlug(name) },
    });

    return { success: true, message: "School added successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal server error." };
  }
}
