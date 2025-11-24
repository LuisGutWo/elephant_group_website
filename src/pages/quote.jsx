import React, { useEffect } from "react";
import Head from "next/head";
import Layout from "@/layouts/default";
import Loader from "@/components/Common/Loader";
import Navbar from "@/components/Common/MainNavbar";
import Header from "@/components/InnerPages/Header";
import Story from "@/components/InnerPages/About/Story";
import Form from "@/components/InnerPages/Contact/Form";
import FooterBottom from "@/components/Main/FooterBottom";

function QuotePage() {
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
    subTitle: "SOLICITA TU COTIZACIÓN",
    title:
      "Cuéntanos tu proyecto y recibe una propuesta personalizada de implementos publicitarios en menos de 24 horas.",
    text: "Cotización",
  };

  return (
    <>
      <Head>
        <title>
          Cotización | Elephant Group - Presupuesto de Implementos Publicitarios
        </title>
        <meta
          name="description"
          content="Solicita tu cotización personalizada de implementos publicitarios en Valparaíso. Material POP, señalética, gigantografías y merchandising. Respuesta en 24 horas. Presupuesto sin compromiso."
        />
        <meta
          name="keywords"
          content="cotización publicidad, presupuesto implementos publicitarios, cotizar material POP, precio señalética, presupuesto merchandising, cotización gigantografías Valparaíso, solicitar presupuesto publicidad V Región"
        />
        <meta name="author" content="Elephant Group" />
        <meta
          property="og:title"
          content="Cotización | Elephant Group - Presupuesto Implementos Publicitarios"
        />
        <meta
          property="og:description"
          content="Solicita tu cotización personalizada. Respuesta en 24 horas. Material POP, señalética y merchandising en Valparaíso."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cotización | Elephant Group" />
        <meta
          name="twitter:description"
          content="Solicita tu presupuesto personalizado de implementos publicitarios. Respuesta en 24 horas."
        />
      </Head>

      <Loader />
      <Navbar mainBg />
      <main>
        <Header data={headerMetadata} />
        <Story />
        <Form />
      </main>
      <FooterBottom />
    </>
  );
}

QuotePage.getLayout = (page) => <Layout>{page}</Layout>;

export default QuotePage;
