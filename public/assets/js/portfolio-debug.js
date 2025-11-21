// Portfolio masonry initialization script
// Monitors Isotope loading and DOM elements for debugging purposes in development

if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    // Verify Isotope is loaded
    if (window.Isotope) {
      // Isotope is available for portfolio functionality
    }

    // Check DOM elements for masonry layout
    const gallery = document.querySelector(".gallery");
    const filters = document.querySelector(".filtering");
    const items = document.querySelectorAll(".items");

    // Portfolio elements are ready for interaction
    if (items.length > 0 && gallery && filters) {
      // All required elements are present
    }
  });
}
