import Image from "next/image";
import ButtonLink from "../Button";

const Hero = ({ title, text, linkText, linkUrl }) => {
  return (
    <div className={"container hero"}>
      <div className="hero_text">
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        <p>{text}</p>
        <ButtonLink linkText={linkText} linkUrl={linkUrl} />
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
        <img src={"/image/Hero.png"} alt={"photo"} />
      </div>
    </div>
  );
};

export default Hero;
