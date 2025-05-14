import SectionBreadcrumb, {
  TBreadcrumbsItem,
} from "@/components/shared/SectionBreadcrumb";
import { Checkout } from "@/components/store/Checkout";

export const metadata = { title: "Checkout" };

const items: TBreadcrumbsItem[] = [
  { label: "Home", href: "/" },
  { label: "Checkout" },
];

const CheckoutPage = () => {
  return (
    <>
      <SectionBreadcrumb items={items} />
      <section>
        <div className="wrapper">
          <Checkout />
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;
