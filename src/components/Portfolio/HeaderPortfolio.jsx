import React from "react";

function HeaderPortfolio({ data }) {
  if (!data) {
    throw new Error("Data is null or undefined in HeaderPortfolio component");
  }

  if (!data.subTitle || !data.title) {
    throw new Error(
      "Data is missing required properties in HeaderPortfolio component"
    );
  }

  return (
    <header
      className="work-header section-padding pb-0"
      role="banner"
      aria-label="Encabezado del portafolio"
      style={{ position: "relative", marginBottom: "0" }}
    >
      {/* Background image with opacity */}
      <section
        style={{
          backgroundImage: "url(/light/assets/imgs/works/work_publicity.webp)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundPosition: "right",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          opacity: 0.2, // Adjust opacity as needed
          zIndex: 0,
        }}
        aria-hidden="true"
      />
      <section
        className="container mt-80"
        itemScope
        itemType="https://schema.org/WebPageElement"
      >
        <div className="row">
          <div className="col-12">
            <div className="caption">
              <p className="portfolio-eyebrow-header">{data.subTitle}</p>
              <h1 className="portfolio-main-title" itemProp="headline">
                {data.title}
              </h1>
              {data.description && (
                <p className="portfolio-description" itemProp="description">
                  {data.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}

export default HeaderPortfolio;
