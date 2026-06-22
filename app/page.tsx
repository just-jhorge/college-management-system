import { redirect } from "next/navigation";
import { getSession } from "@/utils/session";

export default async function Page() {
  const session = await getSession();

  redirect(session ? "/dashboard" : "/login");
}
