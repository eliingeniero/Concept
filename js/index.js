// ============================================================
// INDEX.JS - Lógica específica de la página de inicio
// ============================================================

document.addEventListener("componentes-cargados", () => {
    // Carrusel del club (simple con transición y clon)
    const track = document.querySelector(".carrusel-track");
    if (!track) return;

    const imagenes = track.querySelectorAll(".carrusel-imagen");
    const total = imagenes.length; // 5 (4 originales + 1 clon)
    let indice = 0;
    const intervalo = 3000;
    let timer = null;

    function mover(indice) {
        const ancho = track.parentElement.clientWidth;
        track.style.transition = "transform 0.6s ease";
        track.style.transform = `translateX(-${indice * ancho}px)`;
    }

    function siguiente() {
        indice++;
        const ancho = track.parentElement.clientWidth;
        if (indice >= total - 1) {
            // Llegamos al clon (último)
            track.style.transition = "transform 0.6s ease";
            track.style.transform = `translateX(-${indice * ancho}px)`;
            // Cuando termine la transición, saltamos al primero sin transición
            setTimeout(() => {
                track.style.transition = "none";
                track.style.transform = "translateX(0px)";
                indice = 0;
                // Forzamos reflow para que la transición se restablezca
                void track.offsetHeight;
                // Restauramos la transición para los siguientes movimientos
                setTimeout(() => {
                    track.style.transition = "transform 0.6s ease";
                }, 20);
            }, 600);
        } else {
            mover(indice);
        }
    }

    function iniciar() {
        if (timer) clearInterval(timer);
        timer = setInterval(siguiente, intervalo);
    }

    function reiniciar() {
        clearInterval(timer);
        iniciar();
    }

    iniciar();

    // Reiniciar al redimensionar para evitar desajustes
    window.addEventListener("resize", () => {
        const ancho = track.parentElement.clientWidth;
        if (indice === 0) {
            track.style.transition = "none";
            track.style.transform = "translateX(0px)";
        } else {
            track.style.transition = "none";
            track.style.transform = `translateX(-${indice * ancho}px)`;
        }
        // Forzar reflow
        void track.offsetHeight;
        // Restaurar transición
        setTimeout(() => {
            track.style.transition = "transform 0.6s ease";
        }, 20);
    });

    // Pausar al pasar el ratón (opcional)
    const wrapper = track.parentElement;
    wrapper.addEventListener("mouseenter", () => {
        clearInterval(timer);
    });
    wrapper.addEventListener("mouseleave", () => {
        reiniciar();
    });
});
