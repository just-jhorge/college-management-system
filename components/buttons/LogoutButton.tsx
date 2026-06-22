"use client";

import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();

  async function signout() {
    const { data, error } = await authClient.signOut();
    console.log(data, error);
    router.refresh();
  }

  return (
    <Button variant="destructive" onClick={signout}>
      <LogOutIcon />
      Log out
    </Button>
  );
}
