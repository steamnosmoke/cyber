import { useEffect, useRef } from "react";

export function useOpenModal() {
  const scrollY = useRef(0);

  useEffect(() => {
    scrollY.current = window.scrollY;

    document.body.style.overflowY = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY.current}px`;
    document.body.style.width = "calc(100% - 19px)";

    const header = document.querySelector("header");
    if (header) {
      header.style.width = "calc(100% - 19px)";
    }

    return () => {
      document.body.style.overflowY = "scroll";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      if (header) {
        header.style.width = "";
      }

      window.scrollTo(0, scrollY.current);
    };
  }, []);
}
