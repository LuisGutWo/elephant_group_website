import React, { useEffect } from "react";
import Head from "next/head";
import Layout from "@/layouts/default";
import Loader from "@/components/Common/Loader";
import Navbar from "@/components/Common/MainNavbar";
import Header from "@/components/Portfolio/HeaderPortfolio";
import GridPortfolioImages from "@/components/Portfolio/GridPortfolioImages";
import FooterBottom from "@/components/Main/FooterBottom";

function PortfolioPage() {
  useEffect(() => {
    if (document && document.body) {
      document.body.classList.add("main-bg");
    }
    return () => {
      if (document && document.body) {
        document.body.classList.remove("main-bg");
      }
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
      <Navbar mainBg />
      <main className="main-bg">
        <Header data={headerMetadata} />
        <GridPortfolioImages />
      </main>
      <FooterBottom subBg />
    </>
  );
}

PortfolioPage.getLayout = (page) => <Layout>{page}</Layout>;

export default PortfolioPage;
