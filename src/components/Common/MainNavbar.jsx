import React, { useEffect } from "react";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import Link from "next/link";
import TopNavbar from "./TopNavbar";

function MainNavbar({ lightMode, mainBg, subBg, noStatic, curve }) {
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleScroll() {
    const bodyScroll = window.scrollY;
    const navbar = document.querySelector(".navbar");

    if (bodyScroll > 300) navbar.classList.add("nav-scroll");
    else navbar.classList.remove("nav-scroll");
  }

  function handleDropdownMouseMove(event) {
    event.currentTarget.querySelector(".dropdown-menu").classList.add("show");
  }

  function handleDropdownMouseLeave(event) {
    event.currentTarget
      .querySelector(".dropdown-menu")
      .classList.remove("show");
  }

  function handleDropdownSideMouseMove(event) {
    const dropdownSide = event.currentTarget.querySelector(".dropdown-side");
    if (dropdownSide) {
      dropdownSide.classList.add("show");
    }
  }

  function handleDropdownSideMouseLeave(event) {
    const dropdownSide = event.currentTarget.querySelector(".dropdown-side");
    if (dropdownSide) {
      dropdownSide.classList.remove("show");
    }
  }

  function toggleNavbar() {
    document.querySelector(".navbar .navbar-collapse").classList.toggle("show");
  }

  function toggleSearch() {
    let form = document.querySelector(".navbar .search-form");
    let closeBtn = document.querySelector(".search-form .close-search");

    form.classList.toggle("open");
    if (form.classList.contains("open")) closeBtn.style.display = "block";
    else closeBtn.style.display = "none";
  }
  function handleThemeChange() {
    if (typeof window === "undefined" || window === null) {
      throw new Error("Window is null");
    }

    if (typeof window.location === "undefined" || window.location === null) {
      throw new Error("Window location is null");
    }

    if (typeof window.location.pathname !== "string") {
      throw new Error("Window location pathname is not a string");
    }

    const currentPath = window.location.pathname;
    const newTheme = lightMode ? "dark" : "light";
    const newPath = currentPath.replace(
      lightMode ? "/light/" : "/dark/",
      `/${newTheme}/`
    );

    try {
      window.location.href = newPath;
    } catch (error) {
      console.error("Error while changing theme:", error);
      throw error;
    }
  }

  return (
    <>
      <TopNavbar />
      <nav
        className={`navbar navbar-expand-lg ${curve ? "nav-crev" : ""} ${
          noStatic ? "" : "static"
        } ${mainBg ? "main-bg" : ""} ${subBg ? "sub-bg" : ""}`}
      >
        <div className="container">
          <Link
            className="logo"
            href={`/${lightMode ? "light/page-home" : "dark/page-home"}`}
          >
            {lightMode ? (
              <img
                src="/dark/assets/imgs/logo-dark.png"
                alt="logo claro"
                className="icon-img-120"
              />
            ) : (
              <img
                src="/dark/assets/imgs/logo-light.png"
                alt="logo oscuro"
                className="icon-img-120"
              />
            )}
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
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href={`/${lightMode ? "light/page-home" : "dark/page-home"}`}
                >
                  <span className="rolling-text">Home</span>
                </Link>
              </li>
              <li
                className="nav-item dropdown"
                onMouseMove={handleDropdownMouseMove}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="rolling-text">Servicios</span>
                </a>
                <div className="dropdown-menu">
                  <Link
                    className="dropdown-item"
                    href={`/${
                      lightMode ? "light/page-services" : "dark/page-services"
                    }`}
                  >
                    Impresión
                  </Link>
                  <Link
                    className="dropdown-item"
                    href={`/${
                      lightMode ? "light/page-services" : "dark/page-services"
                    }`}
                  >
                    diseño
                  </Link>
                  <Link
                    className="dropdown-item"
                    href={`/${
                      lightMode ? "light/page-services" : "dark/page-services"
                    }`}
                  >
                    Cortes CNC
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href={`/${
                    lightMode ? "light/page-portfolio" : "dark/page-portfolio"
                  }`}
                >
                  <span className="rolling-text">Portafolio</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href={`/${
                    lightMode ? "light/page-about" : "dark/page-about"
                  }`}
                >
                  <span className="rolling-text">Nosotros</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href={`/${
                    lightMode ? "light/page-contact" : "dark/page-contact"
                  }`}
                >
                  <span className="rolling-text">Contacto</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href={`/${lightMode ? "light/page-home" : "dark/page-home"}`}
                  onClick={handleThemeChange}
                  onMouseMove={handleDropdownSideMouseMove}
                  onMouseLeave={handleDropdownSideMouseLeave}
                >
                  <span className="rolling-text fs-5 fw-bold">
                    {lightMode ? <MdDarkMode /> : <MdLightMode />}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="search-form">
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
          </div>
        </div>
      </nav>
    </>
  );
}

export default MainNavbar;
