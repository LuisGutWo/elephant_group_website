import React, { useEffect } from "react";
//= Packages
import Head from "next/head";
import WhatsAppButton from "@/common/WhatsAppButton";
//= Scripts
import correctStylesheetsOrder from "@/common/correctStylesheetsOrder";
//= Components
import Cursor from "@/components/Common/Cursor";
import ProgressScroll from "@/components/Common/ProgressScroll";

const DefaultLayout = ({ children, lightMode = false }) => {
  if (typeof lightMode !== "boolean") {
    throw new Error(
      "The lightMode prop of the DefaultLayout component must be a boolean."
    );
  }

  useEffect(() => {
    if (typeof correctStylesheetsOrder !== "function") {
      console.error("correctStylesheetsOrder is not a function");
      return;
    }

    correctStylesheetsOrder({ lightMode });
  }, [lightMode]);

  useEffect(() => {
    const head = document.head;
    if (!head) {
      console.error("document.head is null or undefined");
      return;
    }

    const existingLightStyles = document.querySelectorAll(
      'link[href^="/light/assets/css"]'
    );
    const existingDarkStyles = document.querySelectorAll(
      'link[href^="/dark/assets/css"]'
    );

    // Remove existing stylesheets
    [...existingLightStyles, ...existingDarkStyles].forEach((link) => {
      if (link && link.parentNode) link.parentNode.removeChild(link);
    });

    // Add new stylesheets based on lightMode
    const stylesheets = lightMode
      ? [
          "/light/assets/css/plugins.css",
          "/light/assets/css/style.css",
        ]
      : [
          "/dark/assets/css/plugins.css",
          "/dark/assets/css/style.css",
        ];

    stylesheets.forEach((href) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      head.appendChild(link);
    });

    return () => {
      // Cleanup stylesheets on component unmount
      stylesheets.forEach((href) => {
        const link = document.querySelector(`link[href="${href}"]`);
        if (link && link.parentNode) link.parentNode.removeChild(link);
      });
    };
  }, [lightMode]);

  return (
    <>
      {typeof Cursor === "function" ? <Cursor /> : console.error("Cursor component is not available")}
      {typeof WhatsAppButton === "function" ? <WhatsAppButton /> : console.error("WhatsAppButton component is not available")}
      {typeof ProgressScroll === "function" ? <ProgressScroll /> : console.error("ProgressScroll component is not available")}
      {children}
    </>
  );
};

export default DefaultLayout;
