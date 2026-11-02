// ============================================================
// SCRIPTS COMUNES - Carga de componentes + funciones globales
// ============================================================

// ---------- CARGA DE COMPONENTES ----------
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("componentes.html");
        if (!response.ok) throw new Error("Network response was not ok");

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const colorLogorario = document.body.dataset.logorarioTheme;

        const inyectarComponente = (placeholderId, selector, callback = null) => {
            const placeholder = document.getElementById(placeholderId);
            const component = selector.startsWith("#") ? doc.getElementById(selector.slice(1)) : doc.querySelector(selector);

            if (placeholder && component) {
                const clone = component.cloneNode(true);
                if (callback) callback(clone);
                placeholder.replaceWith(clone);
            }
        };

        inyectarComponente("logorario-placeholder", "#logorario-component", (el) => {
            el.style.color = colorLogorario === "dark" ? "var(--color-negro)" : "var(--color-crema)";
        });

        inyectarComponente("logorario-debajo-placeholder", "#logorario-component", (el) => {
            el.style.color = colorLogorario === "dark" ? "var(--color-negro)" : "var(--color-crema)";
            const rotado = el.querySelector(".wellness-rotado");
            if (rotado) rotado.textContent = "NUESTRA FILOSOFÍA";
        });

        inyectarComponente("timer-placeholder", "#timer-component");
        inyectarComponente("timer-arriba-placeholder", "#timer-component");
        inyectarComponente("timer-abajo-placeholder", "#timer-component");
        inyectarComponente("nav-superior-placeholder", ".barra-nav-superior");
        if (document.getElementById("app-section-placeholder")) {
            try {
                const responseApp = await fetch("seccion-app.html");
                if (responseApp.ok) {
                    const appHtml = await responseApp.text();
                    const placeholder = document.getElementById("app-section-placeholder");
                    placeholder.outerHTML = appHtml;
                }
            } catch (e) {
                console.warn("No se pudo cargar seccion-app", e);
            }
        }
        inyectarComponente("footer-placeholder", ".footer");

        cosarara();
        iniciarNavInvertida();
        iniciarLogicaNav();
        resaltarEnlaceActivo();
        iniciarPuntitosGaleria();

        const galeria = document.querySelector(".galeria-track");
        if (galeria && !galeria.closest(".seccion-club") && !galeria.closest(".galeria-automatica")) {
            if (window.innerWidth > 768) {
                scrollHorizontalManual(galeria);
            } else {
                const primeraTarjeta = galeria.querySelector(".galeria-card");
                if (primeraTarjeta) {
                    const gap = parseFloat(getComputedStyle(galeria).gap) || 0;
                    const anchoCard = primeraTarjeta.offsetWidth + gap;
                    galeria.scrollLeft = anchoCard * 4;
                }
            }
        }

        document.dispatchEvent(new CustomEvent("componentes-cargados"));
    } catch (err) {
        console.error("Critical error loading components:", err);
    }
});

// ---------- FUNCIONES COMUNES ----------

function cosarara() {
    window.addEventListener("scroll", () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;
        const cosafooter = document.querySelector(".cosafooter");

        if (cosafooter && maxScroll > 0) {
            const distanciaAlFondo = maxScroll - currentScroll;
            if (distanciaAlFondo <= 5 && distanciaAlFondo > 3) {
                cosafooter.classList.add("visible");
            } else {
                cosafooter.classList.remove("visible");
            }
        }
    });
}

function scrollHorizontalManual(container) {
    if (!container) return;
    const cards = container.querySelectorAll(".galeria-card");
    if (!cards.length) return;
    const firstCard = cards[0];
    const cardsPerCopy = Math.round(cards.length / 3);
    let gap = parseFloat(getComputedStyle(container).gap) || 0;
    let cardWidth = firstCard.offsetWidth + gap;
    let totalWidth = cardWidth * cardsPerCopy;
    container.addEventListener("wheel", (evt) => {
        if (evt.deltaY !== 0) {
            evt.preventDefault();
            let newScroll = container.scrollLeft + evt.deltaY;
            if (newScroll < cardWidth / 2) {
                newScroll += totalWidth;
            } else if (newScroll > totalWidth + cardWidth / 2) {
                newScroll -= totalWidth;
            }
            container.scrollLeft = newScroll;
        }
    });
    container.addEventListener("scroll", () => {
        let currentScroll = container.scrollLeft;
        if (currentScroll < cardWidth / 2) {
            container.scrollLeft = currentScroll + totalWidth;
        } else if (currentScroll > totalWidth + cardWidth / 2) {
            container.scrollLeft = currentScroll - totalWidth;
        }
    });
}

function scrollHorizontalAutomatico(container, speed = 1) {
    if (!container) return;
    let scrollPos = 0;
    function animate() {
        scrollPos += speed;
        const maxScroll = container.scrollWidth / 3; /* Corregido de / 2 a / 3 */
        if (scrollPos >= maxScroll) {
            scrollPos = 0;
        }
        container.scrollLeft = scrollPos;
        requestAnimationFrame(animate);
    }
    animate();
}

function resaltarEnlaceActivo() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".barra-nav-superior .barra-nav-boton, .barra-nav-superior .barra-nav-boton-negro");
    navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href && href.split("/").pop() === currentPath) {
            link.classList.add("active");
        }
    });
}

function iniciarLogicaNav() {
    const navBar = document.querySelector(".barra-nav-superior");
    if (!navBar) return;
    const menuToggles = navBar.querySelectorAll(".hamburguesa-nav");
    menuToggles.forEach((toggle) => {
        toggle.addEventListener("click", () => {
            navBar.classList.toggle("menu-abierto");
            document.body.classList.toggle("menu-abierto-body");
            document.body.style.overflow = navBar.classList.contains("menu-abierto") ? "hidden" : "";
        });
    });
    const navButtons = navBar.querySelectorAll(".barra-nav-boton, .barra-nav-boton-negro");
    navButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (navBar.classList.contains("menu-abierto")) {
                navBar.classList.remove("menu-abierto");
                document.body.style.overflow = "auto";
            }
        });
    });
}

function iniciarPuntitosGaleria() {
    const track = document.querySelector(".galeria-track");
    const cards = document.querySelectorAll(".galeria-card");
    const dots = document.querySelectorAll(".puntitos .dot");
    if (!track || cards.length === 0 || dots.length === 0) return;
    const observerOptions = { root: track, threshold: 0.6 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const index = Array.from(cards).indexOf(entry.target);
                const dotIndex = index % dots.length;
                dots.forEach((dot) => dot.classList.remove("active"));
                if (dots[dotIndex]) {
                    dots[dotIndex].classList.add("active");
                }
            }
        });
    }, observerOptions);
    cards.forEach((card) => {
        observer.observe(card);
    });
}

function iniciarNavInvertida() {
    if (document.body.dataset.logorarioTheme !== "light") return;
    const nav = document.querySelector(".barra-nav-superior");
    if (!nav) return;
    const hero = document.querySelector(".seccion-base");
    if (!hero) return;

    function actualizar() {
        const limite = hero.offsetHeight - nav.offsetHeight;
        nav.classList.toggle("nav-invertida", window.scrollY < limite);
    }

    actualizar();
    window.addEventListener("scroll", actualizar, { passive: true });
    window.addEventListener("resize", actualizar);
}

window.iniciarNavInvertida = iniciarNavInvertida;
window.scrollHorizontalManual = scrollHorizontalManual;
window.scrollHorizontalAutomatico = scrollHorizontalAutomatico;
