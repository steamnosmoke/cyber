import axios from "axios";

import DB_URL from "constants/DB_URL";

import { TProduct } from "types/ProductTypes";

export default async function getUserWishlist(
  userId: string
): Promise<TProduct[]> {
  const url = `${DB_URL}/users/${userId}/wishlist.json`;
  const { data } = await axios.get<Record<string, TProduct>>(url);
  const wishlist = Object.entries(data)
    ? Object.entries(data).map((el) => {
        const [id, item] = el;
        return { ...item, id: id };
      })
    : [];
  return wishlist;
}
