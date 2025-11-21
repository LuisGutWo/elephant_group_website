import React, { useEffect } from "react";
// Packages
import Head from "next/head";
// Layout
import Layout from "@/layouts/default";
// Components
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

function HomePageLight() {
  useEffect(() => {
    if (document !== null && document.body !== null) {
      document.body.classList.add("sub-bg");

      return () => {
        if (document !== null && document.body !== null) {
          document.body.classList.remove("sub-bg");
        }
      };
    }
  }, []);

  try {
    if (process.env.NODE_ENV !== "production") {
      console.log("HomePageLight component rendering...");
    }

    return (
      <>
        <Head>
          <title>Elephant Group</title>
          <meta name="description" content="Elephant Group web site" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <Loader />
        <Navbar mainBg lightMode={true} />
        <main className="main-bg position-re">
          <Header lightMode={true} />
          <Portfolio />
          <Products />
          <Clients lightMode={true} />
          <Form />
          <AboutUs />
        </main>
        <FooterImg lightMode={true} />
        <Footer lightMode={true} />
        <FooterBottom />
      </>
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Rendering error in HomePageLight:", error);
      return <div>Error: {error.message}</div>;
    } else {
      throw new Error(
        `Uncaught error in HomePageLight component: ${error.toString()}`
      );
    }
  }
}

HomePageLight.getLayout = (page) => <Layout lightMode>{page}</Layout>;

export default HomePageLight;
