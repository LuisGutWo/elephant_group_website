import React, { useEffect } from "react";
//= Packages
import Head from "next/head";
//= Layout
import Layout from "@/layouts/default";
//= Components
import Loader from "@/components/Common/Loader";
import Navbar from "@/components/Common/MainNavbar";
import Header from "@/components/InnerPages/Header";
import Story from "@/components/InnerPages/About/Story";
import Services from "@/components/InnerPages/About/Services";
import Intro from "@/components/InnerPages/About/Intro";
import CallToAction from "@/components/Main/Contact";
import Footer from "@/components/Main/Footer";

function PageAboutLight() {
  useEffect(() => {
    const body = document?.body;
    if (body) {
      body.classList.add("main-bg");
      return () => body.classList.remove("main-bg");
    }
  }, []);

  const headerMetadata = {
    subTitle: "QUIENES SOMOS ?",
    title:
      "Somos Elephant Group, una empresa de la V Region con 6 años de experiencia, que CREA y PRODUCE implementos publicitarios.",
    text: "Nosotros",
  };

  try {
    return (
      <>
        <Head>
          <title>Elephant Group - Nosotros</title>
          <meta name="description" content="Elephant Group - Nosotros" />
          <meta
            name="keywords"
            content="Elephant Group, nosotros, publicidad, marketing"
          />
          <meta name="author" content="Elephant Group" />
        </Head>

        <Loader />
        <Navbar mainBg lightMode />
        <main>
          <Header data={headerMetadata} />
          <Story />
          <Services lightMode />
          <Intro />
          <CallToAction innerPageStyle />
        </main>
        <Footer lightMode />
      </>
    );
  } catch (error) {
    console.error("Rendering error in PageAboutLight:", error);
    return <div>Error: {error.message}</div>;
  }
}

PageAboutLight.getLayout = (page) => <Layout lightMode>{page}</Layout>;

export default PageAboutLight;
