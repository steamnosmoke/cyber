import { Link } from "react-router";

import blue from "../images/1.png";
import white from "../images/2.png";
import orange from "../images/3.png";
import WhiteLineButton from "buttons/components/WhiteLineButton";
import { useEffect, useState } from "react";

export default function Banner() {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
  }, []);
  return (
    <>
      <section className="banner bg-[rgba(33,28,36,1)] w-full h-140  relative overflow-y-hidden">
        <div className="container mx-auto h-full">
          <div className="banner-inner flex items-center justify-center h-full">
            <div className="banner-info flex flex-col items-start justify-start gap-1 w-140 text-stone-300">
              <p className="banner-description text-2xl font-semibold ">
                Pro.Beyond.
              </p>
              <h1 className="banner-title text-7xl font-[100] text-white">
                IPhone 17 <span className="font-semibold">Pro</span>
              </h1>
              <p className="banner-description text-xl font-semibold">
                Smarter. Faster. More Pro than ever
              </p>
              <Link to={"/catalog/Phones/iPhone_17_Pro_Cosmic_Orange_2048GB"}>
                <WhiteLineButton children={"View"} twclass="!px-15 !py-3 text-lg mt-5" />
              </Link>
            </div>

            <div className="relative max-w-195 w-full h-full">
              <img
                src={blue}
                className={`${animate ? "blue" : "w-0"} phone-bottom right-90`}
              />
              <img
                src={white}
                className={`${animate ? "white" : "w-0"} phone-bottom right-45`}
              />
              <img
                src={orange}
                className={`${animate ? "orange" : "w-0"} phone-bottom right-0`}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
