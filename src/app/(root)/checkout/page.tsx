import SectionBreadcrumb, {
  TBreadcrumbsItem,
} from "@/components/shared/SectionBreadcrumb";
import { Checkout } from "@/components/store/Checkout";
import { getShippingAddresses } from "@/lib/services/user";
import { auth } from "auth";

export const metadata = { title: "Checkout" };

const items: TBreadcrumbsItem[] = [
  { label: "Home", href: "/" },
  { label: "Checkout" },
];

const CheckoutPage = async () => {
  const session = await auth();

  const shippingAddress = session?.user
    ? await getShippingAddresses(session.user.id!)
    : [];

  return (
    <>
      <SectionBreadcrumb items={items} />
      <section>
        <div className="wrapper">
          <Checkout shippingAddress={shippingAddress} />
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;
