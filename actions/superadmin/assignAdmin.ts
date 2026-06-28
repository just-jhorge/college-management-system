"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function assignAdmin(userId: string, schoolId: string) {
  try {
    const [existingUser, existingSchool] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
      }),
      prisma.school.findUnique({
        where: { id: schoolId },
      }),
    ]);

    if (!existingSchool) {
      return { success: false, message: "School not found." };
    }

    // TODO: What happens if a school already has an admin?

    if (!existingUser) {
      return { success: false, message: "User not found!" };
    }

    if (existingUser.role !== "ADMIN") {
      return {
        success: false,
        message: "Cannot assign this user to a school. Invalid role.",
      };
    }

    await prisma.school.update({
      where: { id: schoolId },
      data: {
        adminId: userId,
        status:
          existingSchool.status === "PENDING_SETUP"
            ? "ACTIVE"
            : existingSchool.status,
      },
    });

    revalidatePath("/dashboard/admin/schools");

    return { success: true, message: "Admin assigned successfully." };
  } catch (error) {
    // FIXME: Handle the error correctly here
    console.error(error);
    return { success: false, message: "Internal server error" };
  }
}
