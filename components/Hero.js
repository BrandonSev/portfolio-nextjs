import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import HeroImage from "./HeroImage";

const Hero = ({ title, text, linkText, linkUrl }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={"container hero"}>
      <div className="hero_text">
        <h1 dangerouslySetInnerHTML={{ __html: title }}></h1>
        <p>{text}</p>
        <Link href={linkUrl}>
          <a className="pulse button">{linkText}</a>
        </Link>
        <a
          className="button pulse"
          href={"https://cv.brandon-seveste.fr"}
          target={"_blank"}
          rel={"noreferrer noopener"}
        >
          Voir mon CV
        </a>
      </div>
      <div className="hero_image">
        <HeroImage
          fillEllips={theme === "dark" ? "rgba(44,44,44)" : "rgba(215,215,215)"}
        />
      </div>
    </div>
  );
};

export default Hero;
