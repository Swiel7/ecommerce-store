import { getMyOrders } from "@/lib/services/order";
import OrderList from "./OrderList";
import { cache } from "react";

const RefundedOrders = async ({ page }: { page: string }) => {
  // const { data: orders, totalPages } = await getMyOrders(
  //   "Refunded",
  //   Number(page) || 1,
  // );
  const { data: orders, totalPages } = await cache(() =>
    getMyOrders("Refunded", Number(page) || 1),
  )();

  return <OrderList orders={orders} totalPages={totalPages} />;
};

export default RefundedOrders;
