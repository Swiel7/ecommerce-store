"use client";

import { LoginForm } from "@/components/store/Auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const router = useRouter();

  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome</DialogTitle>
          <DialogDescription>Please login here</DialogDescription>
        </DialogHeader>
        <LoginForm intercept />
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
