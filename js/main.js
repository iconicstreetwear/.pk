/* ============================================================
   ICONICWEAR — MAIN.JS
   Shared site behaviour: navigation, footer, mobile menu, hero
   slideshow, scroll reveal, cookie notice, join popup, back to
   top, image-fallback placeholders. Reads all text/links from
   CONTENT (content.js).
   ============================================================ */

/* ---------- Small inline icons (monoline, no external deps) ---------- */

const ICONS = {
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 6.5l9 6.5 9-6.5"/></svg>`,
  arrowUp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 19V5"/><path d="M6 11l6-6 6 6"/></svg>`,
  message: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 5h16v11H8l-4 4V5z"/></svg>`,
  box: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 8l9-4 9 4-9 4-9-4z"/><path d="M3 8v9l9 4 9-4V8"/><path d="M12 12v9"/></svg>`,
  truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="13" height="9"/><path d="M15 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.3"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 3v11.5a3.5 3.5 0 11-3.5-3.5"/><path d="M14 3c.4 2.6 2 4.2 5 4.5"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>`,
  bag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 016 0v2"/></svg>`,
  route: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="5" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M5 8c0 6 14 2 14 8" stroke-dasharray="2.5 2.5"/></svg>`,
};

/* ---------- FAQ accordion (used on contact.html) ---------- */

function renderFAQAccordion(mountId, items) {
  const list = document.getElementById(mountId);
  if (!list) return;

  list.innerHTML = items.map((item, i) => `
    <div class="faq-item" data-index="${i}">
      <button class="faq-question" aria-expanded="false" aria-controls="${mountId}-answer-${i}">
        <span><span class="faq-number">${String(i + 1).padStart(2, "0")}</span>${item.q}</span>
        <span class="faq-icon" aria-hidden="true"></span>
      </button>
      <div class="faq-answer" id="${mountId}-answer-${i}">
        <div class="faq-answer-inner">
          <p>${item.a}</p>
        </div>
      </div>
    </div>
  `).join("");

  list.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const isOpen = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });
  });
}

/* ---------- Utilities ---------- */

// Builds a safe <img> that swaps to a placeholder block if the
// path is missing or fails to load (per "no broken images" rule).
function buildImage(src, alt, className) {
  const wrap = document.createElement("div");
  if (className) wrap.className = className;

  if (!src) {
    wrap.appendChild(makePlaceholder(alt));
    return wrap;
  }

  const img = document.createElement("img");
  img.src = src;
  img.alt = alt || "";
  img.loading = "lazy";
  img.onerror = () => {
    wrap.innerHTML = "";
    wrap.appendChild(makePlaceholder(alt));
  };
  wrap.appendChild(img);
  return wrap;
}

function makePlaceholder(label) {
  const el = document.createElement("div");
  el.className = "placeholder";
  el.style.width = "100%";
  el.style.height = "100%";
  el.textContent = label || "Image coming soon";
  return el;
}

function currentPage() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  return path;
}

function fillLogo(mountEl, sizeClass) {
  mountEl.innerHTML = `
    <img src="${CONTENT.brand.logo}" alt="${CONTENT.brand.name}"
         onerror="this.parentElement.innerHTML='<span class=&quot;logo-fallback&quot;>${CONTENT.brand.name}</span>'">
  `;
}

/* ---------- Navigation ---------- */

function renderNav() {
  const mount = document.getElementById("site-nav");
  if (!mount) return;
  const page = currentPage();
  const links = CONTENT.nav.map((item) => {
    const isCurrent = item.href === page;
    const soon = item.href === "women.html" ? '<em class="nav-soon">Soon</em>' : "";
    return `<li><a href="${item.href}"${isCurrent ? ' aria-current="page"' : ""}>${item.label}${soon}</a></li>`;
  }).join("");

  mount.innerHTML = `
    <div class="container nav-inner">
      <a href="index.html" class="nav-logo" aria-label="${CONTENT.brand.name} home"></a>
      <ul class="nav-links" id="nav-links" role="list">${links}</ul>
      <div class="nav-tools">
        <a href="collection.html" class="nav-icon" aria-label="Browse the collection">${ICONS.search}</a>
        <a href="${CONTENT.social.iconicwear.url}" target="_blank" rel="noopener" class="nav-icon" aria-label="Order on Instagram">${ICONS.bag}</a>
        <button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Toggle menu"><span></span><span></span><span></span></button>
      </div>
    </div>`;
  fillLogo(mount.querySelector(".nav-logo"));

  const toggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  toggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }));
  const upd = () => mount.classList.toggle("is-scrolled", window.scrollY > 24);
  window.addEventListener("scroll", upd, { passive: true });
  upd();
}

/* ---------- Footer ---------- */

function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  const nav = CONTENT.footer.navLinks.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join("");
  const pol = CONTENT.footer.policyLinks.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join("");
  const s = CONTENT.social;
  mount.innerHTML = `
    <div class="container">
      <div class="footer-wordmark" aria-hidden="true">ICONICWEAR</div>
      <div class="footer-top">
        <div class="footer-brand">
          <a href="index.html" class="nav-logo" id="footer-logo" aria-label="${CONTENT.brand.name} home"></a>
          <p>${CONTENT.footer.tagline}</p>
          <p class="footer-made">${CONTENT.footer.credit}</p>
        </div>
        <div class="footer-col"><h4>Navigate</h4><ul>${nav}</ul></div>
        <div class="footer-col"><h4>Policies</h4><ul>${pol}</ul></div>
        <div class="footer-col"><h4>Follow</h4>
          <ul class="footer-icon-list">
            <li><a href="${s.iconicwear.url}" target="_blank" rel="noopener"><span class="icon-inline footer-icon-accent">${ICONS.instagram}</span>${s.iconicwear.handle}</a></li>
            <li><a href="${s.tiktok.url}" target="_blank" rel="noopener"><span class="icon-inline footer-icon-accent">${ICONS.tiktok}</span>${s.tiktok.handle}</a></li>
            <li><a href="mailto:${CONTENT.contact.email}"><span class="icon-inline footer-icon-accent">${ICONS.mail}</span>${CONTENT.contact.email}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom"><span>${CONTENT.footer.copyright}</span><span>Made in Pakistan</span></div>
    </div>`;
  fillLogo(document.getElementById("footer-logo"));
}

/* ---------- Hero slideshow (home page only) ---------- */

function renderHero() {
  const mount = document.getElementById("hero");
  if (!mount) return;

  const banners = CONTENT.hero.banners && CONTENT.hero.banners.length
    ? CONTENT.hero.banners
    : [{ image: null, hasText: false, position: "left" }];

  const slidesHTML = banners
    .map((b, i) => {
      const position = ["left", "right", "center"].includes(b.position) ? b.position : "center";
      const bareClass = b.hasText ? " hero-slide-content--bare" : "";
      const textHTML = b.hasText
        ? ""
        : `
          <p class="eyebrow hero-eyebrow">${CONTENT.brand.name}</p>
          <h1 class="display hero-heading">${b.title || ""}</h1>
          <p class="hero-sub">${b.subtitle || ""}</p>
        `;
      return `
        <div class="hero-slide${i === 0 ? " is-active" : ""}" data-index="${i}">
          <div class="hero-slide-media" data-media></div>
          <div class="hero-slide-content hero-slide-content--${position}${bareClass}">
            ${textHTML}
            <div class="hero-cta">
              <a href="${CONTENT.hero.ctaHref}" class="btn btn-primary">${CONTENT.hero.ctaLabel} →</a>
              <a href="${CONTENT.hero.ctaSecondaryHref}" class="btn btn-outline hero-ghost">${CONTENT.hero.ctaSecondaryLabel} →</a>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  const indicators = banners
    .map((_, i) => `<button class="hero-indicator${i === 0 ? " is-active" : ""}" data-index="${i}" aria-label="Go to slide ${i + 1}"></button>`)
    .join("");

  mount.innerHTML = `
    <div class="hero-slides">${slidesHTML}</div>
    ${banners.length > 1 ? `<div class="hero-indicators">${indicators}</div>` : ""}
    <nav class="cat-strip" aria-label="Shop by category">${CONTENT.categories.map(c => `<a href="${c.href}"><span>${c.label}${c.status === "COMING SOON" ? "<small>Coming soon</small>" : ""}</span><span aria-hidden="true">→</span></a>`).join("")}</nav>
  `;

  // Fill each slide's media
  mount.querySelectorAll(".hero-slide").forEach((slideEl, i) => {
    const mediaSlot = slideEl.querySelector("[data-media]");
    const imgWrap = buildImage(banners[i].image, `${CONTENT.brand.name} campaign image ${i + 1}`, null);
    imgWrap.querySelectorAll("img, .placeholder").forEach((el) => {
      el.style.width = "100%";
      el.style.height = "100%";
      el.style.position = "absolute";
      el.style.inset = "0";
    });
    mediaSlot.style.position = "absolute";
    mediaSlot.style.inset = "0";
    while (imgWrap.firstChild) mediaSlot.appendChild(imgWrap.firstChild);
  });

  if (banners.length > 1) {
    let index = 0;
    const slideEls = mount.querySelectorAll(".hero-slide");
    const dotEls = mount.querySelectorAll(".hero-indicator");

    function goTo(next) {
      slideEls[index].classList.remove("is-active");
      dotEls[index].classList.remove("is-active");
      index = next;
      slideEls[index].classList.add("is-active");
      dotEls[index].classList.add("is-active");
    }

    dotEls.forEach((dot) => {
      dot.addEventListener("click", () => goTo(Number(dot.dataset.index)));
    });

    setInterval(() => {
      goTo((index + 1) % slideEls.length);
    }, 6500);
  }
}

/* ---------- Scroll reveal for generic sections ---------- */

function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal:not(.is-visible)");
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((t) => observer.observe(t));
}

/* ---------- Back to top ---------- */

function initBackToTop() {
  const btn = document.createElement("button");
  btn.className = "back-to-top";
  btn.setAttribute("aria-label", "Back to top");
  btn.innerHTML = ICONS.arrowUp;
  document.body.appendChild(btn);

  window.addEventListener("scroll", () => {
    btn.classList.toggle("is-visible", window.scrollY > 700);
  });
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- Cookie notice ---------- */

function initCookieNotice() {
  const cfg = CONTENT.popups && CONTENT.popups.cookieNotice;
  if (!cfg || !cfg.enabled) return;
  if (localStorage.getItem("icw-cookie-choice")) return;

  const el = document.createElement("div");
  el.className = "cookie-notice";
  el.innerHTML = `
    <p style="font-family:var(--font-body);font-weight:800;text-transform:uppercase;letter-spacing:0.06em;font-size:0.8rem;margin-bottom:8px;color:var(--white);">${cfg.heading || ""}</p>
    <p>${cfg.message}</p>
    <div class="cookie-notice-actions">
      <button class="btn btn-primary" data-choice="accept">${cfg.acceptLabel}</button>
      <button class="btn btn-outline" data-choice="manage">${cfg.manageLabel}</button>
    </div>
  `;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add("is-visible"));

  el.querySelectorAll("[data-choice]").forEach((btn) => {
    btn.addEventListener("click", () => {
      localStorage.setItem("icw-cookie-choice", btn.dataset.choice);
      el.classList.remove("is-visible");
      setTimeout(() => el.remove(), 400);
      if (btn.dataset.choice === "manage") {
        window.location.href = "cookies.html";
      }
    });
  });
}

/* ---------- Init ---------- */

function initCursor() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const dot = document.createElement("div"); dot.className = "cursor-dot";
  const ring = document.createElement("div"); ring.className = "cursor-ring";
  document.body.append(dot, ring);
  document.body.classList.add("has-cursor");
  let x = 0, y = 0, rx = 0, ry = 0;
  window.addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; dot.style.transform = `translate(${x}px,${y}px)`; }, { passive: true });
  (function loop() { rx += (x - rx) * 0.18; ry += (y - ry) * 0.18; ring.style.transform = `translate(${rx}px,${ry}px)`; requestAnimationFrame(loop); })();
  document.addEventListener("mouseover", (e) => {
    const t = e.target.closest("a, button, .product-card-media");
    ring.classList.toggle("is-link", !!t);
    const isProduct = e.target.closest(".product-card-media");
    ring.classList.toggle("is-view", !!isProduct);
    ring.setAttribute("data-label", isProduct ? "View" : "");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCursor();
  renderNav();
  renderFooter();
  renderHero();
  initScrollReveal();
  initBackToTop();
  initCookieNotice();
});
