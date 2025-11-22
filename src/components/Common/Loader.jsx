/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import gsap from "gsap";

function Loader() {
  const router = useRouter();
  const [logoSrc, setLogoSrc] = useState("/dark/assets/imgs/logo2-dark.webp");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Detectar tema basado en la ruta
    const currentPath = router.asPath;
    const isDark = currentPath.includes("/dark/");

    // Establecer el logo apropiado
    setLogoSrc(
      isDark
        ? "/dark/assets/imgs/logo2-dark.webp"
        : "/dark/assets/imgs/logo2-light.webp"
    );
  }, [router.asPath]);

  useEffect(() => {
    try {
      // Configuración inicial optimizada
      gsap.set(".loader-wrap", { zIndex: 99999, opacity: 1 });
      gsap.set(".loader-logo", { scale: 0.3, opacity: 0, rotation: -10 });
      gsap.set(".loader-progress", { width: 0 });
      gsap.set(".loader-text", { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
        },
      });

      // Animación mejorada del logo
      tl.to(".loader-logo", {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
        delay: 0.2,
      })
        // Mostrar texto de carga
        .to(
          ".loader-text",
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.3"
        )
        // Animación de la barra de progreso
        .to(
          ".loader-progress",
          {
            width: "100%",
            duration: 1.0,
            ease: "power2.out",
          },
          "-=0.1"
        )
        // Pequeña celebración al completar
        .to(".loader-logo", {
          scale: 1.05,
          duration: 0.15,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        })
        // Ocultar texto
        .to(
          ".loader-text",
          {
            opacity: 0,
            y: -10,
            duration: 0.2,
            ease: "power2.in",
          },
          "-=0.1"
        )
        // Desvanecimiento final
        .to(".loader-wrap", {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          delay: 0.3,
        })
        .to(".loader-wrap", {
          display: "none",
          zIndex: -1,
        })
        // Animación de entrada del contenido
        .from(
          "header",
          {
            y: -30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          "header .container",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.5"
        );
    } catch (error) {
      console.error("Error in Loader component:", error);
      // Fallback mejorado
      setTimeout(() => {
        const loaderEl = document.querySelector(".loader-wrap");
        if (loaderEl) {
          gsap.to(loaderEl, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              loaderEl.style.display = "none";
            },
          });
        }
      }, 2500);
    }
  }, []);

  // Efecto para precargar la imagen
  useEffect(() => {
    const img = new Image();
    img.src = logoSrc;
    img.onload = () => {
      console.log("Logo precargado correctamente");
    };
    img.onerror = () => {
      console.warn("Error cargando logo, usando fallback");
      setLogoSrc("/light/assets/imgs/logo2-dark.webp");
    };
  }, [logoSrc]);

  return (
    <div className="loader-wrap">
      {/* Overlay de fondo */}
      <div className="loader-overlay"></div>

      {/* Contenido del loader */}
      <div className="loader-content">
        <div className="loader-logo">
          <img
            src={logoSrc}
            alt="Elephant Group"
            className="loader-logo-img"
            loading="eager"
            onError={(e) => {
              console.warn("Error loading image, using fallback");
              e.target.src = "/dark/assets/imgs/logo2-dark.webp";
            }}
          />
        </div>

        {/* Barra de progreso mejorada */}
        <div className="loader-progress-container">
          <div className="loader-progress"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
