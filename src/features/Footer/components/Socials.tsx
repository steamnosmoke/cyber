import { socials } from "../config/lists";

export default function Socials() {
  return (
    <ul className="socials flex gap-8 mt-8">
      {socials.map((item, index) => (
        <li
          key={index}
          className="social transition-all duration-100 ease-in-out hover:scale-110"
        >
          <a href={item.link} key={index}>
            <img className=" w-4 h-4" src={item.icon} alt={item.alt} />
          </a>
        </li>
      ))}
    </ul>
  );
}
