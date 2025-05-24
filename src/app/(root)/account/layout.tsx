import SectionBreadcrumb, {
  TBreadcrumbsItem,
} from "@/components/shared/SectionBreadcrumb";
import { AccountNav } from "@/components/store/Account";

const items: TBreadcrumbsItem[] = [
  { label: "Home", href: "/" },
  { label: "Account" },
];

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SectionBreadcrumb items={items} />
      <section>
        <div className="wrapper">
          <div className="flex gap-8 not-sm:flex-col md:items-start lg:gap-16">
            <AccountNav />
            <div className="grow">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Layout;
