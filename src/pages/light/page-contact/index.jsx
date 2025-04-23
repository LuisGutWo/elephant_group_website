import React, { useEffect } from "react";

import Head from "next/head";

import Layout from "@/layouts/default";

import Loader from "@/components/Common/Loader";
import Navbar from "@/components/Common/MainNavbar";
import Header from "@/components/InnerPages/Contact/Header";
import Form from "@/components/InnerPages/Contact/Form";
import Footer from "@/components/Main/Footer";

function PageContactLight() {
  useEffect(() => {
    const body = document?.body;
    if (body) {
      body.classList.add("main-bg");
      return () => {
        if (body) {
          body.classList.remove("main-bg");
        }
      };
    }
  }, []);

  return (
    <>
      <Head>
        <title>Elephant Group - Contáctenos</title>
      </Head>

      <Loader />
      <Navbar mainBg lightMode />
      <main>
        <Header />
        <Form />
      </main>
      <Footer lightMode />
    </>
  );
}

PageContactLight.getLayout = (page) => <Layout lightMode>{page}</Layout>;

export default PageContactLight;
