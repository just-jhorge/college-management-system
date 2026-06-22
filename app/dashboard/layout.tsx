import { redirect } from "next/navigation";
import { getSession } from "@/utils/session";
import { Role } from "@/generated/prisma/enums";

const ROLE_PAGE: Record<Role, string> = {
  TUTOR: "/tutor",
  ADMIN: "/school",
  STUDENT: "/student",
  SUPER_ADMIN: "/admin",
  ACCOUNTANT: "/accountant",
};

export default async function DashboardLayout() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  redirect(ROLE_PAGE[session.user.role as Role]);
}
