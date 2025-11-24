import React, { useEffect } from "react";
import Head from "next/head";
import Layout from "@/layouts/default";
import Loader from "@/components/Common/Loader";
import Navbar from "@/components/Common/MainNavbar";
import Header from "@/components/InnerPages/Header";
import ImpresionOffset from "@/components/InnerPages/Services/ImpresionOffset";
import Form from "@/components/InnerPages/Contact/Form";
import FooterBottom from "@/components/Main/FooterBottom";

function ImpresionOffsetPage() {
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
    title: "Impresión Offset de Alto Volumen",
    text: "IMPRESIÓN OFFSET",
  };

  return (
    <>
      <Head>
        <title>
          Elephant Group - Impresión Offset | Grandes Tirajes Valparaíso
        </title>
        <meta
          name="description"
          content="Impresión offset de alta calidad en Valparaíso. Ideal para grandes volúmenes: libros, revistas, packaging y material publicitario con la mejor relación calidad-precio."
        />
        <meta
          name="keywords"
          content="impresión offset, imprenta offset Valparaíso, grandes tirajes, libros, revistas, packaging, impresión masiva"
        />
        <meta name="author" content="Elephant Group" />
        <link
          rel="canonical"
          href="https://landingclientes.elephantgroup.cl/services/impresion-offset"
        />
      </Head>

      <Loader />
      <Navbar mainBg />
      <main>
        <Header data={headerMetadata} subBg={true} />
        <ImpresionOffset />
        <Form />
      </main>
      <FooterBottom />
    </>
  );
}

ImpresionOffsetPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ImpresionOffsetPage;
