import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatDate, formatPrice } from "@/lib/utils";
import { TOrder } from "@/types";
import { CartItem } from "../Cart";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const badgeColors: Record<TOrder["orderStatus"], string> = {
  Pending: "text-yellow-500  bg-yellow-500/10",
  Delivered: "text-emerald-500 bg-emerald-500/10",
  // Cancelled: "text-red-500 bg-red-500/3",
  Refunded: "text-sky-500 bg-sky-500/10",
};

const OrderList = ({
  orders,
  totalPages,
}: {
  orders: TOrder[];
  totalPages: number;
}) => {
  return (
    <div className="space-y-6">
      <ul className="space-y-6">
        {orders.map((order) => (
          <li key={order.id}>
            <Card>
              <div className="flex flex-wrap items-center gap-5 border-b p-4 !pt-0 lg:p-6">
                <span className="font-bold">Order: {order.id}</span>
                <span className="text-sm">{formatDate(order.createdAt)}</span>
                <Badge
                  className={cn(
                    badgeColors[order.orderStatus],
                    "ml-auto h-8 border-current/30",
                  )}
                >
                  {order.orderStatus}
                </Badge>
              </div>
              <CardContent>
                <ul className="space-y-6 divide-y">
                  {order.items.map((item) => (
                    <li key={`${item.name} ${item.color}`} className="pb-6">
                      <CartItem
                        item={item}
                        withQuantityButton={false}
                        withRemoveButton={false}
                        className="p-0 [&>div]:gap-1 [&>div]:first-of-type:w-24"
                      />
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center justify-between gap-5 border-t pt-6">
                  <span className="text-lg font-bold">
                    Total: {formatPrice(order.totalPrice)}
                  </span>
                  <Button size="lg" asChild>
                    <Link href={`/account/orders/${order.id}`}>
                      View Order Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
};

export default OrderList;
