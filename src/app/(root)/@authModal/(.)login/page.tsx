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
import { useState } from "react";

const LoginModal = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(true);

  const handleChange = () => {
    router.back();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome</DialogTitle>
          <DialogDescription>Please login here</DialogDescription>
        </DialogHeader>
        <LoginForm intercept onSuccess={handleChange} />
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
