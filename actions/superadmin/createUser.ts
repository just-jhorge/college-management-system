"use server";

import { auth } from "@/lib/auth";
import { getSession } from "@/utils/session";
import { generateTempPassword } from "@/utils/generators";

export async function createUser({
  name,
  email,
  contact,
}: {
  name: string;
  email: string;
  contact: string;
}) {
  try {
    const session = await getSession();
    const user = session?.user;

    if (!user || user.role !== "SUPER_ADMIN") {
      return { success: false, message: "Unauthorized" };
    }

    const tempPassword = generateTempPassword(8);
    console.log(tempPassword);

    const data = await auth.api.signUpEmail({
      body: {
        name,
        email,
        contact,
        password: tempPassword,
        role: "ADMIN",
      },
    });

    if (!data.user) {
      return {
        success: false,
        message: "Something went wrong creating user. Please try again",
      };
    }

    return {
      success: true,
      message: "User created successfully.",
      tempPassword: tempPassword,
    };
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
