import React, { useEffect } from "react";

function Cursor() {
  useEffect(() => {
    const link = document.querySelectorAll(".hover-this");
    const cursor = document.querySelector(".cursor");

    const animateit = function (e) {
      const hoverAnim = this.querySelector(".hover-anim");
      const { offsetX: x, offsetY: y } = e;
      const { offsetWidth: width, offsetHeight: height } = this;
      const move = 25;
      const xMove = (x / width) * (move * 2) - move;
      const yMove = (y / height) * (move * 2) - move;

      hoverAnim.style.transform = `translate(${xMove}px, ${yMove}px)`;
      if (e.type === "mouseleave") hoverAnim.style.transform = "";
    };

    const editCursor = (e) => {
      const { clientX: x, clientY: y } = e;
      cursor.style.left = x + "px";
      cursor.style.top = y + "px";
    };

    const cursorActiveHandlers = [];

    link.forEach((b) => b.addEventListener("mousemove", animateit));
    link.forEach((b) => b.addEventListener("mouseleave", animateit));
    window.addEventListener("mousemove", editCursor);

    document.querySelectorAll("a, .cursor-pointer").forEach((el) => {
      const handleMouseMove = () => {
        cursor.classList.add("cursor-active");
      };
      const handleMouseLeave = () => {
        cursor.classList.remove("cursor-active");
      };

      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);
      cursorActiveHandlers.push({ el, handleMouseMove, handleMouseLeave });
    });

    // Cleanup function
    return () => {
      link.forEach((b) => b.removeEventListener("mousemove", animateit));
      link.forEach((b) => b.removeEventListener("mouseleave", animateit));
      window.removeEventListener("mousemove", editCursor);

      cursorActiveHandlers.forEach(
        ({ el, handleMouseMove, handleMouseLeave }) => {
          el.removeEventListener("mousemove", handleMouseMove);
          el.removeEventListener("mouseleave", handleMouseLeave);
        }
      );
    };
  }, []);

  return <div className="cursor"></div>;
}

export default Cursor;
