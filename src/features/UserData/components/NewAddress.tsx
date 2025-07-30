import { useMemo, useCallback } from "react";

import { TAddress } from "types/AuthTypes";

import { useAddAddress, useChangeDefaultAddress } from "../hooks/useUserData";
import { useNewAddress } from "../store/useAddress";
import { useChangeData } from "../store/userData";
import { TUserData } from "../types";

import BlackButton from "buttons/components/BlackButton";
import ClearIcon from "../../Header/components/ClearIcon";

export default function NewAddress({ setIsOpened }) {
  const city = useNewAddress((state) => state.city);
  const country = useNewAddress((state) => state.country);
  const street = useNewAddress((state) => state.street);
  const zip = useNewAddress((state) => state.zip);

  const setCity = useNewAddress((state) => state.setCity);
  const setCountry = useNewAddress((state) => state.setCountry);
  const setStreet = useNewAddress((state) => state.setStreet);
  const setZip = useNewAddress((state) => state.setZip);
  const clearAll = useNewAddress((state) => state.clearAll);

  const setAddresses = useChangeData((state) => state.setAddresses);
  const setDefaultAddress = useChangeData((state) => state.setDefaultAddress);

  const { mutate: addNewAddress } = useAddAddress();
  const { mutate: changeDefaultAddress } = useChangeDefaultAddress();

  const userData = useMemo<TUserData[]>(
    () => [
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
    ],
    [city, country, street, zip]
  );

  const onClickAdd = useCallback(() => {
    const newAddress: TAddress = {
      city,
      country,
      street,
      zip,
      isDefault: false,
    };

    addNewAddress(newAddress);
    setAddresses(newAddress);
    setDefaultAddress(newAddress);
    clearAll();
    setIsOpened(false);
  }, [
    city,
    country,
    street,
    zip,
    addNewAddress,
    setAddresses,
    changeDefaultAddress,
    clearAll,
  ]);

  return (
    <>
      <section className="userdata mt-4 mx-auto justify-items-center w-full border-1 border-stone-300 py-8 z-100 absolute top-[-370px] bg-white px-8 rounded-2xl">
        <div
          className="close absolute right-8 top-8"
          onClick={() => setIsOpened(false)}
        >
          <ClearIcon />
        </div>
        <h2 className="title text-2xl my-4 text-center">Adding new address</h2>
        <ul className="list flex flex-col gap-5 max-w-150 w-full">
          {userData.map((el) => (
            <li key={el.label} className="relative">
              <label
                htmlFor={el.label}
                className="capitalize absolute left-4 top-2 text-[14px] cursor-text"
              >
                {el.label}
              </label>
              <input
                className="pt-8 px-4 pb-2 border-1 border-stone-300 rounded-lg max-w-150 w-full placeholder:text-stone-500  transition-all duration-200 hover:border-black"
                type="text"
                name={el.label}
                placeholder={el.placeholder}
                id={el.label}
                value={el.value}
                onChange={(e) => el.func(e.target.value)}
              />
            </li>
          ))}
        </ul>
        <BlackButton
          children="Add address"
          twclass="mt-4 !max-w-150 !w-full"
          onClick={onClickAdd}
        />
      </section>
      <div
        className="bg w-[100vw] h-[100vh] fixed left-0 top-0 bg-black opacity-30 z-1"
        onClick={() => setIsOpened(false)}
      ></div>
    </>
  );
}
