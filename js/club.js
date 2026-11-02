// ============================================================
// CLUB.JS - Lógica específica de la página "El Club"
// ============================================================

document.addEventListener("componentes-cargados", () => {
    // --- Carrusel automático de la galería del club ---
    const galeriaClub = document.querySelector(".galeria-wrapper .galeria-track");
    if (galeriaClub && typeof window.scrollHorizontalAutomatico === "function") {
        window.scrollHorizontalAutomatico(galeriaClub, 2);
    }

    // --- Bloquear interacción manual en la galería automática sin afectar el scroll vertical ---
    const galeriaAuto = document.querySelector(".galeria-automatica .galeria-track");
    if (galeriaAuto) {
        galeriaAuto.addEventListener(
            "wheel",
            (e) => {
                if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                    e.preventDefault();
                }
            },
            { passive: false },
        );

        galeriaAuto.addEventListener("mousedown", (e) => e.preventDefault());

        galeriaAuto.style.userSelect = "none";
        galeriaAuto.style.webkitUserSelect = "none";
    }
});
