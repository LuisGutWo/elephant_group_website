import React, { useEffect } from "react";
// Packages
import Head from "next/head";
// Layout
import Layout from "@/layouts/default";
// Components
import Loader from "@/components/Common/Loader";
import Navbar from "@/components/Common/MainNavbar";
import Header from "@/components/Main/Header";
import Marq from "@/components/Main/Marq";
import Intro from "@/components/Main/Intro";
import Clients from "@/components/Main/Clients";
import Services from "@/components/Main/Services";
import Portfolio from "@/components/Main/Portfolio";
import CallToAction from "@/components/Main/Contact";
import Footer from "@/components/Main/Footer";

function HomeLight() {
  useEffect(() => {
    const body = document?.body;
    if (body) {
      body.classList.add("sub-bg");
      return () => body.classList.remove("sub-bg");
    }
  }, []);

  try {
    return (
      <>
        <Head>
          <title>Elephant Group</title>
          <meta name="description" content="Elephant Group web site" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <Loader />
        <Navbar mainBg lightMode />
        <main className="main-bg position-re">
          <Header lightMode />
          <Marq />
          <Intro />
          <Services lightMode />
          <Portfolio />
          <Clients lightMode />
          <CallToAction />
        </main>
        <Footer lightMode />
      </>
    );
  } catch (error) {
    console.error("Rendering error in HomeLight:", error);
    return <div>Error: {error.message}</div>;
  }
}

HomeLight.getLayout = (page) => <Layout lightMode>{page}</Layout>;

export default HomeLight;
