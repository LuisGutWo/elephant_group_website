import React, { useEffect } from "react";
//= Packages
import Head from "next/head";
//= Layout
import Layout from "@/layouts/default";
//= Components
import Loader from "@/components/Common/Loader";
import Navbar from "@/components/Common/MainNavbar";
import Footer from "@/components/Main/Footer";
import Header from "@/components/Portfolio/HeaderPortfolio";
import GridPortfolioImages from "@/components/Portfolio/GridPortfolioImages";

function PagePortfolioLight() {
  useEffect(() => document.body.classList.add("main-bg"), []);
  useEffect(() => () => document.body.classList.remove("main-bg"), []);

  const metadata = {
    subTitle: "Portafolio",
    title: "Nuestros trabajos.",
  };

  return (
    <>
      <Head>
        <title>Elephant Group - Portafolio de Trabajos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Portafolio de trabajos realizados por Elephant Group." />
        <meta name="keywords" content="Elephant Group, portafolio, trabajos, proyectos" />
      </Head>

      <Loader />
      <Navbar mainBg lightMode />
      <main className="main-bg">
        <Header data={metadata} />
        <GridPortfolioImages />
      </main>
      <Footer subBg lightMode />
    </>
  );
}

PagePortfolioLight.getLayout = (page) => <Layout lightMode>{page}</Layout>;

export default PagePortfolioLight;
