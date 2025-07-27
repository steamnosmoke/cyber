import { Routes, Route } from "react-router";

import Home from "pages/Home";
import Catalog from "pages/Catalog";
import Product from "pages/Product";
import ChoosingCategories from "pages/ChoosingCategories";
import Profile from "pages/Profile";
import Cart from "pages/Cart";
import Wishlist from "pages/Wishlist";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<ChoosingCategories />} />
      {/* <Route path='/contacts' element={<Contacts />} />
            <Route path='/blog' element={<Blog />} /> */}
      <Route path="/catalog/:category" element={<Catalog />} />
      <Route path="/catalog/:category/:fullname" element={<Product />} />
      <Route path="/profile" element={<Profile />} />
      {/* <Route path="/profile/:id" element={<UserData />} /> */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
    </Routes>
  );
}
