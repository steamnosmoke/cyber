import { useAddress } from "../store/useAddress";
import { AddressData } from "../types";

export default function useAddressData(): AddressData[] {
  const { city, country, street, zip, setCity, setCountry, setStreet, setZip } =
    useAddress();
  return [
    {
      label: "Город",
      value: city,
      placeholder: "Казань",
      func: setCity,
    },
    {
      label: "Страна",
      value: country,
      placeholder: "Россия",
      func: setCountry,
    },
    {
      label: "Улица",
      value: street,
      placeholder: "ул. Пушкина",
      func: setStreet,
    },
    {
      label: "Индекс",
      value: zip,
      placeholder: "123456",
      func: setZip,
    },
  ];
}
