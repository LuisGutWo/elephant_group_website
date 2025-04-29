import React, { useEffect } from "react";

import Head from "next/head";

import Layout from "@/layouts/default";

import Loader from "@/components/Common/Loader";
import Navbar from "@/components/Common/MainNavbar";
import Header from "@/components/InnerPages/Header";
import Services from "@/components/InnerPages/About/Services";
import ServicesTab from "@/components/Main/ServicesTab";
import CallToAction from "@/components/Main/Contact";
import Footer from "@/components/Main/Footer";

function PageServices() {
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
          <title>Elephant Group - Servicios</title>
          <meta name="description" content="Elephant Group - Servicios" />
          <meta
            name="keywords"
            content="Elephant Group, Servicios, Diseño, Artes Gráficas"
          />
          <meta name="author" content="Elephant Group" />
          <link
            rel="canonical"
            href="https://landingclientes.elephantgroup.cl"
          />
        </Head>

        <Loader />
        <Navbar mainBg />
        <main>
          <Header data={headerMetadata} subBg={true} />
          <Services />
          <ServicesTab />
          <CallToAction innerPageStyle />
        </main>
        <Footer />
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

PageServices.getLayout = (page) => <Layout>{page}</Layout>;

export default PageServices;
