import { Link } from "react-router";

import mac from "../images/MacBook.png";
import ps from "../images/ps5.png";
import ap from "../images/ap-max.png";
import vision from "../images/vis.png";

export default function Tablets() {
  return (
    <>
      <section className="tablets w-full pt-12 z-10 relative bg-white">
        <div className="tablets-inner  h-100 max-w-480 mx-auto grid grid-cols-2 grid-rows-1">
          <div className="left-side h-full bg-white grid grid-cols-2 grid-rows-2">
            <Link
              to={
                "/catalog/Gaming_Consoles/PlayStation_5_(Standard_Edition)_White_825GB_SSD"
              }
              className="ps5-block col-span-2 flex items-center justify-end"
            >
              <div
                className="ps-img h-full w-[50%] bg-cover  bg-no-repeat bg-right"
                style={{ backgroundImage: `url(${ps})` }}
              ></div>
              <div className="ps5-info w-[50%] pr-20">
                <h2 className="text-black text-[36px] font-light">
                  Playstation 5
                </h2>
                <p className="text-stone-400 text-[14px] mt-2">
                  Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O
                  will redefine your PlayStation experience.
                </p>
              </div>
            </Link>

            <Link
              to={"/catalog/Headphones/Apple_AirPods_Max_Space_gray"}
              className="airpods-block bg-[rgb(237,237,237)] flex items-center justify-end gap-12 pr-10 pl-10"
            >
              <div
                className="airpods-img h-full w-[40%] bg-contain bg-right bg-no-repeat"
                style={{ backgroundImage: `url(${ap})` }}
              ></div>
              <div className="airpods-info w-[50%] gap-2">
                <h2 className="text-2xl font-light">
                  Apple AirPods
                  <br /> <span className="font-semibold">Max</span>
                </h2>
                <p className="text-stone-500 text-[14px] mt-2">
                  Computational audio. Listen, it's powerfulf
                </p>
              </div>
            </Link>

            <Link
              to={"/"}
              className="vision-block bg-[rgb(53,53,53)] flex items-center justify-end gap-4 pr-10"
            >
              <div
                className="vision-img h-full w-[70%] bg-cover bg-right bg-no-repeat"
                style={{ backgroundImage: `url(${vision})` }}
              ></div>
              <div className="vision-info w-[50%] gap-2">
                <h2 className="text-white text-2xl font-light">
                  Apple
                  <br /> Vision <span className="font-semibold">Pro</span>
                </h2>
                <p className="text-stone-400 text-[14px] mt-2">
                  An immersive way to experience entertainment
                </p>
              </div>
            </Link>
          </div>

          <Link
            to={`/catalog/Computers/MacBook_Pro_16"_M3_Max_Space_Gray`}
            className="right-side bg-[rgb(237,237,237)] flex items-center justify-start overflow-hidden pl-20 py-10"
          >
            <div className="w-[60%] gap-2 flex flex-col cursor-pointer">
              <h2 className="text-black text-[36px] font-light">
                Macbook <span className="font-semibold">Pro</span>
              </h2>
              <p className="text-stone-500 text-[14px]">
                The new 16‑inch MacBook Pro makes room for more of what you love
                with a spacious Liquid Retina XDR display
              </p>
            </div>
            <div
              className="h-full w-full bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${mac})` }}
            ></div>
          </Link>
        </div>
      </section>
    </>
  );
}
