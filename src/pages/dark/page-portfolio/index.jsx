import React, { useEffect } from "react";
//= Packages
import Head from "next/head";
//= Layout
import Layout from "@/layouts/default";
//= Components
import Loader from "@/components/Common/Loader";
import Navbar from "@/components/Common/MainNavbar";
import Footer from "@/components/Main/Footer";
import Header from "@/components/Portfolio/HeaderPortfolio";
import Metro from "@/components/Portfolio/MetroGridPortfolio";

function PortfolioMetro() {
  useEffect(() => {
    document.body.classList.add("main-bg");
    return () => document.body.classList.remove("main-bg");
  }, []);

  const metadata = {
    subTitle: "Nuestros Trabajos",
    title: "Conócenos.",
  };

  return (
    <>
      <Head>
        <title>Elephant Group - Trabajos</title>
      </Head>

      <Loader />
      <Navbar mainBg />
      <main className="main-bg">
        <Header data={metadata} />
        <Metro />
      </main>
      <Footer subBg />
    </>
  );
}

PortfolioMetro.getLayout = (page) => <Layout>{page}</Layout>;

export default PortfolioMetro;
