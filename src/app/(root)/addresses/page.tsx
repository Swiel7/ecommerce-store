import { AddressList } from "@/components/store/Account";
import { CardTitle } from "@/components/ui/card";
import { getShippingAddresses } from "@/lib/services/user";
import { auth } from "auth";

export const metadata = { title: "Addresses" };

const AddressesPage = async () => {
  const session = await auth();
  if (!session?.user) return null;

  const userId = session.user.id!;
  const shippingAddresses = await getShippingAddresses(userId);

  return (
    <section>
      <div className="wrapper">
        <CardTitle className="mb-6">Shipping Address</CardTitle>
        <AddressList shippingAddresses={shippingAddresses} userId={userId} />
      </div>
    </section>
  );
};

export default AddressesPage;
