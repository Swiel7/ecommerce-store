import { TShippingAddress } from "@/types";

const AddressItem = ({
  shippingAddress,
}: {
  shippingAddress: TShippingAddress;
}) => {
  const {
    name,
    address: { line1, line2, city, state, postal_code, country },
  } = shippingAddress;

  return (
    <address className="grow space-y-1 text-sm font-medium not-italic">
      <h3>{name}</h3>
      <p>
        {line1}, {line2}
      </p>
      <p>
        {city}, {state} {postal_code} {country}
      </p>
    </address>
  );
};

export default AddressItem;
