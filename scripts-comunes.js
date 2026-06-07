document.addEventListener("DOMContentLoaded", () => {
  // Cargar barras de navegación desde el archivo externo
  fetch("barras-nav.html")
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Inyectar Header
      const header = doc.querySelector(".barra-nav-superior");
      const headerPlaceholder = document.getElementById("nav-superior-placeholder");
      if (headerPlaceholder) headerPlaceholder.replaceWith(header);

      // Inyectar Footer
      const footer = doc.querySelector(".footer");
      const footerPlaceholder = document.getElementById("footer-placeholder");
      if (footerPlaceholder) footerPlaceholder.replaceWith(footer);

      // Una vez cargado el HTML, inicializamos la lógica del menú colapsable
      highlightActiveLink();
      initNavLogic();
    })
    .catch((err) => console.error("Error cargando los componentes comunes:", err));
});

/**
 * Detecta la página actual y añade la clase 'active' al enlace correspondiente
 */
function highlightActiveLink() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".barra-nav-boton");
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath) {
      link.classList.add("active");
    }
  });
}

function initNavLogic() {
  const nav = document.querySelector(".barra-nav-superior");
  const logoBtn = document.getElementById("logoBtn");
  if (!nav || !logoBtn) return;

  window.addEventListener("scroll", () => {
    if (window.innerWidth <= 768) {
      if (window.scrollY > 20) nav.classList.add("colapsada");
      else nav.classList.remove("colapsada");
    }
  });

  logoBtn.addEventListener("click", (e) => {
    if (window.innerWidth <= 768 && nav.classList.contains("colapsada")) {
      e.preventDefault();
      nav.classList.remove("colapsada");
    }
  });
}
