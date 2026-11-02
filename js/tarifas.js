// ============================================================
// TARIFAS.JS - Lógica específica de la página "Tarifas"
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tarifas-tab");
    const panels = document.querySelectorAll(".tarifas-panel");
    if (!tabs.length || !panels.length) return;

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach((t) => t.classList.remove("activo"));
            panels.forEach((p) => p.classList.remove("activo"));
            tab.classList.add("activo");
            const target = document.getElementById(tab.dataset.target);
            if (target) target.classList.add("activo");
        });
    });
});
