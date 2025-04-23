import React, { useEffect } from 'react';

import Head from 'next/head';

import Layout from '@/layouts/default';

import Loader from '@/components/Common/Loader';
import Navbar from '@/components/Common/MainNavbar';
import Header from '@/components/InnerPages/Contact/Header';
import Form from '@/components/InnerPages/Contact/Form';
import Footer from '@/components/Main/Footer';


function PageContact() {
  useEffect(() => {
    if (typeof document !== 'undefined' && document.body) {
      document.body.classList.add('main-bg');
      return () => document.body.classList.remove('main-bg');
    }
  }, []);

  try {
    return (
      <>
        <Head>
          <title>Elephant Group - Contacto</title>
        </Head>

        <Loader />
        <Navbar mainBg />
        <main>
          <Header />
          <Form />
        </main>
        <Footer />
      </>
    );
  } catch (error) {
    console.error("Rendering error in PageContact:", error);
    return <div>Error: {error.message}</div>;
  }
}

PageContact.getLayout = page => <Layout>{page}</Layout>

export default PageContact;