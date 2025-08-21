import empty from "../images/empty.png";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-270px)]">
      <img src={empty} alt="empty cart icon" className="my-0 mx-auto w-50" />
      <h1 className="text-[32px] text-center block pl-5 pt-5">Cart is empty</h1>
    </div>
  );
}
