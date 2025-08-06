import Logo from "./components/Logo";
import Services from "./components/Services";
import Assistances from "./components/Assistances";
import Socials from "./components/Socials";

export default function Footer() {
  return (
    <>
      <footer className="footer bg-black py-21 mt-20 float-end">
        <div className="container">
          <div className="footer-inner flex justify-between items-start text-stone-300">
            <Logo />

            <Services />

            <Assistances />
          </div>

          <Socials />
        </div>
      </footer>
    </>
  );
}
