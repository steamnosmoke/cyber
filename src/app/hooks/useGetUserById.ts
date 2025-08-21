import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { TUser } from "types/AuthTypes";
import DB_URL from "constants/DB_URL";

async function getUser(user: TUser): Promise<TUser> {
  const { data } = await axios.get<TUser>(
    `${DB_URL}users/${user.firebaseId}.json`
  );
  return data;
}

export default function useGetUserById(user: TUser) {
  return useQuery({
    queryFn: () => getUser(user),
    queryKey: ["user"],
  });
}
