import { getMyOrders } from "@/lib/services/order";
import OrderList from "./OrderList";
import { cache } from "react";

const DeliveredOrders = async ({ page }: { page: string }) => {
  // const { data: orders, totalPages } = await getMyOrders(
  //   "Delivered",
  //   Number(page) || 1,
  // );
  const { data: orders, totalPages } = await cache(() =>
    getMyOrders("Delivered", Number(page) || 1),
  )();

  return <OrderList orders={orders} totalPages={totalPages} />;
};

export default DeliveredOrders;
