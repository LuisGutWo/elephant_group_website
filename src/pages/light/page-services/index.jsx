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

function PageServicesLight() {
  useEffect(() => {
    if (typeof document !== "undefined" && document.body) {
      document.body.classList.add("main-bg");
    }
    return () => {
      if (typeof document !== "undefined" && document.body) {
        document.body.classList.remove("main-bg");
      }
    };
  }, []);

  const headerMetadata = {
    subTitle: "QUE PODEMOS HACER ?",
    title: "Combinamos nuestra pasión por el diseño y las artes gráficas.",
    text: "SERVICIOS",
  };

  try {
    return (
      <>
        <Head>
          <title>Elephant Group - Servicios</title>
        </Head>

        <Loader />
        <Navbar mainBg lightMode />
        <main>
          <Header data={headerMetadata} subBg={true} />
          <Services lightMode />
          <ServicesTab lightMode />
          <CallToAction innerPageStyle />
        </main>
        <Footer lightMode />
      </>
    );
  } catch (error) {
    console.error("Error rendering PageServicesLight:", error);
    return <div>Error: {error.message}</div>;
  }
}

PageServicesLight.getLayout = (page) => <Layout lightMode>{page}</Layout>;

export default PageServicesLight;
