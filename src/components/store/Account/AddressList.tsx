"use client";

import { TShippingAddress } from "@/types";
import AddressCard from "./AddressCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddressForm from "./AddressForm";

const AddressList = ({
  shippingAddresses,
  userId,
}: {
  shippingAddresses: TShippingAddress[];
  userId: string;
}) => {
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
        {shippingAddresses.map((shippingAddress) => (
          <li key={shippingAddress.id}>
            <AddressCard shippingAddress={shippingAddress} userId={userId} />
          </li>
        ))}
      </ul>
      <Button size="lg" onClick={() => setIsAddOpen(true)}>
        Add New Address
      </Button>
      <AddressForm
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        userId={userId}
        shippingAddress={{
          address: {
            city: "",
            country: "",
            line1: "",
            line2: "",
            postal_code: "",
            state: "",
          },
          name: "",
        }}
        mode="add"
      />
    </div>
  );
};

export default AddressList;
