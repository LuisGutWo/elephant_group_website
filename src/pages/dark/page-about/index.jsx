import React, { useEffect } from 'react';

import Head from 'next/head';

import Layout from '@/layouts/default';

import Loader from '@/components/Common/Loader';
import Navbar from '@/components/Common/MainNavbar';
import Header from '@/components/InnerPages/Header';
import Story from '@/components/InnerPages/About/Story';
import Services from '@/components/InnerPages/About/Services';
import Intro from '@/components/InnerPages/About/Intro';
import CallToAction from '@/components/Main/Contact';
import Footer from '@/components/Main/Footer';

function PageAbout() {
  useEffect(() => {
    document.body.classList.add('main-bg');
    return () => document.body.classList.remove('main-bg');
  }, []);

  const headerMetadata = {
    subTitle: "QUIENES SOMOS ?",
    title: "Somos Elephant Group, una agencia de publicidad y marketing establecida en Viña del Mar, Chile.",
    text: "Acerca de nosotros"
  }

  return (
    <>
      <Head>
        <title>Elephant Group - Nosotros</title>
      </Head>

      <Loader />
      <Navbar mainBg />
      <main>
        <Header data={headerMetadata} />
        <Story />
        <Services />
        <Intro />
        <CallToAction innerPageStyle />
      </main>
      <Footer />
    </>
  )
}

PageAbout.getLayout = page => <Layout>{page}</Layout>

export default PageAbout;