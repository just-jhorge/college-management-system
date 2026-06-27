"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/utils/session";
import { headers } from "next/headers";

export async function changePassword({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}) {
  try {
    const session = await getSession();
    const user = session?.user;

    if (!user) {
      return { success: false, message: "Unauthorized." };
    }

    const data = await auth.api.changePassword({
      body: {
        newPassword,
        currentPassword,
      },
      headers: await headers(),
    });

    if (!data) {
      return {
        success: false,
        message: "Error updating password. Please try again.",
      };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { requiresPasswordChange: false },
    });

    return { success: true, message: "Password changed successfully." };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Internal server error",
    };
  }
}
