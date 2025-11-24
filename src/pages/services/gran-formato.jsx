import React, { useEffect } from "react";
import Head from "next/head";
import Layout from "@/layouts/default";
import Loader from "@/components/Common/Loader";
import Navbar from "@/components/Common/MainNavbar";
import Header from "@/components/InnerPages/Header";
import GranFormato from "@/components/InnerPages/Services/GranFormato";
import Form from "@/components/InnerPages/Contact/Form";
import FooterBottom from "@/components/Main/FooterBottom";

function GranFormatoPage() {
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
    title: "Impresión de Gran Formato",
    text: "GRAN FORMATO",
  };

  return (
    <>
      <Head>
        <title>
          Elephant Group - Gran Formato | Gigantografías y Banners Valparaíso
        </title>
        <meta
          name="description"
          content="Impresión de gran formato en Valparaíso. Gigantografías, banners, vinilos, roll ups y señalética. Alto impacto visual para publicidad exterior y eventos."
        />
        <meta
          name="keywords"
          content="gran formato, gigantografías Valparaíso, banners, vinilos adhesivos, roll up, pendones, señalética, publicidad exterior"
        />
        <meta name="author" content="Elephant Group" />
        <link
          rel="canonical"
          href="https://landingclientes.elephantgroup.cl/services/gran-formato"
        />
      </Head>

      <Loader />
      <Navbar mainBg />
      <main>
        <Header data={headerMetadata} subBg={true} />
        <GranFormato />
        <Form />
      </main>
      <FooterBottom />
    </>
  );
}

GranFormatoPage.getLayout = (page) => <Layout>{page}</Layout>;

export default GranFormatoPage;
