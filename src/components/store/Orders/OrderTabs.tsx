"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

const OrderTabs = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <Tabs defaultValue="all" onValueChange={() => router.replace(`?page=1`)}>
      <TabsList className="*:flex-1">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="delivered">Delivered</TabsTrigger>
        <TabsTrigger value="refunded">Refunded</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export default OrderTabs;
