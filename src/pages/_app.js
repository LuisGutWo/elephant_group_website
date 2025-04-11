import React from "react";
//= Packages
import Script from "next/script";
import Head from "next/head";
//= Common Styles
import '@/styles/modal-video.css';
import "swiper/css/bundle";
import '@/styles/globals.css';


function App({ Component, pageProps }) {
  const getLayout = Component?.getLayout || ((page) => page);

  return getLayout(
    <>
      <Head>
        <title>ElephantGroup</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      {Component ? <Component {...pageProps} /> : <div>Error: Component not found</div>}

      {["/assets/js/plugins.js",
        "/assets/js/TweenMax.min.js",
        "/assets/js/charming.min.js",
        "/assets/js/countdown.js",
        "/assets/js/parallax.min.js",
        "/assets/js/ScrollTrigger.min.js",
        "/assets/js/gsap.min.js",
        "/assets/js/splitting.min.js",
        "/assets/js/isotope.pkgd.min.js",
        "/assets/js/imgReveal/imagesloaded.pkgd.min.js",
        "/assets/js/ScrollSmoother.min.js",
        "/showcase/assets/js/anime.min.js"
      ].map((src, index) => (
        <Script key={index} strategy="beforeInteractive" src={src} onError={(e) => console.error(`Error loading script ${src}:`, e)} />
      ))}

      {["/assets/js/imgReveal/demo.js",
        "/assets/js/scripts.js"
      ].map((src, index) => (
        <Script key={index + 12} strategy="lazyOnload" src={src} onError={(e) => console.error(`Error loading script ${src}:`, e)} />
      ))}
    </>
  );
}

export default App;