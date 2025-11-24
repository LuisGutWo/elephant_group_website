/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import Link from "next/link";
import TopNavbar from "./TopNavbar";

function MainNavbar({ mainBg, subBg, noStatic, curve }) {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (!navbar) return;

      if (window.scrollY > 200) {
        navbar.classList.add("nav-scroll");
      } else {
        navbar.classList.remove("nav-scroll");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleNavbar = () => {
    const navbarCollapse = document.querySelector(".navbar .navbar-collapse");
    if (navbarCollapse) {
      navbarCollapse.classList.toggle("show");
    }
  };

  const handleDropdownMouseEnter = (event) => {
    const dropdown = event.currentTarget.querySelector(".dropdown-menu");
    if (dropdown) {
      dropdown.classList.add("show");
    }
  };

  const handleDropdownMouseLeave = (event) => {
    const dropdown = event.currentTarget.querySelector(".dropdown-menu");
    if (dropdown) {
      dropdown.classList.remove("show");
    }
  };

  return (
    <>
      <TopNavbar />
      <nav
        className={`navbar navbar-expand-lg ${curve ? "nav-crev" : ""} ${
          noStatic ? "" : "static"
        } ${mainBg ? "main-bg" : ""} ${subBg ? "sub-bg" : ""}`}
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="container">
          <Link
            className="logo"
            href="/home"
            aria-label="Elephant Group - Ir a inicio"
          >
            <img
              src="/light/assets/imgs/logo-dark.webp"
              alt="Elephant Group - Imprenta y servicios gráficos en Valparaíso"
              width="140"
              height="auto"
              className="icon-img-140"
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Abrir menú de navegación"
            onClick={toggleNavbar}
          >
            <span className="icon-bar">
              <i className="fas fa-bars"></i>
            </span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end pe-4 pt-30"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav" role="menubar">
              <li className="nav-item" role="none">
                <Link
                  className="nav-link"
                  href="/home"
                  role="menuitem"
                  aria-label="Ir a página de inicio"
                >
                  <span className="rolling-text">INICIO</span>
                </Link>
              </li>
              <li
                className="nav-item dropdown"
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
                role="none"
              >
                <Link
                  className="nav-link dropdown-toggle"
                  href="/services"
                  role="menuitem"
                  aria-label="Ver servicios de imprenta"
                  aria-haspopup="true"
                >
                  <span className="rolling-text">SERVICIOS</span>
                </Link>
                <ul className="dropdown-menu" role="menu">
                  <li role="none">
                    <Link
                      className="dropdown-item"
                      href="/services/impresion-digital"
                      role="menuitem"
                    >
                      Impresión Digital
                    </Link>
                  </li>
                  <li role="none">
                    <Link
                      className="dropdown-item"
                      href="/services/impresion-offset"
                      role="menuitem"
                    >
                      Impresión Offset
                    </Link>
                  </li>
                  <li role="none">
                    <Link
                      className="dropdown-item"
                      href="/services/gran-formato"
                      role="menuitem"
                    >
                      Gran Formato
                    </Link>
                  </li>
                  <li role="none">
                    <Link
                      className="dropdown-item"
                      href="/services/acabados"
                      role="menuitem"
                    >
                      Acabados y Terminaciones
                    </Link>
                  </li>
                  <li role="none">
                    <Link
                      className="dropdown-item"
                      href="/services/diseno"
                      role="menuitem"
                    >
                      Diseño Gráfico
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item" role="none">
                <Link
                  className="nav-link"
                  href="/portfolio"
                  role="menuitem"
                  aria-label="Ver portafolio de trabajos realizados"
                >
                  <span className="rolling-text">PORTAFOLIO</span>
                </Link>
              </li>
              <li className="nav-item" role="none">
                <Link
                  className="nav-link"
                  href="/quote"
                  role="menuitem"
                  aria-label="Solicitar cotización de servicios"
                >
                  <span className="rolling-text">COTIZACIÓN</span>
                </Link>
              </li>
              <li className="nav-item" role="none">
                <Link
                  className="nav-link"
                  href="/contact"
                  role="menuitem"
                  aria-label="Contactar con Elephant Group"
                >
                  <span className="rolling-text">CONTACTO</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default MainNavbar;
