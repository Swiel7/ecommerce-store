"use client";

import { RegisterForm } from "@/components/store/Auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterModal = () => {
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
          <DialogTitle>Create New Account</DialogTitle>
          <DialogDescription>Please Enter Details</DialogDescription>
        </DialogHeader>
        <RegisterForm intercept onSubmit={handleChange} />
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
