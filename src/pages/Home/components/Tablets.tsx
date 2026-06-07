import useGetProducts from "hooks/useGetProducts";

import PromoLink from "./PromoCard";

import mac from "../images/MacBook.png";
import ps from "../images/ps5.png";
import ap from "../images/ap-max.png";
import vision from "../images/vis.png";

export default function Tablets() {
  const { products = [] } = useGetProducts("");

  const promoProducts = {
    ps5: products.find((p) => p.name.toLowerCase().includes("playstation 5")),

    airpods: products.find((p) => p.name.toLowerCase().includes("airpods max")),

    vision: products.find((p) => p.name.toLowerCase().includes("vision pro")),

    macbook: products.find((p) => p.name.toLowerCase().includes("macbook pro")),
  };

  return (
    <section className="tablets w-full pt-12 z-10 relative bg-white">
      <div className="tablets-inner h-100 max-w-480 mx-auto grid grid-cols-2 grid-rows-1">
        <div className="left-side h-full bg-white grid grid-cols-2 grid-rows-2">
          <PromoLink
            product={promoProducts.ps5}
            className="ps5-block bg-[rgba(236,236,236,0.64)] col-span-2 flex items-center justify-end"
          >
            <div
              className="ps-img h-full w-[50%] bg-cover bg-no-repeat bg-right"
              style={{ backgroundImage: `url(${ps})` }}
            />

            <div className="ps5-info w-[50%] pr-20">
              <h2 className="text-black text-[36px] font-light">
                Playstation 5
              </h2>

              <p className="text-stone-700 text-[14px] mt-2">
                Максимальная мощность, молниеносная скорость и новый уровень
                погружения в мир PlayStation.
              </p>
            </div>
          </PromoLink>

          <PromoLink
            product={promoProducts.airpods}
            className="airpods-block bg-[rgb(237,237,237)] flex items-center justify-end gap-12 pr-10 pl-10"
          >
            <div
              className="airpods-img h-full w-[40%] bg-contain bg-right bg-no-repeat"
              style={{ backgroundImage: `url(${ap})` }}
            />

            <div className="airpods-info w-[50%] gap-2">
              <h2 className="text-2xl font-light">
                Apple AirPods
                <br />
                <span className="font-semibold">Max</span>
              </h2>

              <p className="text-stone-700 text-[14px] mt-2">
                Интеллектуальное аудио. Звучание, которое впечатляет.
              </p>
            </div>
          </PromoLink>

          <PromoLink
            product={promoProducts.vision}
            className="vision-block bg-[rgb(223,223,223)] flex items-center justify-end gap-4 pr-10"
          >
            <div
              className="vision-img h-full w-[70%] bg-cover bg-right bg-no-repeat"
              style={{ backgroundImage: `url(${vision})` }}
            />

            <div className="vision-info w-[50%] gap-2">
              <h2 className="text-black text-2xl font-light">
                Apple Vision
                <span className="font-semibold">
                  <br />
                  Pro
                </span>
              </h2>

              <p className="text-stone-700 text-[14px] mt-2">
                Погрузись в развлечения по-новому.
              </p>
            </div>
          </PromoLink>
        </div>

        <PromoLink
          product={promoProducts.macbook}
          className="right-side bg-[rgb(214,214,214)] flex items-center justify-start overflow-hidden pl-20 py-10"
        >
          <div className="w-[60%] gap-2 flex flex-col">
            <h2 className="text-black text-[36px] font-light">
              Macbook <span className="font-semibold">Pro</span>
            </h2>

            <p className="text-stone-700 text-[14px]">
              Новый 16-дюймовый MacBook Pro открывает больше пространства для
              любимых задач благодаря большому дисплею Liquid Retina XDR.
            </p>
          </div>

          <div
            className="h-full w-full bg-contain bg-no-repeat"
            style={{ backgroundImage: `url(${mac})` }}
          />
        </PromoLink>
      </div>
    </section>
  );
}
