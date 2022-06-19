import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

// Function to find offset value of children <li> for transition marker active , specific to my navbar structure
const findChildElementsOffset = (el, type) => {
  switch (type) {
    case "offsetLeft":
      return el.offsetLeft + el.childNodes[0].offsetLeft + "px";
    case "offsetWidth":
      return el.childNodes[0].offsetWidth + "px";
    default:
      break;
  }
};

const Navbar = () => {
  const router = useRouter();
  const [width, setWidth] = useState(0);
  const [left, setLeft] = useState(0);
  const navLink = useRef();

  useEffect(() => {
    const navItem = navLink.current.childNodes;
    if (router.pathname === "/") {
      setWidth(findChildElementsOffset(navItem[1], "offsetWidth"));
      setLeft(findChildElementsOffset(navItem[1], "offsetLeft"));
    }
    if (router.pathname === "/mes-realisations") {
      setWidth(findChildElementsOffset(navItem[2], "offsetWidth"));
      setLeft(findChildElementsOffset(navItem[2], "offsetLeft"));
    }
    if (router.pathname === "/contact") {
      setWidth(findChildElementsOffset(navItem[3], "offsetWidth"));
      setLeft(findChildElementsOffset(navItem[3], "offsetLeft"));
    }
    if (window.scrollY > 15) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [router.pathname]);
  return (
    <nav>
      <div className="container">
        <ul className="navbar" ref={navLink}>
          <li className="marker" style={{ width, left: left }} />
          <li>
            <Link href="/">
              <a className={"nav_item"}>Accueil</a>
            </Link>
          </li>
          <li>
            <Link href="/mes-realisations">
              <a className={"nav_item"}>Réalisations</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a className={"nav_item"}>Contact</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
