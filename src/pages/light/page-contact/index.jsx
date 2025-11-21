import React, { useEffect } from "react";

import Head from "next/head";

import Layout from "@/layouts/default";

import Loader from "@/components/Common/Loader";
import Navbar from "@/components/Common/MainNavbar";
import Header from "@/components/InnerPages/Contact/Header";
import Form from "@/components/InnerPages/Contact/Form";
import FooterBottom from "@/components/Main/FooterBottom";

function PageContactLight() {
  useEffect(() => {
    const body = document?.body;
    if (body !== null && body !== undefined) {
      body.classList.add("main-bg");
      return () => {
        if (body !== null && body !== undefined) {
          body.classList.remove("main-bg");
        }
      };
    }
  }, []);

  try {
    return (
      <>
        <Head>
          <title>
            Contacto | Elephant Group - Soluciones Creativas en Marketing
            Digital, Impresion y Publicidad
          </title>
          <meta
            name="description"
            content="Contacta a Elephant Group, expertos en marketing digital, branding, publicidad, diseño web y estrategias creativas para potenciar tu marca. ¡Impulsa tu negocio con soluciones innovadoras!"
          />
          <meta
            name="keywords"
            content="Elephant Group, contacto, marketing digital, publicidad, branding, diseño web, estrategias creativas, agencia creativa, soluciones innovadoras, impresion, plotter, letreros, gigantografías, potenciar marca"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <Loader />
        <Navbar mainBg lightMode />
        <main>
          <Header />
          <Form />
        </main>
        <FooterBottom lightMode />
      </>
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Rendering error in PageContactLight:", error);
      return <div>Error: {error.message}</div>;
    } else {
      throw error;
    }
  }
}

PageContactLight.getLayout = (page) => <Layout lightMode>{page}</Layout>;

export default PageContactLight;
