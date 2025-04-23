import React, { useEffect } from "react";

import Head from "next/head";

import Layout from "@/layouts/default";

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

function HomeDark() {
  useEffect(() => {
    const body = document?.body;
    if (body) {
      body.classList.add("sub-bg");
      return () => {
        if (body) {
          body.classList.remove("sub-bg");
        }
      };
    }
  }, []);

  return (
    <>
      <Head>
        <title>Elephant Group</title>
        <meta name="description" content="Elephant Group web site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Loader />
      <Navbar mainBg />
      <main className="main-bg position-re">
        <Header />
        <Marq />
        <Intro />
        <Services />
        <Portfolio />
        <Clients />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}

HomeDark.getLayout = (page) => <Layout>{page}</Layout>;

export default HomeDark;
