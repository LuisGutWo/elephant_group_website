import React from "react";

function Header() {
  return (
    <header className="page-header section-padding p-100 bg-img bg-overlay">
      {/* Background image with opacity */}
      <div
        style={{
          backgroundImage: "url(/dark/assets/imgs/background/work-127.webp)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          opacity: 0.1, // Adjust opacity as needed
          zIndex: 0,
        }}
        aria-hidden="true"
      />
      <div
        className="container mt-80"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="row">
          <div className="col-lg-7">
            <div className="caption">
              <p className="sub-title">Contáctanos</p>
              <h1 className="fz-55">
                Contacta con Elephant Group <br /> Implementos Publicitarios en
                Valparaíso
              </h1>
            </div>
          </div>
          <div className="col-lg-5 valign">
            <div className="text">
              <p>
                <strong>Estamos listos para tu proyecto.</strong> Comunícate con
                nosotros por WhatsApp al <strong>+56 9 5163 1370</strong> o
                completa el formulario. Te respondemos en menos de 24 horas con
                una propuesta personalizada de
                <strong>
                  {" "}
                  señalética, material POP, gigantografías y merchandising
                </strong>
                para tu empresa en la V Región.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
