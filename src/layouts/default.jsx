import React, { useEffect } from "react";
//= Packages
import Head from "next/head";
import WhatsAppButton from "@/common/WhatsAppButton";
//= Scripts
import correctStylesheetsOrder from "@/common/correctStylesheetsOrder";
//= Components
import Cursor from "@/components/Common/Cursor";
import ProgressScroll from "@/components/Common/ProgressScroll";

const DefaultLayout = ({ children, lightMode }) => {
  if (lightMode === null || lightMode === undefined) {
    throw new Error(
      "The lightMode prop of the DefaultLayout component must be a boolean and cannot be null or undefined."
    );
  }

  useEffect(() => {
    correctStylesheetsOrder({ lightMode });
  }, [lightMode]);

  return (
    <>
      <Head>
        {lightMode ? (
          <>
            <link rel="stylesheet" href="/light/assets/css/plugins.css" />
            <link rel="stylesheet" href="/light/assets/css/style.css" />
          </>
        ) : (
          <>
            <link rel="stylesheet" href="/dark/assets/css/plugins.css" />
            <link rel="stylesheet" href="/dark/assets/css/style.css" />
          </>
        )}
      </Head>
      <Cursor />
      <WhatsAppButton />
      <ProgressScroll />
      {children}
    </>
  );
};

export default DefaultLayout;
