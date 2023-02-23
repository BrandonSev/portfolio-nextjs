import Head from "next/head";
import Image from "next/image";
import Hero from "../components/Hero";

export default function Home({ categories }) {
  return (
    <>
      <Head>
        <title>Brandon Seveste - Concepteur développeur d'application</title>
        <meta name="description" content="Concepteur développeur d'application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section id="hero">
        <Hero
          title={"Je suis <br /> <span> Brandon Seveste</span>"}
          text={
            "Passionné de développement, depuis maintenant 3 ans, je me suis formé sur différents types de langages de manière autodidacte. Diplômé d'un titre de développeur web et web mobile. Je suis actuellement en alternance Concepteur développeur d'application chez Polyvalence Immobilier depuis Septembre 2022"
          }
          linkText={"Voir mes réalisations"}
          linkUrl={"/mes-realisations"}
        />
      </section>
      <section className="skills" id="skills">
        <div className="container">
          <h2 className={"active"}>Mes compétences</h2>
          <div className="skills_wrapper">
            {categories &&
              categories.map((category) => {
                return (
                  <div
                    className={`skills_${category.title.toLowerCase()}`}
                    key={category.id}
                  >
                    <span className="skills_badge">{category.title}</span>
                    {category.underCategories.map((underCategory) => {
                      return (
                        <div
                          className={`skills_${category.title.toLowerCase()}__language`}
                          key={underCategory.id}
                        >
                          <p>{underCategory.title}</p>
                          {underCategory.technologies.length ? (
                            <ul>
                              {underCategory.technologies.map((technology) => {
                                return (
                                  <li key={technology.id}>
                                    <Image
                                      src={`${process.env.NEXT_PUBLIC_API_URL}/images/${technology.logo}`}
                                      alt={technology.name}
                                      width={20}
                                      height={20}
                                      quality={100}
                                    />
                                    {technology.name}
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            <ul>
                              <li>Liste à venir</li>
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories?underCategories=true&technologies=true`
  );
  const categories = await res.json();

  return {
    props: {
      categories,
    },
    revalidate: 10,
  };
}
