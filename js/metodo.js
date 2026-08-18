// ============================================================
// METODO.JS - Lógica específica de la página "El Método"
// ============================================================

document.addEventListener("componentes-cargados", () => {
    const track = document.querySelector(".galeria-track");
    if (!track) return;

    const cards = track.querySelectorAll(".metodo-card");
    const cardBtns = track.querySelectorAll(".metodo-card-btn");

    function hideAllInfo() {
        cards.forEach((card) => card.classList.remove("info-visible"));
    }

    // 1. Evento para los botones de cada tarjeta
    cardBtns.forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation(); // Evita que el clic se propague a la tarjeta
            const card = cards[index];
            if (card.classList.contains("info-visible")) {
                card.classList.remove("info-visible");
            } else {
                hideAllInfo();
                card.classList.add("info-visible");
            }
        });
    });

    // 2. Evento para clics en la tarjeta (fuera del botón)
    track.addEventListener("click", (e) => {
        // Si el clic fue en un botón, ignoramos (ya lo manejó el listener de botón)
        if (e.target.closest(".metodo-card-btn")) return;

        const card = e.target.closest(".metodo-card");
        if (!card) return;

        // Toggle: si la tarjeta ya está visible, la ocultamos; si no, mostramos esta y ocultamos las demás
        if (card.classList.contains("info-visible")) {
            card.classList.remove("info-visible");
        } else {
            hideAllInfo();
            card.classList.add("info-visible");
        }
    });

    // 3. Al hacer scroll, ocultar toda la información
    track.addEventListener(
        "scroll",
        () => {
            hideAllInfo();
        },
        { passive: true },
    );
});
