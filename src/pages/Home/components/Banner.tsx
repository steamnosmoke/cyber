
import { Link } from "react-router";

import iphone from "../images/Iphone.png";
import WhiteLineButton from "buttons/components/WhiteLineButton";

export default function Banner() {
  return (
    <>
      <section className="banner bg-[rgba(33,28,36,1)] w-full h-130 relative">
        <div className="container mx-auto">
          <div className="banner-inner flex items-center justify-center">
            <div className="banner-info flex flex-col items-start gap-3 w-180 text-stone-300">
              <p className="banner-description text-xl font-semibold ">
                Pro.Beyond.
              </p>
              <h1 className="banner-title text-7xl font-[100] text-white">
                IPhone 16{" "}
                <span className="font-semibold">Pro</span>
              </h1>
              <p className="banner-description text-[18px] font-semibold">
                Created to change everything for the better. For everyone
              </p>
              <Link to={"/catalog/Phones/iPhone_16_pro_Titanium_Black_1TB"}>
                <WhiteLineButton children={"View"} twclass="" />
              </Link>
            </div>
            <img className="banner-img iphone" src={iphone} alt="iphone" />
          </div>
        </div>
      </section>
    </>
  );
}
