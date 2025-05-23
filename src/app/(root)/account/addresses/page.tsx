import { AddressList } from "@/components/store/Account";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getShippingAddresses } from "@/lib/services/user";
import { auth } from "auth";

export const metadata = { title: "Addresses" };

const AddressesPage = async () => {
  const session = await auth();
  if (!session?.user) return null;

  const userId = session.user.id!;
  const shippingAddresses = await getShippingAddresses(userId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Address</CardTitle>
      </CardHeader>
      <CardContent>
        <AddressList shippingAddresses={shippingAddresses} userId={userId} />
      </CardContent>
    </Card>
  );
};

export default AddressesPage;
