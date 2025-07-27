import user from "constants/user";
import { useMemo, useCallback } from "react";
import { useAddAddress } from "../store/useAddress";
import { TUserData } from "../types";
import BlackButton from "buttons/components/BlackButton";
import ClearIcon from "../../Header/components/ClearIcon";

export default function NewAddress({ setIsOpened }) {
  const setCity = useAddAddress((state) => state.setCity);
  const setCountry = useAddAddress((state) => state.setCountry);
  const setStreet = useAddAddress((state) => state.setStreet);
  const setZip = useAddAddress((state) => state.setZip);

  const city = useAddAddress((state) => state.city);
  const country = useAddAddress((state) => state.country);
  const street = useAddAddress((state) => state.street);
  const zip = useAddAddress((state) => state.zip);

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
    [user, city, country, street, zip]
  );

  const onChange = useCallback(
    (func: (e: string) => void, e: string) => {
      func(e);
    },
    [user, city, country, street, zip]
  );
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
                onChange={(e) => onChange(el.func, e.target.value)}
              />
            </li>
          ))}
        </ul>
        <BlackButton children="Add address" twclass="mt-4 !max-w-150 !w-full" />
      </section>
      <div
        className="bg w-[100vw] h-[100vh] fixed left-0 top-0 bg-black opacity-30 z-0"
        onClick={() => setIsOpened(false)}
      ></div>
    </>
  );
}
