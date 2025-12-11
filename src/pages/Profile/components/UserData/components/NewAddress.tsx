import { TAddress } from "types/AuthTypes";
import { useAuthStore } from "store/authStore";

import { useAddAddress } from "../hooks/query/useAddAddress";
import useAddressData from "../hooks/useAddressData";
import { useAddress } from "../store/useAddress";
import { useChangeData } from "../store/useChageData";

import BlackButton from "buttons/components/BlackButton";
import close from "images/clear.svg";

export default function NewAddress() {
  const userId = useAuthStore((state) => state.firebaseId);
  const city = useAddress((state) => state.city);
  const country = useAddress((state) => state.country);
  const street = useAddress((state) => state.street);
  const zip = useAddress((state) => state.zip);
  const clearAll = useAddress((state) => state.clearAll);

  const setAddresses = useChangeData((state) => state.setAddresses);
  const setDefaultAddress = useChangeData((state) => state.setDefaultAddress);

  const setIsNewAddressOpened = useAddress(
    (state) => state.setIsNewAddressOpened
  );

  const { mutate: addNewAddress } = useAddAddress(userId);

  const addressData = useAddressData();

  const onClickAdd = () => {
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
    setIsNewAddressOpened(false);
  };

  const onCloseModal = () => {
    setIsNewAddressOpened(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <section className="userdata mx-auto justify-items-center w-full border-1 border-stone-300 py-8 z-1000 absolute top-[-370px] bg-white px-12 rounded-2xl">
        <div className="close absolute right-8 top-8" onClick={onCloseModal}>
          <img
            className="w-3 h-3 cursor-pointer transition-all duration-100 hover:opacity-60"
            src={close}
            alt="close"
          />
        </div>
        <h2 className="title text-2xl my-4 text-center">Adding new address</h2>
        <ul className="list flex flex-col gap-5 max-w-150 w-full">
          {addressData.map((el) => (
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
          twclass="mt-8 !max-w-150 !w-full"
          onClick={onClickAdd}
        />
      </section>
      <div
        className="bg w-[100vw] h-[100vh] fixed left-0 top-0 bg-black opacity-30 z-101"
        onClick={onCloseModal}
      ></div>
    </>
  );
}
