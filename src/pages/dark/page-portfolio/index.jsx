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
    if (typeof document !== "undefined" && document.body !== null) {
      document.body.classList.add("main-bg");
    }
    return () => {
      if (typeof document !== "undefined" && document.body !== null) {
        document.body.classList.remove("main-bg");
      }
    };
  }, []);

  const headerMetadata = {
    subTitle: "SERVICIOS",
    title:
      "Nuestra misión es ser un asesor publicitario para nuestros clientes.",
    text: "SERVICIOS",
  };

  try {
    return (
      <>
        <Head>
          <title>Elephant Group - Portafolio de Trabajos</title>
        </Head>

        <Loader />
        <Navbar mainBg />
        <main className="main-bg">
          <Header data={headerMetadata} />
          <GridPortfolioImages />
        </main>
        <Footer subBg />
      </>
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error rendering PageServicesLight:", error.message);
      return <div>Error: {error.message}</div>;
    } else {
      console.error(
        "Unknown error occurred while rendering PageServicesLight:"
      );
      return <div>Error: Unknown error occurred.</div>;
    }
  }
}

PagePortfolio.getLayout = (page) => <Layout>{page}</Layout>;

export default PagePortfolio;
