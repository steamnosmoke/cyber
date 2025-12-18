import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 justify-items-center cursor-pointer rounded-full bg-black text-white shadow-lg transition-all duration-200 scrollButton ${
        isVisible ? "visible opacity-70" : "invisible opacity-0"
      } hover:opacity-100 hover:translate-y-[-6px]`}
      aria-label="Scroll to top"
    >
      <ArrowUp size={40} />
    </button>
  );
}
