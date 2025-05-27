import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate, formatPrice } from "@/lib/utils";
import { TOrder } from "@/types";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { orderStatusColors } from "@/data";
import OrderItem from "./OrderItem";

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
        {orders.map(({ id, createdAt, orderStatus, items, totalPrice }) => (
          <li key={id}>
            <Card>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-b p-4 !pt-0 lg:p-6">
                <span className="font-bold">Order: {id}</span>
                <span className="text-sm">{formatDate(createdAt)}</span>
                <Badge
                  variant={orderStatusColors[orderStatus]}
                  className="ml-auto h-8"
                >
                  {orderStatus}
                </Badge>
              </div>
              <CardContent>
                <ul className="space-y-6 divide-y">
                  {items.map((item) => (
                    <li key={`${item.name} ${item.color}`}>
                      <OrderItem item={item} className="border-none p-0 pb-6" />
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center justify-between gap-5 border-t pt-6">
                  <span className="text-lg font-bold">
                    Total: {formatPrice(totalPrice)}
                  </span>
                  <Button size="lg" asChild>
                    <Link href={`/orders/${id}`}>View Order Details</Link>
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
