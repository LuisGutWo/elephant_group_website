import React from "react";
import Link from "next/link";
//= Data
import data from "@/data/Main/services.json";

function Services({ lightMode }) {
  return (
    <section className="services main-bg ontop bord-thin-top bord-thin-bottom">
      <div className="container-fluid text-center">
        <div className="row justify-content-center mb-50">
          {data.map((item) => (
            <div
              className="item-bord col-lg-4 col-md-8"
              key={item.id}
            >
              <Link
                href={`/${
                  lightMode ? "light/page-services" : "dark/page-services"
                }`}
                className="d-flex flex-wrap flex-column justify-content-center align-items-center arrow mt-40"
              >
                <div className="icon-img-100 mb-40">
                  <img
                    src={`/${lightMode ? "light" : "dark"}${item.image}`}
                    alt=""
                  />
                </div>
                <h4
                  className="mb-15"
                  key={item.id}
                  style={{ color: "#fca311" }}
                >
                  {item.title}
                </h4>
                <h6
                  className="mb-15"
                  style={{ color: lightMode ? "#000" : "#fff" }}
                >
                  {item.subtitle}
                </h6>
                <p>{item.text}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
