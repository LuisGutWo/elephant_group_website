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

function PagePortfolio() {
  useEffect(() => {
    if (document?.body) {
      document.body.classList.add("main-bg");
    }

    return () => {
      if (document?.body) {
        document.body.classList.remove("main-bg");
      }
    };
  }, []);

  const metadata = {
    subTitle: "Portafolio",
    title: "Nuestros trabajos."
  };

  return (
    <>
      <Head>
      <title>Elephant Group - Portafolio de Trabajos</title>
      </Head>

      <Loader />
      <Navbar mainBg />
      <main className="main-bg">
        {document && <Header data={metadata} />}
        {document && <GridPortfolioImages />}
      </main>
      <Footer subBg />
    </>
  );
}

PagePortfolio.getLayout = (page) => <Layout>{page}</Layout>;

export default PagePortfolio;
