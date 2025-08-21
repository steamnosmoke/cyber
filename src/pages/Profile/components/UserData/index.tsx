import BlackButton from "buttons/components/BlackButton";

import PersonalData from "./components/PersonalData";
import { useSaveData } from "./hooks/useSaveData";

export default function UserData() {
  const saveData = useSaveData()
  return (
    <section className="userdata mt-4 mx-auto justify-items-center w-full border-b-1 border-b-stone-300 pb-8">
      <h2 className="title text-2xl mb-4 text-center">
        Change your personal data
      </h2>
      <PersonalData />

      <BlackButton
        children="Save changes"
        twclass="mt-4 !max-w-150 !w-full"
        onClick={saveData}
      />
    </section>
  );
}
