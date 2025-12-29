const toggleBtn = document.querySelector(".nav__toggle");
const navLinks = document.querySelector("[data-nav]");
const overlay = document.querySelector("[data-overlay]");

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

function openMenu() {
  if (!navLinks || !toggleBtn || !overlay) return;
  navLinks.classList.add("is-open");
  toggleBtn.setAttribute("aria-expanded", "true");
  overlay.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  if (!navLinks || !toggleBtn || !overlay) return;
  navLinks.classList.remove("is-open");
  toggleBtn.setAttribute("aria-expanded", "false");
  overlay.hidden = true;
  document.body.style.overflow = "";
}

if (toggleBtn && navLinks && overlay) {
  toggleBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.contains("is-open");
    isOpen ? closeMenu() : openMenu();
  });

  overlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      if (window.innerWidth <= 760) closeMenu();
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });
}

// Smooth scroll for anchor links (sticky header offset)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    if (!id || id === "#") return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    const headerHeight = document.querySelector(".site-header")?.offsetHeight || 0;
    const y = target.getBoundingClientRect().top + window.scrollY - headerHeight - 10;
    window.scrollTo({ top: y, behavior: "smooth" });
  });
});

// Scroll reveal animation
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => io.observe(el));
}

// Gallery lightbox (only on pages with gallery)
const gallery = document.querySelector("[data-gallery]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImg = document.querySelector(".lightbox__img");
const lightboxClose = document.querySelector(".lightbox__close");

function openLightbox(src, alt) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || "";
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  if (lightboxImg) lightboxImg.src = "";
}

if (gallery && lightbox) {
  gallery.addEventListener("click", (e) => {
    const img = e.target.closest("img");
    if (!img) return;
    openLightbox(img.src, img.alt);
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target === lightboxClose) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}

// If hero video fails to load, image will still show underneath (no extra JS needed).
