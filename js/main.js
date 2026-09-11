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

  const links = CONTENT.nav
    .map((item) => {
      const isCurrent = item.href === page;
      return `<li><a href="${item.href}"${isCurrent ? ' aria-current="page"' : ""}>${item.label}</a></li>`;
    })
    .join("");

  mount.innerHTML = `
    <div class="container">
      <a href="index.html" class="nav-logo" aria-label="${CONTENT.brand.name} home"></a>
      <button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links" id="nav-links" role="list">
        ${links}
      </ul>
    </div>
  `;

  fillLogo(mount.querySelector(".nav-logo"));

  const toggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  window.addEventListener("scroll", () => {
    mount.classList.toggle("is-scrolled", window.scrollY > 24);
  });
  mount.classList.toggle("is-scrolled", window.scrollY > 24);
}

/* ---------- Footer ---------- */

function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;

  const navList = CONTENT.nav
    .map((item) => `<li><a href="${item.href}">${item.label}</a></li>`)
    .join("");

  mount.innerHTML = `
    <div class="container">
      <div class="newsletter-block reveal">
        <div class="newsletter-copy">
          <h3>${CONTENT.newsletter.heading}</h3>
          <p>${CONTENT.newsletter.body}</p>
        </div>
        <form class="newsletter-form" id="newsletter-form">
          <label class="sr-only" for="newsletter-email">Email address</label>
          <input type="email" id="newsletter-email" placeholder="${CONTENT.newsletter.placeholder}" required autocomplete="email">
          <button type="submit">${CONTENT.newsletter.buttonLabel}</button>
        </form>
        <p class="newsletter-status" id="newsletter-status"></p>
      </div>

      <div class="footer-top">
        <div class="footer-brand">
          <a href="index.html" class="nav-logo" id="footer-logo" aria-label="${CONTENT.brand.name} home" style="margin-bottom:16px;"></a>
          <p>${CONTENT.footer.tagline}</p>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <ul>
            ${navList}
          </ul>
        </div>
        <div class="footer-col">
          <h4>Information</h4>
          <ul>
            <li><a href="shipping.html">Shipping</a></li>
            <li><a href="returns.html">Returns &amp; Exchanges</a></li>
            <li><a href="contact.html#faq">FAQ</a></li>
            <li><a href="privacy.html">Privacy Policy</a></li>
            <li><a href="cookies.html">Cookie Policy</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          <ul class="footer-icon-list">
            <li><a href="${CONTENT.social.goodsifyco.url}" target="_blank" rel="noopener"><span class="icon-inline footer-icon-accent">${ICONS.instagram}</span>${CONTENT.social.goodsifyco.handle}</a></li>
            <li><a href="${CONTENT.social.iconicwear.url}" target="_blank" rel="noopener"><span class="icon-inline footer-icon-accent">${ICONS.instagram}</span>${CONTENT.social.iconicwear.handle}</a></li>
            <li><a href="contact.html"><span class="icon-inline footer-icon-accent">${ICONS.mail}</span>Contact us</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom" style="flex-direction:column;align-items:center;gap:8px;text-align:center;">
        <span>${CONTENT.footer.credit}</span>
        <span>${CONTENT.footer.copyright}</span>
      </div>
    </div>
  `;

  fillLogo(document.getElementById("footer-logo"));

  const form = document.getElementById("newsletter-form");
  const status = document.getElementById("newsletter-status");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      status.textContent = CONTENT.newsletter.disclaimer;
      form.reset();
    });
  }
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
              <a href="${CONTENT.hero.ctaHref}" class="btn btn-primary">${CONTENT.hero.ctaLabel}</a>
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

/* ---------- Join list popup ---------- */

function initJoinPopup() {
  const cfg = CONTENT.popups && CONTENT.popups.newsletterPopup;
  if (!cfg || !cfg.enabled) return;
  if (sessionStorage.getItem("icw-join-popup-shown")) return;

  setTimeout(() => {
    if (sessionStorage.getItem("icw-join-popup-shown")) return;
    sessionStorage.setItem("icw-join-popup-shown", "1");

    const overlay = document.createElement("div");
    overlay.className = "join-popup-overlay";
    overlay.innerHTML = `
      <div class="join-popup" role="dialog" aria-modal="true" aria-labelledby="join-popup-heading">
        <button class="join-popup-close" aria-label="Close">×</button>
        <h3 id="join-popup-heading">${cfg.heading}</h3>
        <p>${cfg.discountEnabled && cfg.discountText ? cfg.discountText : cfg.body}</p>
        <form id="join-popup-form">
          <label class="sr-only" for="join-popup-email">Email address</label>
          <input type="email" id="join-popup-email" placeholder="${cfg.placeholder}" required autocomplete="email">
          <button type="submit" class="btn btn-primary btn-block">${cfg.buttonLabel}</button>
        </form>
      </div>
    `;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add("is-visible"));

    function close() {
      overlay.classList.remove("is-visible");
      setTimeout(() => overlay.remove(), 400);
    }

    overlay.querySelector(".join-popup-close").addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });
    overlay.querySelector("#join-popup-form").addEventListener("submit", (e) => {
      e.preventDefault();
      overlay.querySelector(".join-popup p").textContent = "This site has no backend yet, so this box isn't connected to a mailing list — but it's ready to be.";
      overlay.querySelector("form").reset();
    });
  }, cfg.delayMs || 8000);
}

/* ---------- Init ---------- */

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  renderFooter();
  renderHero();
  initScrollReveal();
  initBackToTop();
  initCookieNotice();
  initJoinPopup();
});
