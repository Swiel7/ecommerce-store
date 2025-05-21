import { AddressCard } from "@/components/store/Account";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getShippingAddresses } from "@/lib/services/user";
import { TShippingAddress } from "@/types";
import { auth } from "auth";

export const metadata = { title: "Addresses" };

const AddressesPage = async () => {
  const session = await auth();

  // const shippingAddresses = session?.user
  //   ? await getShippingAddresses(session.user.id!)
  //   : [];

  const elements = session?.user
    ? await getShippingAddresses(session.user.id!)
    : [];

  const shippingAddresses: TShippingAddress[] = [];

  for (let i = 0; i < 7; i++) {
    shippingAddresses.push(...elements);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Address</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(33%,1fr))] gap-6">
          {shippingAddresses.map((shippingAddress) => (
            <li key={shippingAddress.id}>
              <AddressCard shippingAddress={shippingAddress} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default AddressesPage;
