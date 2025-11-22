import React, { useEffect, useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import Link from "next/link";
import TopNavbar from "./TopNavbar";

function MainNavbar({ lightMode, mainBg, subBg, noStatic, curve }) {
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

  function handleThemeChange() {
    if (typeof window !== "undefined" && window !== null) {
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
  }

  // Import useState from React

  // ...rest of your code...

  // Add state to track mobile view
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 992); // Bootstrap lg breakpoint
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <TopNavbar />
      <nav
        className={`navbar navbar-expand-lg ${curve ? "nav-crev" : ""} ${
          noStatic ? "" : "static"
        } ${mainBg ? "main-bg" : ""} ${subBg ? "sub-bg" : ""}`}
      >
        <section className="container">
          <Link
            className="logo"
            href={`/${lightMode ? "light/page-home" : "dark/page-home"}`}
          >
            {lightMode ? (
              <img
                src="/dark/assets/imgs/logo-dark.webp"
                alt="Elephant Group logo claro"
                loading="lazy"
                className="icon-img-140"
              />
            ) : (
              <img
                src="/dark/assets/imgs/logo-light.webp"
                alt="Elephant Group logo oscuro"
                loading="lazy"
                className="icon-img-140"
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
          <section
            className="collapse navbar-collapse justify-content-end pe-4 pt-30"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item d-flex align-items-center justify-content-between">
                <Link
                  className="nav-link"
                  href={`/${lightMode ? "light/page-home" : "dark/page-home"}`}
                >
                  <span className="rolling-text">INICIO</span>
                </Link>
                {isMobile && (
                  <Link
                    className="nav-link ms-2"
                    href={"#"}
                    onClick={(e) => {
                      e.preventDefault();
                      handleThemeChange();
                    }}
                  >
                    <span className="rolling-text fs-5 fw-bold">
                      {lightMode ? <MdDarkMode /> : <MdLightMode />}
                    </span>
                  </Link>
                )}
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
                  <span className="rolling-text">PRODUCTOS</span>
                </a>
                <div className="dropdown-menu">
                  <Link
                    className="dropdown-item"
                    href={`/${
                      lightMode ? "light/page-services" : "dark/page-services"
                    }`}
                  >
                    Letreros
                  </Link>
                  <Link
                    className="dropdown-item"
                    href={`/${
                      lightMode ? "light/page-services" : "dark/page-services"
                    }`}
                  >
                    Señaleticas
                  </Link>
                  <Link
                    className="dropdown-item"
                    href={`/${
                      lightMode ? "light/page-services" : "dark/page-services"
                    }`}
                  >
                    Adhesivos
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
                  <span className="rolling-text">PORTAFOLIO</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href={`/${
                    lightMode ? "light/page-about" : "dark/page-about"
                  }`}
                >
                  <span className="rolling-text">COTIZACIÓN</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href={`/${lightMode ? "light/page-shop" : "dark/page-shop"}`}
                >
                  <span className="rolling-text">TIENDA</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href={`/${
                    lightMode ? "light/page-contact" : "dark/page-contact"
                  }`}
                >
                  <span className="rolling-text">CONTACTO</span>
                </Link>
              </li>
              {/* {!isMobile && (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    href={"#"}
                    onClick={(e) => {
                      e.preventDefault();
                      handleThemeChange();
                    }}
                  >
                    <span className="rolling-text fs-5 fw-bold">
                      {lightMode ? <MdDarkMode /> : <MdLightMode />}
                    </span>
                  </Link>
                </li>
              )} */}
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
