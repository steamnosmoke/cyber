import { Link } from "react-router";

import { services } from "../config/lists";

export default function Services() {
  return (
    <div className="block">
      <h4 className="title text-white mb-3">Services</h4>
      <ul className="list flex flex-col gap-1">
        {services.map((item, index) => (
          <li
            className="item text-[12px] py-1 cursor-pointer transition-all duration-150 ease-in-out hover:text-white "
            key={index}
          >
            <Link to={item.link}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
