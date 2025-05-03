"use client";

import { ForgotPasswordForm } from "@/components/store/Auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const ForgotPasswordModal = () => {
  const router = useRouter();

  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Forgot Password</DialogTitle>
          <DialogDescription>
            Enter your registered email address. We’ll send you a code to reset
            your password.
          </DialogDescription>
        </DialogHeader>
        <ForgotPasswordForm />
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;
