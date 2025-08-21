import { useNewAddress } from "../store/useAddress";
import { TAddressData } from "../types";

export default function useAddressData(): TAddressData[] {
  const { city, country, street, zip, setCity, setCountry, setStreet, setZip } =
    useNewAddress();
  return [
    {
      label: "city",
      value: city,
      placeholder: "New York",
      func: setCity,
    },
    {
      label: "country",
      value: country,
      placeholder: "USA",
      func: setCountry,
    },
    {
      label: "street",
      value: street,
      placeholder: "Brooklin st",
      func: setStreet,
    },
    {
      label: "zip",
      value: zip,
      placeholder: "123456",
      func: setZip,
    },
  ];
}
