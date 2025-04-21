import React, { useEffect } from 'react';
//= Packages
import Head from 'next/head';
//= Layout
import Layout from '@/layouts/default';
//= Components
import Loader from '@/components/Common/Loader';
import Navbar from '@/components/Common/MainNavbar';
import Footer from '@/components/Main/Footer';
import Header from '@/components/Portfolio/HeaderPortfolio';
import GridPortfolioImages from '@/components/Portfolio/GridPortfolioImages';


function PortfolioMetroLight() {
  useEffect(() => {
    if (document?.body) {
      document.body.classList.add('main-bg');
    }
    return () => {
      if (document?.body) {
        document.body.classList.remove('main-bg');
      }
    };
  }, []);

  const metadata = {
    subTitle: "Nuestros Trabajos",
    title: "Conócenos."
  }

  return (
    <>
      <Head>
        <title>Elephant Group - Trabajos</title>
      </Head>

      <Loader />
      <Navbar mainBg lightMode />
      <main className="main-bg">
        <Header data={metadata} />
        <GridPortfolioImages />
      </main>
      <Footer subBg lightMode />
    </>
  )
}

PortfolioMetroLight.getLayout = page => <Layout lightMode>{page}</Layout>

export default PortfolioMetroLight;