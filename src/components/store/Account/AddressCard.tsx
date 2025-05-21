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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TShippingAddress } from "@/types";
import { Edit, EllipsisVertical, Trash2 } from "lucide-react";

const AddressCard = ({
  shippingAddress,
}: {
  shippingAddress: TShippingAddress;
}) => {
  const {
    name,
    address: { line1, line2, city, state, postal_code, country },
  } = shippingAddress;

  return (
    <Card className="min-w-1/3 !py-3 not-last:flex-1">
      <CardContent className="flex items-center gap-4 !px-3">
        <div className="grow space-y-1">
          <h3 className="font-bold">{name}</h3>
          <p className="text-sm">
            {line1}, {line2}
          </p>
          <p className="text-sm">
            {city}, {state} {postal_code} {country}
          </p>
        </div>
        <AlertDialog>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
              <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-32" align="end">
              {/* edit */}
              <DropdownMenuItem asChild>
                <button className="w-full">
                  <Edit /> Edit
                </button>
              </DropdownMenuItem>
              {/* delete */}
              <AlertDialogTrigger asChild>
                <DropdownMenuItem asChild>
                  <button className="w-full cursor-pointer">
                    <Trash2 /> Delete
                  </button>
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DeleteModal />
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default AddressCard;

const DeleteModal = () => {
  const handleDelete = async () => {
    console.log("delete");
  };

  return (
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
        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
