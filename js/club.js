// ============================================================
// CLUB.JS - Lógica específica de la página "El Club"
// ============================================================

document.addEventListener("componentes-cargados", () => {
    // --- Pestañas (tabs) ---
    const botones = document.querySelectorAll(".tab-btn");
    const contenidos = document.querySelectorAll(".tab-content");

    botones.forEach((boton) => {
        boton.addEventListener("click", () => {
            botones.forEach((b) => b.classList.remove("activo"));
            contenidos.forEach((c) => c.classList.remove("activo"));

            boton.classList.add("activo");
            const targetId = boton.getAttribute("data-target");
            document.getElementById(targetId).classList.add("activo");
        });
    });

    // --- Carrusel automático de la galería del club ---
    const galeriaClub = document.querySelector(".galeria-wrapper .galeria-track");
    if (galeriaClub && typeof window.scrollHorizontalAutomatico === "function") {
        window.scrollHorizontalAutomatico(galeriaClub, 2);
    }

    // --- Bloquear interacción manual en la galería automática sin afectar el scroll vertical ---
    const galeriaAuto = document.querySelector(".galeria-automatica .galeria-track");
    if (galeriaAuto) {
        // Prevenir scroll horizontal con rueda, permitir scroll vertical
        galeriaAuto.addEventListener(
            "wheel",
            (e) => {
                if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                    e.preventDefault();
                }
            },
            { passive: false },
        );

        // Prevenir arrastre con ratón (horizontal)
        galeriaAuto.addEventListener("mousedown", (e) => e.preventDefault());

        // Estilos para evitar selección y arrastre
        galeriaAuto.style.userSelect = "none";
        galeriaAuto.style.webkitUserSelect = "none";
    }
});
