/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import TopNavbar from "./TopNavbar";

function MainNavbar({ mainBg, subBg, noStatic, curve }) {
  useEffect(() => {
    if (typeof window !== "undefined" && window !== null) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  function handleScroll() {
    if (typeof window !== "undefined" && window !== null) {
      const bodyScroll = window.scrollY;
      const navbar = document.querySelector(".navbar");

      if (bodyScroll > 200 && navbar) {
        navbar.classList.add("nav-scroll");
      } else if (navbar) {
        navbar.classList.remove("nav-scroll");
      }
    }
  }

  function handleDropdownMouseMove(event) {
    if (event && event.currentTarget) {
      event.currentTarget.querySelector(".dropdown-menu").classList.add("show");
    }
  }

  function handleDropdownMouseLeave(event) {
    if (event && event.currentTarget) {
      event.currentTarget
        .querySelector(".dropdown-menu")
        .classList.remove("show");
    }
  }

  function handleDropdownSideMouseMove(event) {
    if (event && event.currentTarget) {
      const dropdownSide = event.currentTarget.querySelector(".dropdown-side");
      if (dropdownSide) {
        dropdownSide.classList.add("show");
      }
    }
  }

  function handleDropdownSideMouseLeave(event) {
    if (event && event.currentTarget) {
      const dropdownSide = event.currentTarget.querySelector(".dropdown-side");
      if (dropdownSide) {
        dropdownSide.classList.remove("show");
      }
    }
  }

  function toggleNavbar() {
    if (typeof document !== "undefined" && document !== null) {
      document
        .querySelector(".navbar .navbar-collapse")
        .classList.toggle("show");
    }
  }

  //   function toggleSearch() {
  //     if (typeof document !== "undefined" && document !== null) {
  //       let form = document.querySelector(".navbar .search-form");
  //       let closeBtn = document.querySelector(".search-form .close-search");

  //       if (form && closeBtn) {
  //         form.classList.toggle("open");
  //         if (form.classList.contains("open")) {
  //           closeBtn.style.display = "block";
  //         } else {
  //           closeBtn.style.display = "none";
  //         }
  //       }
  //     }
  //   }

  return (
    <>
      <TopNavbar />
      <nav
        className={`navbar navbar-expand-lg ${curve ? "nav-crev" : ""} ${
          noStatic ? "" : "static"
        } ${mainBg ? "main-bg" : ""} ${subBg ? "sub-bg" : ""}`}
      >
        <section className="container">
          <Link className="logo" href="/home">
            <img
              src="/light/assets/imgs/logo-dark.webp"
              alt="Elephant Group logo"
              loading="lazy"
              className="icon-img-140"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={toggleNavbar}
          >
            <span className="icon-bar">
              <i className="fas fa-bars"></i>
            </span>
          </button>
          <section
            className="collapse navbar-collapse justify-content-end pe-4 pt-30"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" href="/home">
                  <span className="rolling-text">INICIO</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/services">
                  <span className="rolling-text">SERVICIOS</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/portfolio">
                  <span className="rolling-text">PORTAFOLIO</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/quote">
                  <span className="rolling-text">COTIZACIÓN</span>
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/shop"
                >
                  <span className="rolling-text">TIENDA</span>
                </Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" href="/contact">
                  <span className="rolling-text">CONTACTO</span>
                </Link>
              </li>
            </ul>
          </section>
          {/* <div className="search-form">
            <div className="form-group">
              <input type="text" name="search" placeholder="Search" />
              <button>
                <span className="pe-7s-search"></span>
              </button>
            </div>
            <div className="search-icon" onClick={toggleSearch}>
              <span className="pe-7s-search open-search"></span>
              <span className="pe-7s-close close-search"></span>
            </div>
          </div> */}
        </section>
      </nav>
    </>
  );
}

export default MainNavbar;
