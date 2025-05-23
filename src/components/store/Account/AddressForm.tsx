"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  createShippingAddressIfNotExists,
  updateShippingAddress,
} from "@/lib/actions/user";
import { ALLOWED_COUNTRIES } from "@/lib/constants";
import { TShippingAddress } from "@/types";
import { AddressElement, Elements, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type AddressFormProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  shippingAddress: TShippingAddress;
  userId: string;
  mode: "add" | "edit";
};

const AddressForm = (props: AddressFormProps) => {
  return (
    <Elements stripe={stripe}>
      <Modal {...props} />
    </Elements>
  );
};

export default AddressForm;

const Modal = ({
  open = false,
  onOpenChange,
  shippingAddress,
  userId,
  mode,
}: AddressFormProps) => {
  const elements = useElements();
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const [isPending, startTransition] = useTransition();

  const { address, name, id } = shippingAddress;
  const [firstName, ...lastName] = name.split(" ");

  const handleChange = () => {
    setIsOpen(false);
    onOpenChange?.(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const addressElement = elements?.getElement("address");
      if (!addressElement) return;

      const { complete, value } = await addressElement.getValue();

      if (complete) {
        const { address, firstName, lastName } = value;

        const data: TShippingAddress = {
          id,
          address: { ...address, line2: address.line2 || "" },
          name: `${firstName} ${lastName}`,
        };

        const { success, message } =
          mode === "edit"
            ? await updateShippingAddress(data)
            : await createShippingAddressIfNotExists(data, userId);

        if (success) {
          setIsOpen(false);
          toast.success("Success", { description: message });
        } else {
          toast.error("Error", { description: message });
        }
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Address" : "Edit Address"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <AddressElement
            options={{
              allowedCountries: ALLOWED_COUNTRIES,
              mode: "shipping",
              display: { name: "split" },
              defaultValues:
                mode === "edit"
                  ? { address, firstName, lastName: lastName.join(" ") }
                  : undefined,
            }}
          />
          <Button
            type="submit"
            size="lg"
            className="w-full"
            loading={isPending}
          >
            {mode === "add" ? "Add Address" : "Update Address"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
