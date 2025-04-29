import { Html, Head, Main, NextScript } from "next/document";

// This is a custom Document component for Next.js, used to augment the application's HTML and <head> tags.
export default function Document() {
  return (
    <Html lang={process.env.NEXT_PUBLIC_SITE_LANGUAGE || "es"}>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="keywords"
          content="React, Elephant Group, Web Development, Next.js, SEO Optimization"
        />
        <meta name="description" content="Explore React-based web development with Elephant Group, powered by Next.js and optimized for SEO by LAG media." />
        <meta name="author" content="Elephant Group" />
        {/* ------ Favicon ------ */}
        <link rel="shortcut icon" href="/light/assets/imgs/favicon.ico"/>
        <link rel="apple-touch-icon" href="/light/assets/imgs/favicon.ico" />
        <link rel="icon" href="/light/assets/imgs/favicon.ico" type="image/x-icon" />
        {/* ------ Google Fonts ------ */}
        {/* Consolidated Google Fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&family=Sora:wght@100;200;300;400;500;600;700;800&family=Poppins:wght@100;200;300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=Epilogue:wght@100;200;300;400;500;600;700;800;900&family=Lexend+Deca:wght@100;200;300;400;500;600;700;800;900&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&family=Sora:wght@100;200;300;400;500;600;700;800&family=Poppins:wght@100;200;300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=Epilogue:wght@100;200;300;400;500;600;700;800;900&family=Lexend+Deca:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* ------ Bootstrap Icons CDN ------ */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
          rel="stylesheet"
        />
        {/* ------ Plugins and Core Style Css are imported directly in the JavaScript file ------ */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
