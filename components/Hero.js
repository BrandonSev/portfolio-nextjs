import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Hero = ({ title, text, linkText, linkUrl }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={"container hero"}>
      <div className="hero_text">
        <h1 dangerouslySetInnerHTML={{ __html: title }}></h1>
        <p>{text}</p>
        <div className="button_wrapper">
          <Link href={linkUrl}>
            <a className="button">{linkText}</a>
          </Link>
          <a
            className="button"
            href={"https://cv.brandon-seveste.fr"}
            target={"_blank"}
            rel={"noreferrer noopener"}
          >
            Voir mon CV
          </a>
        </div>
      </div>
      <div className="hero_image">
        {theme &&
          (theme === "dark" ? (
            <Image
              src={"/image/Hero.png"}
              alt={"photo"}
              width={"515px"}
              height={"450px"}
              priority
              quality={100}
            />
          ) : (
            <Image
              src={"/image/Hero-light.png"}
              alt={"photo"}
              width={"515px"}
              height={"450px"}
              priority
              quality={100}
            />
          ))}
      </div>
    </div>
  );
};

export default Hero;
