import { Role } from "@/generated/prisma/enums";
import { getSession } from "@/utils/session";
import { redirect } from "next/navigation";

const ROLE_PAGE: Record<Role, string> = {
  TUTOR: "/dashboard/tutor",
  ADMIN: "/dashboard/school",
  STUDENT: "/dashboard/student",
  SUPER_ADMIN: "/dashboard/admin",
  ACCOUNTANT: "/dashboard/accountant",
};

export default async function Page() {
  const session = await getSession();

  if (!session) redirect("/login?redirect=/dashboard");

  redirect(ROLE_PAGE[session.user.role as Role]);
}
