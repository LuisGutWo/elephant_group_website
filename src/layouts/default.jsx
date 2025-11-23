import React, { useEffect } from "react";
import WhatsAppButton from "@/common/WhatsAppButton";
import Cursor from "@/components/Common/Cursor";
import ProgressScroll from "@/components/Common/ProgressScroll";

const DefaultLayout = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Cursor />
      {!isLoading && <WhatsAppButton />}
      <ProgressScroll />
      {children}
    </>
  );
};

export default DefaultLayout;
