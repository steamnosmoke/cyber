import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { User } from "types/AuthTypes";
import DB_URL from "constants/DB_URL";

async function geUser(firebaseId: string): Promise<User> {
  const { data } = await axios.get<User>(
    `${DB_URL}users/${firebaseId}.json`
  );
  return data;
}

export default function useGeUserById(firebaseId: string) {
  return useQuery({
    queryFn: () => geUser(firebaseId),
    queryKey: ["user", firebaseId],
  });
}
