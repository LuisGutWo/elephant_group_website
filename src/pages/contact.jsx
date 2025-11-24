import React, { useEffect } from "react";
import Head from "next/head";
import Layout from "@/layouts/default";
import Loader from "@/components/Common/Loader";
import Navbar from "@/components/Common/MainNavbar";
import Header from "@/components/InnerPages/Contact/Header";
import Form from "@/components/InnerPages/Contact/Form";
import FooterBottom from "@/components/Main/FooterBottom";

function ContactPage() {
  useEffect(() => {
    const body = document?.body;
    if (body !== null && body !== undefined) {
      body.classList.add("main-bg");
    }
    return () => {
      const body = document?.body;
      if (body !== null && body !== undefined) {
        body.classList.remove("main-bg");
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>
          Contacto | Elephant Group - Implementos Publicitarios en Valparaíso |
          +56 9 5163 1370
        </title>
        <meta
          name="description"
          content="Contáctanos para implementos publicitarios en Valparaíso y V Región. Material POP, señalética, gigantografías y merchandising. WhatsApp +56 9 5163 1370. Atención personalizada y respuesta rápida."
        />
        <meta
          name="keywords"
          content="contacto Elephant Group, teléfono publicidad Valparaíso, WhatsApp implementos publicitarios, contactar agencia publicidad V Región, solicitar cotización material POP, teléfono señalética Viña del Mar, contacto merchandising Chile, dirección Elephant Group"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Elephant Group" />
        <meta
          property="og:title"
          content="Contacto | Elephant Group - Implementos Publicitarios Valparaíso"
        />
        <meta
          property="og:description"
          content="Contáctanos por WhatsApp +56 9 5163 1370 para implementos publicitarios en la V Región. Respuesta rápida y atención personalizada."
        />
        <meta property="og:type" content="website" />
        <meta name="geo.region" content="CL-VS" />
        <meta name="geo.placename" content="Valparaíso" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contacto | Elephant Group" />
        <meta
          name="twitter:description"
          content="WhatsApp +56 9 5163 1370 - Implementos publicitarios en Valparaíso"
        />
      </Head>

      <Loader />
      <Navbar mainBg />
      <main>
        <Header />
        <Form />
      </main>
      <FooterBottom />
    </>
  );
}

ContactPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ContactPage;
