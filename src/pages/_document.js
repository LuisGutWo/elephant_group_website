import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="keywords"
          content="React, Elephant Group, Web Development, Next.js, SEO Optimization"
        />
        <meta name="description" content="React Elephant group page" />
        <meta name="author" content="LAG media" />
        {/* ------ Favicon ------ */}
        <link rel="shortcut icon" href="/assets/imgs/favicon.ico" />
        {/* ------ Google Fonts ------ */}
        {[
          "Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800",
          "Sora:wght@100;200;300;400;500;600;700;800",
          "Poppins:wght@100;200;300;400;500;600;700;800;900",
          "Space+Grotesk:wght@300;400;500;600;700",
          "Epilogue:wght@100;200;300;400;500;600;700;800;900",
          "Lexend+Deca:wght@100;200;300;400;500;600;700;800;900",
        ].map((font) => (
          <link
            key={font}
            href={`https://fonts.googleapis.com/css2?family=${font}&display=swap`}
            rel="stylesheet"
          />
        ))}
        {/* ------ Bootstrap Icons CDN ------ */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
          rel="stylesheet"
        />
        {/* ------ Plugins and Core Style Css are imported directly in the JavaScript file ------ */}
        {/* Global styles are now imported in _app.js */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
