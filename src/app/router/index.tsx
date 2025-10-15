
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

import MyLoader from "pages/Product/components/Params/components/Loader";
import CartLoader from "pages/Cart/components/Loader";

const Home = lazy(() => import("pages/Home"));
const Catalog = lazy(() => import("pages/Catalog"));
const Product = lazy(() => import("pages/Product"));
const ChoosingCategories = lazy(() => import("pages/ChoosingCategories"));
const Profile = lazy(() => import("pages/Profile"));
const Cart = lazy(() => import("pages/Cart"));
const Wishlist = lazy(() => import("pages/Wishlist"));

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<ChoosingCategories />} />
      {/* <Route path='/contacts' element={<Contacts />} />
            <Route path='/blog' element={<Blog />} /> */}
      <Route path="/catalog/:category" element={<Catalog />} />
      <Route
        path="/catalog/:category/:fullname"
        element={
          <Suspense fallback={<MyLoader />}>
            <Product />
          </Suspense>
        }
      />
      <Route path="/profile" element={<Profile />} />
      <Route
        path="/cart"
        element={
          <Suspense fallback={<CartLoader className="mx-auto my-20 px-8" />}>
            <Cart />
          </Suspense>
        }
      />
      <Route path="/wishlist" element={<Wishlist />} />
    </Routes>
  );
}
