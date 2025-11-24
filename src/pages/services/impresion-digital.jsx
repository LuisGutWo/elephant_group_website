import React, { useEffect } from "react";
import Head from "next/head";
import Layout from "@/layouts/default";
import Loader from "@/components/Common/Loader";
import Navbar from "@/components/Common/MainNavbar";
import Header from "@/components/InnerPages/Header";
import ImpresionDigital from "@/components/InnerPages/Services/ImpresionDigital";
import Form from "@/components/InnerPages/Contact/Form";
import FooterBottom from "@/components/Main/FooterBottom";

function ImpresionDigitalPage() {
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
    title: "Impresión Digital de Alta Calidad",
    text: "IMPRESIÓN DIGITAL",
  };

  return (
    <>
      <Head>
        <title>Elephant Group - Impresión Digital | Valparaíso</title>
        <meta
          name="description"
          content="Servicio de impresión digital de alta calidad en Valparaíso. Tarjetas, flyers, catálogos y documentos corporativos con entrega rápida y precios competitivos."
        />
        <meta
          name="keywords"
          content="impresión digital, imprenta Valparaíso, tarjetas de presentación, flyers, catálogos, impresión rápida"
        />
        <meta name="author" content="Elephant Group" />
        <link
          rel="canonical"
          href="https://landingclientes.elephantgroup.cl/services/impresion-digital"
        />
      </Head>

      <Loader />
      <Navbar mainBg />
      <main>
        <Header data={headerMetadata} subBg={true} />
        <ImpresionDigital />
        <Form />
      </main>
      <FooterBottom />
    </>
  );
}

ImpresionDigitalPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ImpresionDigitalPage;
