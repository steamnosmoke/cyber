import mac from "./images/MacBook.png";
import ps from "./images/ps.png";
import ap from "./images/ap-max.png";
import vision from "./images/vision.png";

import BlackLineButton from "../buttons/BlackLineButton";
import { Link } from "react-router";

export default function Tablets() {
  return (
    <>
      <section className="tablets w-full pt-20 z-10 relative bg-white">
        <div className="tablets-inner  h-150 max-w-405 mx-auto grid grid-cols-2 grid-rows-1">
          <div className="left-side h-full bg-white grid grid-cols-2 grid-rows-2">
            <div className="ps5-block col-span-2 flex items-center justify-start">
              <div
                className="ps-img h-full w-[40%] bg-cover bg-no-repeat bg-right"
                style={{ backgroundImage: `url(${ps})` }}
              ></div>
              <div className="ps5-info w-[338px]">
                <h2 className="text-5xl font-medium">Playstation 5</h2>
                <p className="text-stone-400 text-[14px] mt-2">
                  Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O
                  will redefine your PlayStation experience.
                </p>
              </div>
            </div>
            <div className="airpods-block bg-[rgb(237,237,237)] flex items-center justify-start gap-12">
              <div
                className="airpods-img h-[90%] w-[30%] bg-cover bg-right"
                style={{ backgroundImage: `url(${ap})` }}
              ></div>
              <div className="airpods-info w-40 gap-2">
                <h2 className="text-3xl font-light">
                  Apple
                  <br />
                  AirPods
                  <br /> <span className="font-semibold">Max</span>
                </h2>
                <p className="text-stone-500 text-[14px] mt-2">
                  Computational audio. Listen, it's powerfulf
                </p>
              </div>
            </div>
            <div className="vision-block  bg-[rgb(53,53,53)] flex items-center justify-start gap-12">
              <div
                className="vision-img h-full w-[40%] bg-cover bg-right bg-no-repeat"
                style={{ backgroundImage: `url(${vision})` }}
              ></div>
              <div className="vision-info w-40 gap-2">
                <h2 className="text-white text-3xl font-light">
                  Apple <br />
                  Vision <span className="font-semibold">Pro</span>
                </h2>
                <p className="text-stone-400 text-[16px] mt-2">
                  An immersive way to experience entertainment
                </p>
              </div>
            </div>
          </div>
          <div className="right-side bg-[rgb(237,237,237)] flex items-center justify-end overflow-hidden">
            <div className="w-92 gap-4 flex flex-col">
              <h2 className="text-black text-[64px] font-light">
                Macbook <span className="font-semibold">Air</span>
              </h2>
              <p className="text-stone-500 text-[14px]">
                The new 15‑inch MacBook Air makes room for more of what you love
                with a spacious Liquid Retina display.
              </p>
              <Link to="/">
                <BlackLineButton children={"View"} />
              </Link>
            </div>
            <div
              className="h-[80%] w-[40%] bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${mac})` }}
            ></div>
          </div>
        </div>
      </section>
    </>
  );
}
