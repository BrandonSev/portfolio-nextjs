import Link from "next/link";

const ButtonLink = ({ linkUrl, linkText, style }) => {
  const handleClick = (e) => {
    const Event = new CustomEvent("active-menu", {
      detail: { target: e.target },
    });
    window.dispatchEvent(Event);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Link href={linkUrl} onClick={handleClick} style={style}>
      <a className="pulse button">{linkText}</a>
    </Link>
  );
};

export default ButtonLink;
