import BlackButton from "buttons/components/BlackButton";

import PersonalData from "./components/PersonalData";
import { useSaveData } from "./hooks/useSaveData";
import { useEffect } from "react";

export default function UserData({ flag }: { flag: boolean }) {
  const saveData = useSaveData();

  useEffect(() => {
    if (flag) {
      const timer = setTimeout(() => {}, 300);
    }
  }, []);
  return (
    <section
      className={`userdata mx-auto w-full border-b-1 border-b-stone-300 flex flex-col items-center overflow-y-hidden transition-all duration-200 ease ${
        flag ? "pb-8 max-h-200  mt-4" : "pb-0 max-h-0 mt-[-1px]"
      }`}
    >
      <h2 className="title text-2xl mb-4 text-center">
        Change your personal data
      </h2>
      <PersonalData />

      <BlackButton
        children="Save changes"
        twclass="!mt-4 !max-w-150 !w-full"
        onClick={saveData}
      />
    </section>
  );
}
