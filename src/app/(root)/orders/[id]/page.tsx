import SectionBreadcrumb, {
  TBreadcrumbsItem,
} from "@/components/shared/SectionBreadcrumb";
import {
  OrderDetailsCustomer,
  OrderDetailsHeader,
  OrderDetailsInfo,
  OrderDetailsItems,
  OrderDetailsPayment,
} from "@/components/store/Orders/OrderDetails";
import { getOrderById } from "@/lib/services/order";
import { cache } from "react";

export const metadata = { title: "Order Details" };

const breadcrumbItems: TBreadcrumbsItem[] = [
  { label: "Home", href: "/" },
  { label: "Orders", href: "/orders" },
  { label: "Order Details" },
];

const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  // const order = await getOrderById(id);
  const order = await cache(() => getOrderById(id))();

  // if (!order) notFound();
  if (!order) return <div>Order not found</div>;

  return (
    <>
      <SectionBreadcrumb items={breadcrumbItems} />
      <section>
        <div className="wrapper">
          <OrderDetailsHeader id={id} />
          <div className="flex gap-6 not-lg:flex-col">
            <div className="flex grow flex-col gap-6">
              <OrderDetailsInfo order={order} />
              <OrderDetailsItems items={order.items} />
              <OrderDetailsPayment order={order} />
            </div>
            <div className="w-full lg:max-w-80">
              <OrderDetailsCustomer
                user={order.user}
                shippingAddress={order.shippingAddress!}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderDetailsPage;
