import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [width, setWidth] = useState(0);
  const [left, setLeft] = useState("");
  const handleWidth = (e) => {
    setWidth(e.target.offsetWidth);
    if (window.scrollY > 15) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    const children = document.querySelectorAll(".nav_item");
    const linkClick = (e) => {
      if (e.detail.target.href.split("/")[3] === "") {
        setWidth(children[0].offsetWidth);
        setLeft(children[0].offsetLeft);
        return;
      }
      if (e.detail.target.href.split("/")[3] === "mes-realisations") {
        setWidth(children[1].offsetWidth);
        setLeft("90px");
        return;
      }
      if (e.detail.target.href.split("/")[3] === "contact") {
        setWidth(children[2].offsetWidth);
        setLeft("221px");
      }
    };
    if (window.location.pathname === "/") {
      setWidth(children[0].offsetWidth);
      setLeft(children[0].offsetLeft);
    }
    if (window.location.pathname === "/mes-realisations") {
      setWidth(children[1].offsetWidth);
      setLeft("90px");
    }
    if (window.location.pathname === "/contact") {
      setWidth(children[2].offsetWidth);
      setLeft("221px");
    }
    window.addEventListener("active-menu", linkClick);
    return () => {
      window.removeEventListener("active-menu", linkClick);
    };
  }, [width]);
  return (
    <nav>
      <div className="container">
        <ul className="navbar">
          <li className="marker" style={{ width, left }} />
          <li>
            <Link href="/">
              <a className={"nav_item"} onClick={handleWidth}>
                Accueil
              </a>
            </Link>
          </li>
          <li>
            <Link href="/mes-realisations">
              <a className={"nav_item"} onClick={handleWidth}>
                Réalisations
              </a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a className={"nav_item"} onClick={handleWidth}>
                Contact
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
