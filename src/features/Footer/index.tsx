import { Link } from "react-router";
import { useMemo } from "react";
import { TService, TSocial } from "./types";

import logo from "assets/images/Logo-white.svg";
import twitter from "./images/Twitter.svg";
import facebook from "./images/Facebook.svg";
import tiktok from "./images/Tiktok.png";
import instagram from "./images/Instagram.svg";

export default function Footer() {
  const services = useMemo<TService[]>(() => {
    return [
      { label: "Bonus program", link: "/" },
      { label: "Gift cards", link: "/" },
      { label: "Credit and payment", link: "/" },
      { label: "Service contracts", link: "/" },
      { label: "Non-cash account", link: "/" },
      { label: "Payment", link: "/" },
    ];
  }, []);

  const assistances = useMemo<TService[]>(() => {
    return [
      { label: "Find an order", link: "/" },
      { label: "Terms of delivery", link: "/" },
      { label: "Exchange and return of goods", link: "/" },
      { label: "Guarantee", link: "/" },
      { label: "Frequently asked questions", link: "/" },
      { label: "Terms of use of the site", link: "/" },
    ];
  }, []);

  const socials = useMemo<TSocial[]>(() => {
    return [
      { icon: twitter, alt: "twitter", link: "#!" },
      { icon: facebook, alt: "facebook", link: "#!" },
      { icon: tiktok, alt: "tiktok", link: "#!" },
      { icon: instagram, alt: "instagram", link: "#!" },
    ];
  }, []);
  return (
    <>
      <footer className="footer bg-black py-21 mt-20 float-end">
        <div className="container">
          <div className="footer-inner flex justify-between items-start text-stone-300">
            <div className="left-block">
              <Link to={"/"}>
                <img src={logo} alt="logotype" />
              </Link>
              <p className="max-w-92 mt-6 text-[14px]">
                We are a residential interior design firm located in Portland.
                Our boutique-studio offers more than
              </p>
            </div>
            <div className="block">
              <h4 className="title text-white mb-4">Services</h4>
              <ul className="list flex flex-col gap-2">
                {services.map((item, index) => (
                  <li
                    className="item text-[14px] py-2 cursor-pointer transition-all duration-150 ease-in-out hover:text-white "
                    key={index}
                  >
                    <Link to={item.link}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="block">
              <h4 className="title text-white mb-4">Assistance to the buyer</h4>
              <ul className="list flex flex-col gap-2">
                {assistances.map((item, index) => (
                  <li
                    className="item text-[14px] py-2 cursor-pointer transition-all duration-150 ease-in-out hover:text-white "
                    key={index}
                  >
                    <Link to={item.link}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ul className="socials flex gap-8 mt-8">
            {socials.map((item, index) => (
              <li
                key={index}
                className="social transition-all duration-100 ease-in-out hover:scale-110"
              >
                <a href={item.link} key={index}>
                  <img className=" w-6 h-6" src={item.icon} alt={item.alt} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}
