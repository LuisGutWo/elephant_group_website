import React, { useEffect } from "react";
import Head from "next/head";
import Layout from "@/layouts/default";
import Loader from "@/components/Common/Loader";
import Navbar from "@/components/Common/MainNavbar";
import Header from "@/components/Portfolio/HeaderPortfolio";
import GridPortfolioImages from "@/components/Portfolio/GridPortfolioImages";
import FooterBottom from "@/components/Main/FooterBottom";

function PortfolioPage() {
  useEffect(() => {
    if (document && document.body) {
      document.body.classList.add("main-bg");
    }
    return () => {
      if (document && document.body) {
        document.body.classList.remove("main-bg");
      }
    };
  }, []);

  const headerMetadata = {
    subTitle: "Portafolio de Trabajos",
    title: "Más de 500 Proyectos Exitosos en Valparaíso y Viña del Mar",
    text: "Galería de Trabajos",
    description:
      "Desde 2018, hemos realizado más de 500 proyectos publicitarios en Valparaíso y Viña del Mar. Especialistas en letreros CNC, señalética industrial, impresión digital de gran formato, diseño gráfico y fabricación de implementos publicitarios para empresas de la Región de Valparaíso.",
  };

  return (
    <>
      <Head>
        <title>
          Portafolio | Elephant Group - Trabajos de Publicidad en Valparaíso y
          Viña del Mar
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Galería de trabajos realizados por Elephant Group en Valparaíso y Viña del Mar. Letreros CNC, señalética industrial, impresión digital, diseño gráfico y más de 500 proyectos publicitarios exitosos desde 2018."
        />
        <meta
          name="keywords"
          content="portafolio publicitario Valparaíso, trabajos publicidad Viña del Mar, letreros CNC, señalética industrial, impresión digital, diseño gráfico, cortes CNC Valparaíso, implementos publicitarios, proyectos branding, galería trabajos Elephant Group"
        />
        <meta name="author" content="Elephant Group" />
        <meta name="robots" content="index, follow" />

        {/* Geo Tags */}
        <meta name="geo.region" content="CL-VS" />
        <meta name="geo.placename" content="Valparaíso, Viña del Mar" />
        <meta name="geo.position" content="-33.0472;-71.6127" />
        <meta name="ICBM" content="-33.0472, -71.6127" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Portafolio de Trabajos Publicitarios - Elephant Group Valparaíso"
        />
        <meta
          property="og:description"
          content="Descubre más de 500 proyectos publicitarios realizados en Valparaíso y Viña del Mar. Letreros CNC, señalética, impresión digital y diseño gráfico."
        />
        <meta
          property="og:image"
          content="/light/assets/imgs/works/work_publicity.webp"
        />
        <meta property="og:url" content="https://elephantgroup.cl/portfolio" />
        <meta property="og:site_name" content="Elephant Group" />
        <meta property="og:locale" content="es_CL" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Portafolio Publicitario - Elephant Group"
        />
        <meta
          name="twitter:description"
          content="Galería de trabajos: Letreros CNC, señalética, impresión digital en Valparaíso y Viña del Mar"
        />
        <meta
          name="twitter:image"
          content="/light/assets/imgs/works/work_publicity.webp"
        />

        {/* Canonical */}
        <link rel="canonical" href="https://elephantgroup.cl/portfolio" />
      </Head>

      <Loader />
      <Navbar mainBg />
      <main className="main-bg">
        <Header data={headerMetadata} />
        <GridPortfolioImages />
      </main>
      <FooterBottom subBg />

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Elephant Group",
            description:
              "Fabricación de implementos publicitarios en Valparaíso y Viña del Mar",
            url: "https://elephantgroup.cl",
            logo: "https://elephantgroup.cl/light/assets/imgs/logo-dark.webp",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Valparaíso",
              addressRegion: "Región de Valparaíso",
              addressCountry: "CL",
            },
            areaServed: [
              {
                "@type": "City",
                name: "Valparaíso",
              },
              {
                "@type": "City",
                name: "Viña del Mar",
              },
              {
                "@type": "State",
                name: "Región de Valparaíso",
              },
            ],
            telephone: "+56951631370",
            email: "contacto@elephantgroup.cl",
            foundingDate: "2018",
            slogan: "Implementos publicitarios que destacan tu marca",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Inicio",
                item: "https://elephantgroup.cl/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Portafolio",
                item: "https://elephantgroup.cl/portfolio",
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: "Portafolio de Trabajos Publicitarios - Elephant Group",
            description:
              "Galería de más de 500 proyectos de letreros CNC, señalética, impresión digital y diseño gráfico realizados en Valparaíso y Viña del Mar",
            url: "https://elephantgroup.cl/portfolio",
            provider: {
              "@type": "Organization",
              name: "Elephant Group",
              areaServed: [
                "Valparaíso",
                "Viña del Mar",
                "Región de Valparaíso",
              ],
            },
            numberOfItems: "500+",
            keywords:
              "letreros CNC, señalética industrial, impresión digital, diseño gráfico, Valparaíso, Viña del Mar",
          }),
        }}
      />
    </>
  );
}

PortfolioPage.getLayout = (page) => <Layout>{page}</Layout>;

export default PortfolioPage;
