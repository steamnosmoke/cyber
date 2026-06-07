import BlackButton from "components/buttons/components/BlackButton";
import ChooseAddress from "./components/ChooseAddress";
import useMakeOrder from "hooks/useMakeOrder";
import useUpdateStock from "../Cart/hooks/useUpdateStock";
import { useAuthStore } from "store/authStore";
import useClearCart from "../Cart/hooks/useClearCart";
import { useNavigate } from "react-router";
import useGetCart from "hooks/cart/useGetCart";

export default function ConfirmOrder() {
  const userId = useAuthStore((state) => state.firebaseId);
  const { cart: products } = useGetCart(userId);
  const { mutate: makeOrder } = useMakeOrder(userId);
  const { mutate: updateStock } = useUpdateStock();
  const { mutate: clearCart } = useClearCart(userId);
  const navigate = useNavigate();

  const confirmOrder = () => {
    updateStock(products);
    clearCart();
    makeOrder(products);
    navigate("/profile");
  };

  return (
    <div className="pt-20 relative">
      <div className="container flex flex-col items-center w-full">
        <ChooseAddress />
        <BlackButton
          children="Подтвердить заказ"
          twclass="mt-10 w-80! py-8!"
          textclass="text-2xl!"
          onClick={confirmOrder}
        />
      </div>
    </div>
  );
}
