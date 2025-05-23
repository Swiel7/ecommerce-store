"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteShippingAddress } from "@/lib/actions/user";
import { useTransition } from "react";
import { toast } from "sonner";

const DeleteAddressModal = ({
  isOpen,
  setIsOpen,
  addressId,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addressId: string;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const { success, message } = await deleteShippingAddress(addressId);

      if (success) {
        setIsOpen(false);
        toast.success("Success", { description: message });
      } else {
        toast.error("Error", { description: message });
      }
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            shipping address from our database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} asChild>
            <Button loading={isPending}>Delete</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAddressModal;
