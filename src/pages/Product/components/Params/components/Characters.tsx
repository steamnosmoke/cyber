import { useProductStore } from "store/productsStore";
import getCharacters from "../utils/getCharacters";

export default function Characters() {
  const product = useProductStore((state) => state.product);

  const characters = getCharacters(product);

  return (
    <ul className="characters_list grid grid-cols-3 grid-rows-2 gap-4 items-center w-full">
      {characters.length > 0 &&
        characters.map((character, index) => {
          const Icon = character.img;

          return (
            <li
              className="characters_item flex items-center gap-2 py-4 px-2 bg-stone-100 rounded-md"
              key={index}
            >
              {typeof Icon === "string" ? (
                <img src={Icon} alt="" />
              ) : (
                <Icon size={24} />
              )}

              <p className="naming text-[14px] text-stone-400 leading-4 max-w-30">
                {character.label}
                <br />
                <span className="value text-[14px] leading-4 text-wrap text-stone-500">
                  {character.value}
                </span>
              </p>
            </li>
          );
        })}
    </ul>
  );
}
