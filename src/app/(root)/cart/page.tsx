import SectionBreadcrumb, {
  TBreadcrumbsItem,
} from "@/components/shared/SectionBreadcrumb";
import { Cart } from "@/components/store/Cart";

export const metadata = { title: "Cart" };

const items: TBreadcrumbsItem[] = [
  { label: "Home", href: "/" },
  { label: "Cart" },
];

const CartPage = () => {
  return (
    <>
      <SectionBreadcrumb items={items} />
      <section>
        <div className="wrapper">
          <Cart />
        </div>
      </section>
    </>
  );
};

export default CartPage;
