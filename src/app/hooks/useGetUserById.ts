import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { TUser } from "types/AuthTypes";
import DB_URL from "constants/DB_URL";

async function getUser(firebaseId: string): Promise<TUser> {
  const { data } = await axios.get<TUser>(
    `${DB_URL}users/${firebaseId}.json`
  );
  return data;
}

export default function useGetUserById(firebaseId: string) {
  return useQuery({
    queryFn: () => getUser(firebaseId),
    queryKey: ["user", firebaseId],
  });
}
