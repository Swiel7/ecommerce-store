import {
  AllOrders,
  DeliveredOrders,
  OrderTabs,
  PendingOrders,
  RefundedOrders,
} from "@/components/store/Orders";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

export const metadata = { title: "Orders" };

const OrdersPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await props.searchParams;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Orders</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default OrdersPage;
