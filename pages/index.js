import Head from "next/head";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>Brandon Seveste - Développeur web et web mobile</title>
        <meta name="description" content="Développeur web et web mobile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section id="hero">
        <Hero
          text={
            "Passionné de développement, je me suis formé sur différents types de languages de manière autodidacte, j'ai décidé de rejoindre une formation à la Wild Code School en septembre 2021 en tant que développeur web et mobile afin de faire de ma passion, mon métier."
          }
          linkText={"Voir mes réalisations"}
          linkUrl={"/mes-realisations"}
        />
      </section>
    </>
  );
}
