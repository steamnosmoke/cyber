import { Link } from "react-router";

import { assistances } from "../config/lists";

export default function Assistances() {
  return (
    <div className="block">
      <h4 className="title text-white mb-3">Assistance to the buyer</h4>
      <ul className="list flex flex-col gap-1">
        {assistances.map((item, index) => (
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
