"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";

export async function assignAdmin(userId: string, schoolId: string) {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const [user, school] = await Promise.all([
        tx.user.findUnique({
          where: { id: userId },
          select: { role: true, schoolId: true },
        }),
        tx.school.findUnique({
          where: { id: schoolId },
          select: { status: true, adminId: true },
        }),
      ]);

      if (!school) {
        return { success: false, message: "School not found." };
      }

      if (!user) {
        return { success: false, message: "User not found!" };
      }

      if (user.role !== "ADMIN") {
        return {
          success: false,
          message: "Cannot assign this user to a school. Invalid role.",
        };
      }

      if (user.schoolId && user.schoolId !== schoolId) {
        return {
          success: false,
          message: "User is already an admin at another school.",
        };
      }

      if (school.adminId && school.adminId !== userId) {
        await tx.user.update({
          where: { id: school.adminId },
          data: { schoolId: null },
        });
      }

      await tx.user.update({
        where: { id: userId },
        data: { schoolId },
      });

      await tx.school.update({
        where: { id: schoolId },
        data: {
          adminId: userId,
          status: school.status === "PENDING_SETUP" ? "ACTIVE" : school.status,
        },
      });

      return {
        success: true,
        message: "Admin assigned successfully.",
      };
    });

    if (result.success) {
      revalidatePath("/dashboard/admin/schools");
    }

    return { success: true, message: "Admin assigned successfully." };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return { success: false, message: "User or school no longer exists." };
      }
      if (error.code === "P2002") {
        return {
          success: false,
          message: "This user is already assigned elsewhere.",
        };
      }
    }
    console.error("assignAdmin failed:", error);
    return { success: false, message: "Internal server error." };
  }
}
