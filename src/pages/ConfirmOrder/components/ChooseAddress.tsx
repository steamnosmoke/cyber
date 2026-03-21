import { useAuthStore } from "store/authStore";
import { useGetAddresses } from "pages/Profile/components/UserData/hooks/query/useGetAddresses";
import { useChangeDefaultAddress } from "pages/Profile/components/UserData/hooks/query/useChangeDefaultAddress";
import { Address } from "types/AuthTypes";
import NewAddress from "../../Profile/components/UserData/components/NewAddress";
import { useAddress } from "../../Profile/components/UserData/store/useAddress";
import { useEffect } from "react";
import { useChangeData } from "../../Profile/components/UserData/store/useChangeData";
import useRemoveAddress from "../../Profile/components/UserData/hooks/query/useRemoveAddress";
import { X } from "lucide-react";

export default function ChooseAddress() {
  const isNewAddressOpened = useAddress((state) => state.isNewAddressOpened);
  const setIsNewAddressOpened = useAddress(
    (state) => state.setIsNewAddressOpened,
  );
  const setDefaultAddress = useChangeData((state) => state.setDefaultAddress);

  const userId = useAuthStore((state) => state.firebaseId);

  const { data: addresses, status: addrLoading } = useGetAddresses(userId);

  const { mutate: changeDefaultAddress } = useChangeDefaultAddress(userId);

  const { mutate: removeAddress } = useRemoveAddress(userId);

  const onChangeAddress = (el: Address) => {
    if (addrLoading === "success") changeDefaultAddress(el);
  };

  const onRemoveAddress = (address: Address) => {
    removeAddress(address);
    setDefaultAddress(null);
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className=" relative">
      <div className="container">
        {addresses && addresses.length > 0 ? (
          <div>
            <h1 className="text-2xl mb-10">Select Address</h1>
            <ul className="flex flex-col items-start justify-start gap-6">
              {addresses.map((el) => (
                <li
                  key={el.id}
                  className={`p-6 bg-stone-200 w-full flex items-center gap-5 cursor-pointer ${addrLoading === "pending" ? "opacity-30" : "opacity-100"} group transition-all duration-200 hover:bg-stone-300`}
                  onClick={() => onChangeAddress(el)}
                >
                  <div
                    className={`w-6 h-6 rounded-full outline-3 p-0.75 outline-black mb-auto`}
                  >
                    <div
                      className={`${el.isDefault ? "bg-black" : "bg-transparent"}  w-full h-full rounded-full`}
                    ></div>
                  </div>
                  <div className="w-full">
                    <h3 className="mb-4 text-lg">
                      {el.zip} {el.city}
                    </h3>
                    <p className="mb-2">
                      {el.zip} {el.country} {el.city} {el.street}
                    </p>
                  </div>
                  <X
                    className="w-6 h-6 opacity-0 transition-all duration-200 group-hover:opacity-100"
                    onClick={() => onRemoveAddress(el)}
                  />
                </li>
              ))}
              <li
                className={`p-6 h-24 bg-stone-200 w-full flex justify-center items-center gap-5 cursor-pointer ${addrLoading === "pending" ? "opacity-30" : "opacity-100"} group transition-all duration-200 hover:bg-stone-300`}
                onClick={() => setIsNewAddressOpened(true)}
              >
                <p className="text-lg transition-all duration-200 group-hover:text-xl">
                  + Add Address
                </p>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl mb-10">Add New Address</h1>
            <div
              className={`p-6 h-24 bg-stone-200 w-full flex justify-center items-center gap-5 cursor-pointer ${addrLoading === "pending" ? "opacity-30" : "opacity-100"} group transition-all duration-200 hover:bg-stone-300`}
              onClick={() => setIsNewAddressOpened(true)}
            >
              <p className="text-lg transition-all duration-200 group-hover:text-xl">
                + Add Address
              </p>
            </div>
          </div>
        )}

        {isNewAddressOpened && <NewAddress twclass="!max-w-150 !top-40" />}
      </div>
    </div>
  );
}
