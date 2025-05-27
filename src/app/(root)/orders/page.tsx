import {
  AllOrders,
  DeliveredOrders,
  OrderTabs,
  PendingOrders,
  RefundedOrders,
} from "@/components/store/Orders";
import { CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

export const metadata = { title: "Orders" };

const OrdersPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await props.searchParams;

  return (
    <section>
      <div className="wrapper">
        <CardTitle className="mb-6">Your Orders</CardTitle>
        <OrderTabs>
          <TabsContent value="all">
            <AllOrders page={page} />
          </TabsContent>
          <TabsContent value="pending">
            <PendingOrders page={page} />
          </TabsContent>
          <TabsContent value="delivered">
            <DeliveredOrders page={page} />
          </TabsContent>
          <TabsContent value="refunded">
            <RefundedOrders page={page} />
          </TabsContent>
        </OrderTabs>
      </div>
    </section>
  );
};

export default OrdersPage;
