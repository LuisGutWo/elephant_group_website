import React, { useEffect } from "react";
import Head from "next/head";
import Layout from "@/layouts/default";
import Loader from "@/components/Common/Loader";
import Navbar from "@/components/Common/MainNavbar";
import Header from "@/components/InnerPages/Header";
import DisenoGrafico from "@/components/InnerPages/Services/DisenoGrafico";
import Form from "@/components/InnerPages/Contact/Form";
import FooterBottom from "@/components/Main/FooterBottom";

function DisenoGraficoPage() {
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
    title: "Diseño Gráfico Profesional",
    text: "DISEÑO GRÁFICO",
  };

  return (
    <>
      <Head>
        <title>
          Elephant Group - Diseño Gráfico | Logos, Branding y Material
          Publicitario
        </title>
        <meta
          name="description"
          content="Servicio de diseño gráfico profesional en Valparaíso. Creamos identidad corporativa, logos, packaging, material publicitario y diseño editorial de alta calidad."
        />
        <meta
          name="keywords"
          content="diseño gráfico Valparaíso, diseño de logos, branding, identidad corporativa, packaging, diseño editorial, diseño publicitario"
        />
        <meta name="author" content="Elephant Group" />
        <link
          rel="canonical"
          href="https://landingclientes.elephantgroup.cl/services/diseno"
        />
      </Head>

      <Loader />
      <Navbar mainBg />
      <main>
        <Header data={headerMetadata} subBg={true} />
        <DisenoGrafico />
        <Form />
      </main>
      <FooterBottom />
    </>
  );
}

DisenoGraficoPage.getLayout = (page) => <Layout>{page}</Layout>;

export default DisenoGraficoPage;
