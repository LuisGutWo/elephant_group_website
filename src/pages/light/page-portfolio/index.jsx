import React, { useEffect } from "react";
//= Packages
import Head from "next/head";
//= Layout
import Layout from "@/layouts/default";
//= Components
import Loader from "@/components/Common/Loader";
import Navbar from "@/components/Common/MainNavbar";
import Header from "@/components/Portfolio/HeaderPortfolio";
import GridPortfolioImages from "@/components/Portfolio/GridPortfolioImages";
import FooterBottom from "@/components/Main/FooterBottom";

function PagePortfolioLight() {
  useEffect(() => {
    if (document) document.body.classList.add("main-bg");
    return () => {
      if (document) document.body.classList.remove("main-bg");
    };
  }, []);

  const headerMetadata = {
    subTitle: "Portafolio",
    title: "Nuestros trabajos.",
    text: "Portafolio",
    description:
      "Descubre los proyectos destacados de Elephant Group, donde la innovación y la creatividad se unen para ofrecer soluciones excepcionales.",
  };

  return (
    <>
      <Head>
        <title>Elephant Group - Portafolio de Trabajos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Portafolio de trabajos realizados por Elephant Group."
        />
        <meta
          name="keywords"
          content="portafolio, trabajos, proyectos, Elephant Group"
        />
        <meta name="author" content="Elephant Group" />
      </Head>

      <Loader />
      <Navbar mainBg lightMode />
      <main className="main-bg">
        <Header data={headerMetadata} />
        <GridPortfolioImages />
      </main>
      <FooterBottom subBg lightMode />
    </>
  );
}

PagePortfolioLight.getLayout = (page) => <Layout lightMode>{page}</Layout>;

export default PagePortfolioLight;
