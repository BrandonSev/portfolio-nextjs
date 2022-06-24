import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

const Modal = ({ project, handleOpen, setModalIndex }) => {
  const ref = useRef();
  useOnClickOutside(ref, () => handleOpen(false));

  const handleClose = () => {
    handleOpen(false);
    setModalIndex(null);
  };

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        background: "#00000080",
        backdropFilter: "blur(5px)",
        zIndex: 2,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { delay: 0.2 } }}
    >
      <motion.div
        className={`modal`}
        key={"modal"}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.1 }}
        ref={ref}
      >
        <div className="modal_header">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 4000,
            }}
          >
            {project.images?.map((image) => (
              <SwiperSlide key={image.id}>
                <div className="wrapper-image">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/images/${image.src}`}
                    alt={image.alt}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="modal_body">
          <p className="technology">{project.tags}</p>
          <p className="date">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-calendar2"
                viewBox="0 0 16 16"
              >
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
              </svg>{" "}
              Début: {formatDate(project.start_date)}
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-calendar2-check"
                viewBox="0 0 16 16"
              >
                <path d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
              </svg>{" "}
              Fin: {formatDate(project.end_date)}
            </span>
          </p>
          <h2>{project.title}</h2>
          <p className="description">{project.description}</p>
          <div className="modal_button">
            <a
              href={`${project.url}`}
              rel={"noreferrer noopener"}
              target={"_blank"}
              className="button button_small pulse"
            >
              Visiter le site web
            </a>
          </div>
        </div>
        <div className="modal_close pulse" onClick={handleClose}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
