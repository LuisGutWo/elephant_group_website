import React, { useEffect } from "react";
import Head from "next/head";
import Layout from "@/layouts/default";
import Loader from "@/components/Common/Loader";
import Navbar from "@/components/Common/MainNavbar";
import Header from "@/components/Main/Header";
import Products from "@/components/Main/Products";
import Clients from "@/components/Main/Clients";
import Services from "@/components/Main/Services";
import AboutUs from "@/components/Main/AboutUs";
import Portfolio from "@/components/Main/Portfolio";
import FooterImg from "@/components/Main/FooterImg";
import Footer from "@/components/Main/Footer";
import Form from "@/components/InnerPages/Contact/Form";
import FooterBottom from "@/components/Main/FooterBottom";

function HomePage() {
  useEffect(() => {
    if (document !== null && document.body !== null) {
      document.body.classList.add("sub-bg");
    }

    return () => {
      if (document !== null && document.body !== null) {
        document.body.classList.remove("sub-bg");
      }
    };
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
        <Portfolio />
        <Products />
        <Clients />
        <Form />
        <AboutUs />
      </main>
      <FooterImg />
      <Footer />
      <FooterBottom />
    </>
  );
}

HomePage.getLayout = (page) => <Layout>{page}</Layout>;

export default HomePage;
