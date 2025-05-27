import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { orderStatusColors } from "@/data";
import { formatDate, formatPrice } from "@/lib/utils";
import { TOrder, TShippingAddress, TUser } from "@/types";
import { MoveLeft } from "lucide-react";
import { CartPrices } from "../Cart";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AddressItem } from "../Account";
import Link from "next/link";
import OrderItem from "./OrderItem";

export const OrderDetailsHeader = ({ id }: { id: string }) => {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-x-5">
      <CardTitle>Order: {id}</CardTitle>
      <Button variant="link" asChild>
        <Link href="/orders" className="flex items-center gap-2">
          <MoveLeft />
          Back
        </Link>
      </Button>
    </div>
  );
};

export const OrderDetailsInfo = ({ order }: { order: TOrder }) => {
  const { isPaid, createdAt, orderStatus, totalPrice, paymentMethod } = order;

  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle className="!lg:text-xl !text-lg">
          Order Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-5 sm:grid-flow-col">
          <div className="flex flex-col gap-2 text-sm font-medium">
            <span className="text-muted-foreground">Date</span>
            <span>{formatDate(createdAt)}</span>
          </div>
          <div className="flex flex-col gap-2 text-sm font-medium">
            <span className="text-muted-foreground">Payment Method</span>
            <span className="capitalize">{paymentMethod}</span>
          </div>
          <div className="flex flex-col gap-2 text-sm font-medium">
            <span className="text-muted-foreground">Paid</span>
            <Badge variant={isPaid ? "success" : "destructive"}>
              {isPaid ? "Yes" : "No"}
            </Badge>
          </div>
          <div className="flex flex-col gap-2 text-sm font-medium">
            <span className="text-muted-foreground">Status</span>
            <Badge variant={orderStatusColors[orderStatus]}>
              {orderStatus}
            </Badge>
          </div>
          <div className="flex flex-col gap-2 text-sm font-medium">
            <span className="text-muted-foreground">Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const OrderDetailsItems = ({ items }: { items: TOrder["items"] }) => {
  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle className="!lg:text-xl !text-lg">Products Ordered</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-4">
          {items.map((item) => (
            <li key={`${item.name} ${item.color}`}>
              <OrderItem item={item} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export const OrderDetailsPayment = ({ order }: { order: TOrder }) => {
  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle className="!lg:text-xl !text-lg">Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <CartPrices {...order} />
      </CardContent>
    </Card>
  );
};

export const OrderDetailsCustomer = ({
  user,
  shippingAddress,
}: {
  user: Pick<TUser, "email" | "firstName" | "lastName">;
  shippingAddress: TShippingAddress;
}) => {
  return (
    <Card>
      <CardHeader className="gap-6 border-b">
        <CardTitle className="!lg:text-xl !text-lg">Customer</CardTitle>
        <div className="flex items-center gap-3">
          <Avatar className="size-12">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user.firstName[0]}
              {user.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-bold">
              {user.firstName} {user.lastName}
            </span>
            <span className="text-muted-foreground text-sm font-medium">
              {user.email}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h4 className="mb-4 font-bold">Shipping Address</h4>
        <AddressItem shippingAddress={shippingAddress} />
      </CardContent>
    </Card>
  );
};
