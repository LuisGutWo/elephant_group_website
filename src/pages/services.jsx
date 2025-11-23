import React, { useEffect } from "react";
import Head from "next/head";
import Layout from "@/layouts/default";
import Loader from "@/components/Common/Loader";
import Navbar from "@/components/Common/MainNavbar";
import Header from "@/components/InnerPages/Header";
import Services from "@/components/InnerPages/About/Services";
import ServicesTab from "@/components/Main/ServicesTab";
import Contact from "@/components/Main/Contact";
import Footer from "@/components/Main/Footer";

function ServicesPage() {
  useEffect(() => {
    const body = document?.body;
    if (body) {
      body.classList.add("main-bg");
    }
    return () => {
      const body = document?.body;
      if (body) {
        body.classList.remove("main-bg");
      }
    };
  }, []);

  const headerMetadata = {
    subTitle: "SERVICIOS",
    title: "Impulsamos tu marca con soluciones creativas y personalizadas.",
    text: "SERVICIOS",
  };

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
        <link rel="canonical" href="https://landingclientes.elephantgroup.cl" />
      </Head>

      <Loader />
      <Navbar mainBg />
      <main>
        <Header data={headerMetadata} subBg={true} />
        <Services />
        <ServicesTab />
        <Contact innerPageStyle />
      </main>
      <Footer />
    </>
  );
}

ServicesPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ServicesPage;
