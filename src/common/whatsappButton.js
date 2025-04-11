import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappButton = () => {
  const handleClick = async () => {
    try {
      const userAgent = navigator.userAgent || "";
      const whatsappUrl = userAgent.includes("WhatsApp")
        ? "whatsapp://send?phone=56920390272"
        : "https://web.whatsapp.com/send?phone=56920390272";

      window.open(whatsappUrl, "_blank");
    } catch (error) {
      console.error("Error opening WhatsApp:", error);
    }
  };

  return (
    <div>
      <div
        className="bg-green-600 w-min p-2 rounded-full fixed bottom-10 right-4 cursor-pointer md:right-8"
        onClick={handleClick}
      >
        <FaWhatsapp color="green" className="w-7 h-7 md:w-10 md:h-10" />
      </div>
    </div>
  );
};

export default WhatsappButton;
