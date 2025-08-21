import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

const Home = lazy(() => import("pages/Home"));
const Catalog = lazy(() => import("pages/Catalog"));
const Product = lazy(() => import("pages/Product"));
const ChoosingCategories = lazy(() => import("pages/ChoosingCategories"));
const Profile = lazy(() => import("pages/Profile"));
const Cart = lazy(() => import("pages/Cart"));
const Wishlist = lazy(() => import("pages/Wishlist"));

export default function RoutesComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<ChoosingCategories />} />
        {/* <Route path='/contacts' element={<Contacts />} />
            <Route path='/blog' element={<Blog />} /> */}
        <Route path="/catalog/:category" element={<Catalog />} />
        <Route path="/catalog/:category/:fullname" element={<Product />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </Suspense>
  );
}
