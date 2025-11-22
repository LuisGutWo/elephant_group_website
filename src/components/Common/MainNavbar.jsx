import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import TopNavbar from "./TopNavbar";

function MainNavbar({ lightMode, mainBg, subBg, noStatic, curve }) {
  // Estados optimizados
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Referencias para evitar querySelector repetitivos
  const navbarRef = useRef(null);
  const dropdownRef = useRef(null);

  // Memoización de rutas para evitar recálculos
  const routes = useMemo(
    () => ({
      home: `/${lightMode ? "light/page-home" : "dark/page-home"}`,
      services: `/${lightMode ? "light/page-services" : "dark/page-services"}`,
      portfolio: `/${
        lightMode ? "light/page-portfolio" : "dark/page-portfolio"
      }`,
      about: `/${lightMode ? "light/page-about" : "dark/page-about"}`,
      shop: `/${lightMode ? "light/page-shop" : "dark/page-shop"}`,
      contact: `/${lightMode ? "light/page-contact" : "dark/page-contact"}`,
    }),
    [lightMode]
  );

  // Throttle para optimizar el scroll
  const throttle = useCallback((func, delay) => {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
      const currentTime = Date.now();
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(
          () => {
            func.apply(this, args);
            lastExecTime = Date.now();
          },
          delay - (currentTime - lastExecTime)
        );
      }
    };
  }, []);

  // Scroll handler optimizado con throttle
  const handleScroll = useCallback(() => {
    const throttledScroll = throttle(() => {
      if (typeof window !== "undefined") {
        const scrollY = window.scrollY;
        setIsScrolled(scrollY > 200);
      }
    }, 16); // ~60fps

    return throttledScroll();
  }, [throttle]);

  // Manejo de resize optimizado con debounce
  const handleResize = useCallback(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 992);
    }
  }, []);

  // Event listeners optimizados
  useEffect(() => {
    if (typeof window !== "undefined") {
      handleResize(); // Ejecutar inmediatamente
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [handleScroll, handleResize]);

  // Handlers de dropdown optimizados
  const handleDropdownMouseEnter = useCallback(() => {
    console.log('Dropdown mouse enter');
    setDropdownOpen(true);
  }, []);

  const handleDropdownMouseLeave = useCallback(() => {
    console.log('Dropdown mouse leave');
    setDropdownOpen(false);
  }, []);

  // Toggle navbar optimizado con estado
  const toggleNavbar = useCallback(() => {
    setIsNavOpen((prev) => !prev);
  }, []);

  // Theme change optimizado
  const handleThemeChange = useCallback(
    (e) => {
      e.preventDefault();
      if (typeof window !== "undefined" && window.location?.pathname) {
        const currentPath = window.location.pathname;
        const newTheme = lightMode ? "dark" : "light";
        const newPath = currentPath.replace(
          lightMode ? "/light/" : "/dark/",
          `/${newTheme}/`
        );
        window.location.href = newPath;
      }
    },
    [lightMode]
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 992); // Bootstrap lg breakpoint
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Clases CSS dinámicas memoizadas
  const navbarClasses = useMemo(
    () =>
      [
        "navbar",
        "navbar-expand-lg",
        curve && "nav-crev",
        !noStatic && "static",
        mainBg && "main-bg",
        subBg && "sub-bg",
        isScrolled && "nav-scroll",
      ]
        .filter(Boolean)
        .join(" "),
    [curve, noStatic, mainBg, subBg, isScrolled]
  );

  const collapseClasses = useMemo(
    () =>
      [
        "collapse",
        "navbar-collapse",
        "justify-content-end",
        "pe-4",
        "pt-30",
        isNavOpen && "show",
      ]
        .filter(Boolean)
        .join(" "),
    [isNavOpen]
  );

  return (
    <>
      <TopNavbar />
      <nav
        ref={navbarRef}
        className={navbarClasses}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container">
          <Link
            className="logo"
            href={routes.home}
            aria-label="Elephant Group - Ir al inicio"
          >
            <Image
              src={
                lightMode
                  ? "/dark/assets/imgs/logo-dark.webp"
                  : "/dark/assets/imgs/logo-light.webp"
              }
              alt={`Elephant Group logo ${lightMode ? "claro" : "oscuro"}`}
              width={144}
              height={60}
              className="icon-img-144"
              priority
              style={{ width: "auto", height: "auto", maxHeight: "3.6rem" }}
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarSupportedContent"
            aria-expanded={isNavOpen}
            aria-label={`${isNavOpen ? "Cerrar" : "Abrir"} menú de navegación`}
            onClick={toggleNavbar}
          >
            <span className="icon-bar">
              <i className="fas fa-bars" aria-hidden="true"></i>
            </span>
          </button>

          <div className={collapseClasses} id="navbarSupportedContent">
            <ul className="navbar-nav" role="menubar">
              <li
                className="nav-item d-flex align-items-center justify-content-between"
                role="none"
              >
                <Link className="nav-link" href={routes.home} role="menuitem">
                  <span className="rolling-text">INICIO</span>
                </Link>
                {isMobile && (
                  <button
                    className="nav-link ms-2 border-0 bg-transparent p-0"
                    onClick={handleThemeChange}
                    aria-label={`Cambiar a modo ${
                      lightMode ? "oscuro" : "claro"
                    }`}
                    type="button"
                  >
                    <span className="rolling-text fs-5 fw-bold">
                      {lightMode ? <MdDarkMode /> : <MdLightMode />}
                    </span>
                  </button>
                )}
              </li>

              <li
                className="nav-item dropdown"
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
                ref={dropdownRef}
                role="none"
                style={{ position: 'relative' }}
              >
                <Link
                  className="nav-link"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  style={{ cursor: "pointer" }}
                >
                  <span className="rolling-text">PRODUCTOS ▼</span>
                </Link>
                <div
                  className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
                  role="menu"
                  style={{
                    display: dropdownOpen ? 'block' : 'none',
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    zIndex: 1000,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '0.5rem',
                    padding: '0.5rem',
                    minWidth: '200px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                >
                  <Link
                    className="dropdown-item"
                    href={routes.services}
                    role="menuitem"
                  >
                    Letreros
                  </Link>
                  <Link
                    className="dropdown-item"
                    href={routes.services}
                    role="menuitem"
                  >
                    Señaléticas
                  </Link>
                  <Link
                    className="dropdown-item"
                    href={routes.services}
                    role="menuitem"
                  >
                    Adhesivos
                  </Link>
                </div>
              </li>

              <li className="nav-item" role="none">
                <Link
                  className="nav-link"
                  href={routes.portfolio}
                  role="menuitem"
                >
                  <span className="rolling-text">PORTAFOLIO</span>
                </Link>
              </li>

              <li className="nav-item" role="none">
                <Link className="nav-link" href={routes.about} role="menuitem">
                  <span className="rolling-text">COTIZACIÓN</span>
                </Link>
              </li>

              <li className="nav-item" role="none">
                <Link className="nav-link" href={routes.shop} role="menuitem">
                  <span className="rolling-text">TIENDA</span>
                </Link>
              </li>

              <li className="nav-item" role="none">
                <Link
                  className="nav-link"
                  href={routes.contact}
                  role="menuitem"
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
