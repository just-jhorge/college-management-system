import UpdatePassword from "@/components/forms/UpdatePassword";
import { getSession } from "@/utils/session";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();
  const user = session?.user;

  if (!session || !user) {
    redirect("/login");
  }

  return (
    <main className="w-full h-dvh flex flex-col gap-4 items-center justify-center bg-muted">
      <UpdatePassword email={user.email} />
    </main>
  );
}
