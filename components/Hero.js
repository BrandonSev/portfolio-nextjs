import Image from "next/image";
import Link from "next/link";

const Hero = ({ title, text, linkText, linkUrl }) => {
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
        <Image
          src={"/image/Hero.png"}
          alt={"photo"}
          layout={"fill"}
          objectFit={"contain"}
          priority
          quality={100}
        />
      </div>
    </div>
  );
};

export default Hero;
