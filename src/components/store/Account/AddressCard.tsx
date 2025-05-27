"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TShippingAddress } from "@/types";
import { Edit, EllipsisVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteAddressModal from "./DeleteAddressModal";
import AddressForm from "./AddressForm";
import AddressItem from "./AddressItem";

const AddressCard = ({
  shippingAddress,
  userId,
}: {
  shippingAddress: TShippingAddress;
  userId: string;
}) => {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  return (
    <Card className="min-w-1/3 !py-3 not-last:flex-1">
      <CardContent className="flex items-center gap-4 !px-3">
        <AddressItem shippingAddress={shippingAddress} />
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger>
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-32" align="end">
            <DropdownMenuItem asChild>
              <button
                className="w-full cursor-pointer"
                onClick={() => setIsEditOpen(true)}
              >
                <Edit /> Edit
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button
                className="w-full cursor-pointer"
                onClick={() => setIsDeleteOpen(true)}
              >
                <Trash2 /> Delete
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {isEditOpen && (
          <AddressForm
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
            shippingAddress={shippingAddress}
            userId={userId}
            mode="edit"
          />
        )}
        <DeleteAddressModal
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
          addressId={shippingAddress.id!}
        />
      </CardContent>
    </Card>
  );
};

export default AddressCard;
