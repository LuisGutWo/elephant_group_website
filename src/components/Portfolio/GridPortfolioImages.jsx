import React, { useEffect } from "react";
import Link from "next/link";
//= Scripts
import initIsotope from "@/common/initIsotope";
//= Assets
const catalogoPDF = `${process.env.PUBLIC_URL || ""}/catalogo_impresion.pdf`;
//= Data
import data from "@/data/Main/portfolioGalleryPage.json";

function GridPortfolioImages() {
  useEffect(() => {
    initIsotope();
  }, []);

  return (
    <section className="portfolio section-padding pb-100">
      <div className="container-xxl">
        <div className="row">
          <div className="filtering col-12 mb-80 text-center">
            <div className="filter">
              <span className="text">Filtrar Por :</span>
              {data.filters.map((item, index) => (
                <span
                  data-filter={item?.filter}
                  className={index === 0 ? "active" : ""}
                  data-count={item?.count}
                  key={item?.id}
                >
                  {item?.title}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="gallery metro text-center">
          <div className="row">
            {data.gallery.map((item) => (
              <div
                className={`col-lg-${item?.width} col-md-6 items ${item?.filter} info-overlay height-${item?.height} mb-30`}
                key={item?.id}
              >
                <div className="item-img o-hidden">
                  <Link href={catalogoPDF} className="imago wow">
                    <div className="inner wow">
                      <img src={item?.image} alt="image" />
                    </div>
                  </Link>
                  <div className="info">
                    <span className="sub-title tag">
                      <Link href={catalogoPDF} className="imago wow">
                        {item?.year} <br /> {item?.type}
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default GridPortfolioImages;
