import React, { useEffect, useRef, useState } from "react";
import Hero from "../../components/Hero";
import Modal from "../../components/Modal";
import { AnimatePresence } from "framer-motion";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Head from "next/head";

const MesRealisations = ({ projectData }) => {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const handleClick = (i) => {
    setShow(true);
    setModalIndex(i);
  };

  useEffect(() => setMounted(true), []);

  return (
    <>
      <Head>
        <title>Brandon Seveste - Mes réalisations</title>
        <meta
          name="description"
          content="Développeur web et web mobile, retrouvez içi tout mes projets."
        />
      </Head>
      <Hero
        title={"Mes réalisations"}
        text={
          "Vous trouverez ci-dessous tous les projets que j'ai développé sur le plan professionel, scolaire ou personnel."
        }
        linkText={"Me contacter"}
        linkUrl={"/contact"}
      />
      <div className={`project`}>
        <div className="container">
          <div className="project_wrapper">
            <h2 className="active">Projets</h2>
            <Swiper
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                swiper.params.navigation.nextEl = navigationNextRef.current;
              }}
              modules={[Navigation, Autoplay]}
              slidesPerView={1}
              initialSlide={1}
              spaceBetween={32}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  initialSlide: 2,
                },
                1024: {
                  slidesPerView: 3,
                  initialSlide: 3,
                },
              }}
              rtl={"false"}
              loop={true}
              autoplay={{
                delay: 8000,
              }}
              swipeable={"true"}
            >
              {projectData &&
                projectData.map(
                  (project, i) =>
                    mounted && (
                      <SwiperSlide key={project.id}>
                        <div className="project_card">
                          <div className="project_card__header">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_URL}/images/${project.images[0].src}`}
                              alt={project.images.alt || "image carousel"}
                              layout={"fill"}
                              objectFit="cover"
                            />
                          </div>
                          <div className="project_card__body">
                            <p className="technology">{project.tags}</p>
                            <h3>{project.title}</h3>
                            <p>
                              {project.description.slice(0, 140)}
                              {project.description.length > 140 ? "..." : ""}
                            </p>
                            <div className="project_card__button">
                              <button
                                className="button button_small pulse"
                                onClick={() => handleClick(i)}
                              >
                                En savoir plus
                              </button>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    )
                )}
              <div className="swiper_navigation__wrapper">
                <button
                  className={"swiper-prev"}
                  ref={navigationPrevRef}
                  aria-label="previous image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi bi-arrow-left-short"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                    />
                  </svg>
                </button>
                <button
                  className={"swiper-next"}
                  ref={navigationNextRef}
                  aria-label="next image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi bi-arrow-right-short"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                    />
                  </svg>
                </button>
              </div>
            </Swiper>
          </div>
        </div>
        <AnimatePresence>
          {show && (
            <Modal
              project={projectData[modalIndex]}
              handleOpen={setShow}
              setModalIndex={setModalIndex}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);
  const projectData = await res.json();

  return {
    props: {
      projectData,
    },
  };
}

export default MesRealisations;
