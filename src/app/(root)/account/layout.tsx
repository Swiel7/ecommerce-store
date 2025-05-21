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
          <div className="flex gap-x-16 gap-y-8 not-md:flex-col md:items-start">
            <AccountNav />
            <div className="grow">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Layout;
