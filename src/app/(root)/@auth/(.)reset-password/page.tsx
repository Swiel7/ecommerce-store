"use client";

import { ResetPasswordForm } from "@/components/store/Auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const ResetPasswordModal = () => {
  const router = useRouter();

  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>Please Enter Your New Password</DialogDescription>
        </DialogHeader>
        <ResetPasswordForm />
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordModal;
