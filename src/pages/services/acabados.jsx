import React, { useEffect } from "react";
import Head from "next/head";
import Layout from "@/layouts/default";
import Loader from "@/components/Common/Loader";
import Navbar from "@/components/Common/MainNavbar";
import Header from "@/components/InnerPages/Header";
import Acabados from "@/components/InnerPages/Services/Acabados";
import Form from "@/components/InnerPages/Contact/Form";
import FooterBottom from "@/components/Main/FooterBottom";

function AcabadosPage() {
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
    title: "Acabados y Terminaciones Premium",
    text: "ACABADOS",
  };

  return (
    <>
      <Head>
        <title>
          Elephant Group - Acabados y Terminaciones | Laminado, UV, Hot Stamping
        </title>
        <meta
          name="description"
          content="Acabados y terminaciones profesionales en Valparaíso. Laminado, barniz UV, hot stamping, troquelado, relieve y encuadernación para un acabado premium."
        />
        <meta
          name="keywords"
          content="acabados gráficos, laminado, barniz UV, hot stamping, troquelado, relieve, encuadernación, terminaciones Valparaíso"
        />
        <meta name="author" content="Elephant Group" />
        <link
          rel="canonical"
          href="https://landingclientes.elephantgroup.cl/services/acabados"
        />
      </Head>

      <Loader />
      <Navbar mainBg />
      <main>
        <Header data={headerMetadata} subBg={true} />
        <Acabados />
        <Form />
      </main>
      <FooterBottom />
    </>
  );
}

AcabadosPage.getLayout = (page) => <Layout>{page}</Layout>;

export default AcabadosPage;
