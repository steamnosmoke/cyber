import { useMemo } from "react";
import points from "../config/navigatePoints";
import useConfirmOrder from "../store/useConfirmOrder";
export default function Navigation() {
  const navPoints = useMemo(() => points, []);
  const activePage = useConfirmOrder((state) => state.activePage);
  const setActivePage = useConfirmOrder((state) => state.setActivePage);
  return (
    <div>
      <div className="container">
        <ul className="py-12 flex justify-around items-center">
          {navPoints.map((el, key) => (
            <li
              key={key}
              className={`cursor-pointer ${activePage === key ? "opacity-100" : "opacity-60"}`}
              onClick={() => setActivePage(key)}
            >
              <div className="flex items-center gap-1">
                <img className="mt-2" src={el.img} alt={el.title} />
                <div>
                  <span className="text-sm leading-1">Step {key + 1}</span>
                  <p className="text-lg leading-4">{el.title}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
