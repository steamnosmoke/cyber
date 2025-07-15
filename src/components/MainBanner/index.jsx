import iphone from "../../assets/images/Iphone.png";
import { Link } from "react-router";
import WhiteLineButton from "buttons/WhiteLineButton";

export default function MainBanner() {
  return (
    <>
      <section className="banner bg-[rgba(33,28,36,1)] w-full h-158 relative">
        <div className="container mx-auto">
          <div className="banner-inner flex items-center justify-center">
            <div className="banner-info flex flex-col items-start gap-6 w-180 text-stone-300">
              <p className="banner-description text-2xl font-semibold ">
                Pro.Beyond.
              </p>
              <h1 className="banner-title text-8xl font-[100] text-white">
                IPhone 16{" "}
                <span className="font-semibold">Pro</span>
              </h1>
              <p className="banner-description text-xl font-semibold">
                Created to change everything for the better. For everyone
              </p>
              <Link to={"/catalog/Phones/1"}>
                <WhiteLineButton children={"View"} />
              </Link>
            </div>
            <img className="banner-img iphone" src={iphone} alt="iphone" />
          </div>
        </div>
      </section>
    </>
  );
}
