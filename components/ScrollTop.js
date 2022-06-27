import React, { useCallback, useEffect, useRef } from "react";

const ScrollTop = () => {
  const scrollTo = useRef();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggle = () => {
      if (window.scrollY > 200) {
        scrollTo.current.classList.add("show");
      } else {
        scrollTo.current.classList.remove("show");
      }
    };
    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  return (
    <div className={"scrollTop"} onClick={scrollToTop} ref={scrollTo}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="bi bi-arrow-up-short"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
        />
      </svg>
    </div>
  );
};

export default ScrollTop;
