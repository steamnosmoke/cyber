import { TService, TSocial } from "../types";

import twitter from "../images/Twitter.svg";
import facebook from "../images/Facebook.svg";
import tiktok from "../images/Tiktok.png";
import instagram from "../images/Instagram.svg";

export const services: TService[] = [
  { label: "Bonus program", link: "/" },
  { label: "Gift cards", link: "/" },
  { label: "Credit and payment", link: "/" },
  { label: "Service contracts", link: "/" },
  { label: "Non-cash account", link: "/" },
  { label: "Payment", link: "/" },
];

export const assistances: TService[] = [
  { label: "Find an order", link: "/" },
  { label: "Terms of delivery", link: "/" },
  { label: "Exchange and return of goods", link: "/" },
  { label: "Guarantee", link: "/" },
  { label: "Frequently asked questions", link: "/" },
  { label: "Terms of use of the site", link: "/" },
];

export const socials: TSocial[] = [
  { icon: twitter, alt: "twitter", link: "#!" },
  { icon: facebook, alt: "facebook", link: "#!" },
  { icon: tiktok, alt: "tiktok", link: "#!" },
  { icon: instagram, alt: "instagram", link: "#!" },
];
