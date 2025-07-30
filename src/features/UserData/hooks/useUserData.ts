import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";

import { useAuthStore } from "store/authStore";
import { TAddress, TUser } from "types/AuthTypes";

async function addAddress(address: TAddress): Promise<{ name: string }> {
  const userId: string = useAuthStore.getState().user.firebaseId;
  const url: string = `${DB_URL}users/${userId}/addresses.json`;
  const { data } = await axios.post<{ name: string }>(url, address);
  changeDefaultAddress({ ...address, id: data.name });
  return data;
}

async function changeDefaultAddress(
  address: TAddress
): Promise<{ isDefault: string }> {
  const user: TUser = useAuthStore.getState().user;
  const url = `${DB_URL}users/${user.firebaseId}/addresses`;
  const defaultAddress = await getDefaultAddress();

  if (defaultAddress && defaultAddress.id !== address.id) {
    await axios.patch(`${url}/${defaultAddress.id}.json`, {
      isDefault: false,
    });
  }

  const { data } = await axios.patch<{ isDefault: string }>(
    `${url}/${address.id}.json`,
    {
      isDefault: true,
    }
  );

  return { ...address, ...data };
}

async function getAddresses(): Promise<TAddress[]> {
  const user: TUser = useAuthStore.getState().user;
  const url = `${DB_URL}users/${user.firebaseId}/addresses.json`;

  const { data } = await axios.get<Record<string, TAddress> | null>(url);

  return Object.values(data)
    ? Object.entries(data).map(([id, address]) => ({
        ...address,
        id,
      }))
    : [];
}

async function getDefaultAddress(): Promise<TAddress> {
  const addresses = await getAddresses();
  return addresses
    ? addresses.find((address) => address.isDefault)
    : { country: "", city: "", street: "", zip: "" };
}

async function saveData(updatedUser: TUser): Promise<TUser> {
  const user: TUser = useAuthStore.getState().user;
  const url: string = `${DB_URL}users/${user.firebaseId}.json`;
  const { data } = await axios.patch<TUser>(url, updatedUser);
  return {...user, ...data};
}

export function useSaveData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveData,
    mutationKey: ["user", "addresses"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "addresses"] });
    },
  });
}

export function useAddAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addAddress,
    mutationKey: ["user", "addresses"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "addresses"] });
    },
  });
}
export function useChangeDefaultAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeDefaultAddress,
    mutationKey: ["user", "addresses"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "addresses"] });
    },
  });
}

export function useGetAddresses() {
  return useQuery<TAddress[]>({
    queryFn: getAddresses,
    queryKey: ["user", "addresses"],
  });
}

