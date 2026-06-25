"use client";

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Loader2, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function signout() {
    startTransition(async () => {
      const { data, error } = await authClient.signOut();

      if (error) {
        toast.error("Something went wrong. Please try again.");
      }

      if (data?.success) {
        toast.success("Logged out successfully");
        router.refresh();
      }
    });
  }

  return (
    <>
      <Button variant="destructive" onClick={() => setIsOpen(true)}>
        <LogOutIcon />
        Log out
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim
              natus assumenda repudiandae culpa quod, corporis odio beatae
              deleniti sint, autem molestias tempore totam, ipsum delectus.
              Excepturi quibusdam a mollitia repellendus.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              disabled={isPending}
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              variant="destructive"
              onClick={signout}
            >
              {isPending && <Loader2 className="animate-spin" />}
              {isPending ? "Logging out..." : "Yes, log out"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
