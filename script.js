/* ==================================================
  ACCORDION SOBRE
================================================== */
const accordion = document.querySelector(".sobre__accordion");
const panel = document.querySelector(".sobre__panel");

accordion.addEventListener("click", () => {
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
  } else {
    panel.style.maxHeight = panel.scrollHeight + "px";
  }
});

/* ==================================================
  ACCORDION — PSICOTERAPIA (1 aberto por vez)
================================================== */
(() => {
  const root = document.querySelector("[data-acc]");
  if (!root) return;

  const items = Array.from(root.querySelectorAll(".psico-acc__item"));

  const closeItem = (item) => {
    item.classList.remove("is-open");
    const btn = item.querySelector("[data-acc-btn]");
    const panel = item.querySelector("[data-acc-panel]");
    if (btn) btn.setAttribute("aria-expanded", "false");
    if (panel) panel.style.maxHeight = null;
  };

  const openItem = (item) => {
    item.classList.add("is-open");
    const btn = item.querySelector("[data-acc-btn]");
    const panel = item.querySelector("[data-acc-panel]");
    if (btn) btn.setAttribute("aria-expanded", "true");
    if (panel) panel.style.maxHeight = panel.scrollHeight + "px";
  };

  items.forEach((item) => {
    const btn = item.querySelector("[data-acc-btn]");
    const panel = item.querySelector("[data-acc-panel]");
    if (!btn || !panel) return;

    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // fecha todos
      items.forEach(closeItem);

      // abre o clicado se estava fechado
      if (!isOpen) openItem(item);
    });
  });
})();

/* ==================================================
  FAQ (1 aberto por vez)
================================================== */

const faqItems = document.querySelectorAll(".faq__item");

faqItems.forEach(item => {
  const btn = item.querySelector(".faq__question");

  btn.addEventListener("click", () => {

    faqItems.forEach(i => {
      if(i !== item){
        i.classList.remove("active");
      }
    });

    item.classList.toggle("active");
  });
});

/* ==================================================
  NAV MOBILE — HAMBURGUER
================================================== */
(() => {
  const toggle = document.querySelector(".nav__toggle");
  const nav = document.querySelector("#primary-nav");
  const header = document.querySelector(".header");

  if (!toggle || !nav || !header) return;

  const closeMenu = () => {
    header.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  };

  const openMenu = () => {
    header.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Fechar menu");
  };

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.contains("nav-open");
    isOpen ? closeMenu() : openMenu();
  });

  // Fecha ao clicar em qualquer link
  nav.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) closeMenu();
  });

  // Fecha com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Se voltar pro desktop, garante fechado
  const mq = window.matchMedia("(min-width: 992px)");
  const onChange = () => { if (mq.matches) closeMenu(); };
  mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange);
})();