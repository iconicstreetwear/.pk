/* ICONICWEAR — shared behaviour: navigation, strips, footer, cookie
   notice, scroll reveal, FAQ. All copy comes from CONTENT. */

const ICONS = {
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 6.5l9 6.5 9-6.5"/></svg>`,
  caret: `<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M2 4.2l4 4 4-4"/></svg>`,
  up: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 19V5"/><path d="M6 11l6-6 6 6"/></svg>`,
};

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* Image with graceful placeholder (never a broken icon) */
function buildImage(src, alt) {
  const wrap = document.createElement("div");
  wrap.style.display = "contents";
  const ph = () => { const d = document.createElement("div"); d.className = "placeholder"; d.textContent = alt || "Image"; return d; };
  if (!src) { wrap.appendChild(ph()); return wrap; }
  const img = document.createElement("img");
  img.src = src; img.alt = alt || ""; img.loading = "lazy"; img.decoding = "async";
  img.onerror = () => { wrap.innerHTML = ""; wrap.appendChild(ph()); };
  wrap.appendChild(img);
  return wrap;
}

function currentPage() { return window.location.pathname.split("/").pop() || "index.html"; }

/* ---------------- Navigation ---------------- */
function renderNav() {
  const mount = document.getElementById("site-nav");
  if (!mount) return;
  const page = currentPage();
  const items = CONTENT.nav.map((item, i) => {
    const isCur = item.href === page || (item.children || []).some((c) => c.href === page);
    if (!item.children) {
      return `<li><a href="${item.href}"${item.href === page ? ' aria-current="page"' : ""}>${esc(item.label)}</a></li>`;
    }
    const kids = item.children.map((c) => c.href
      ? `<li><a href="${c.href}"${c.href === page ? ' aria-current="page"' : ""}>${esc(c.label)}${c.tag ? `<em>${esc(c.tag)}</em>` : ""}</a></li>`
      : `<li><span class="dd-static">${esc(item.label === "Sidequest" ? c.label : c.label)}${c.tag ? `<em>${esc(c.tag)}</em>` : ""}</span></li>`).join("");
    return `<li class="has-dd" data-dd="${i}">
      <a class="dd-link" href="${item.href}"${isCur ? ' aria-current="page"' : ""}>${esc(item.label)}</a>
      <button type="button" class="dd-toggle" aria-expanded="false" aria-haspopup="true" aria-label="Show ${esc(item.label)} menu">${ICONS.caret}</button>
      <ul class="dd-menu">${kids}</ul>
    </li>`;
  }).join("");

  mount.innerHTML = `
    <div class="container nav-inner">
      <a href="index.html" class="nav-logo" aria-label="ICONICWEAR — home"><img src="${CONTENT.brand.logo}" alt="ICONICWEAR"></a>
      <ul class="nav-links" id="nav-links">${items}</ul>
      <div class="nav-tools">
        <a class="nav-icon" href="${CONTENT.social.iconicwear.url}" target="_blank" rel="noopener" aria-label="ICONICWEAR on Instagram">${ICONS.instagram}</a>
        <button type="button" class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Menu"><span></span><span></span><span></span></button>
      </div>
    </div>`;

  const links = document.getElementById("nav-links");
  const toggle = document.getElementById("nav-toggle");
  const canHover = window.matchMedia("(hover: hover) and (min-width: 861px)");
  const dds = [...links.querySelectorAll(".has-dd")];

  const setOpen = (li, open) => {
    li.classList.toggle("is-open", open);
    li.querySelector(".dd-toggle").setAttribute("aria-expanded", String(open));
  };
  const closeAll = (except) => dds.forEach((li) => { if (li !== except) setOpen(li, false); });

  dds.forEach((li) => {
    li.querySelector(".dd-toggle").addEventListener("click", () => {
      const open = !li.classList.contains("is-open");
      closeAll(li); setOpen(li, open);
    });
    // Hover only opens/closes the menu — it never navigates.
    li.addEventListener("mouseenter", () => { if (canHover.matches) { closeAll(li); setOpen(li, true); } });
    li.addEventListener("mouseleave", () => { if (canHover.matches) setOpen(li, false); });
    li.addEventListener("focusout", (e) => { if (!li.contains(e.relatedTarget)) setOpen(li, false); });
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeAll(); toggle.setAttribute("aria-expanded", "false"); links.classList.remove("is-open"); } });
  document.addEventListener("click", (e) => { if (!e.target.closest(".has-dd")) closeAll(); });

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => { links.classList.remove("is-open"); document.body.classList.remove("menu-open"); }));

  const upd = () => mount.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", upd, { passive: true }); upd();
}

/* ---------------- Announcement strips ---------------- */
function renderStrips(mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = CONTENT.strips.map((s, i) => {
    const unit = `<span>${esc(s.text)}</span>`;
    const half = unit.repeat(6);               // identical halves => seamless loop
    return `<div class="strip strip-${i + 1}${s.reverse ? " is-reverse" : ""}" role="${i ? "presentation" : "marquee"}" aria-label="${esc(s.text)}"><div class="strip-track" aria-hidden="true">${half}${half}</div></div>`;
  }).join("");
}

/* ---------------- Footer ---------------- */
function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  const s = CONTENT.social;
  mount.innerHTML = `
    <div class="container">
      <div class="footer-wordmark" aria-hidden="true">ICONICWEAR</div>
      <div class="footer-top">
        <div class="footer-brand">
          <a href="index.html" class="footer-logo" aria-label="ICONICWEAR — home"><img src="${CONTENT.brand.logo}" alt="ICONICWEAR"></a>
          <p>${esc(CONTENT.footer.tagline)}</p>
        </div>
        <div class="footer-col"><h4>Explore</h4><ul>
          <li><a href="collection.html">Shop</a></li>
          <li><a href="sidequest.html">Sidequest</a></li>
        </ul></div>
        <div class="footer-col"><h4>Info</h4><ul>
          <li><a href="shipping.html">Shipping</a></li>
          <li><a href="returns.html">Returns</a></li>
          <li><a href="privacy.html">Privacy</a></li>
          <li><a href="terms.html">Terms</a></li>
        </ul></div>
        <div class="footer-col"><h4>Socials</h4><ul>
          <li><a href="${s.iconicwear.url}" target="_blank" rel="noopener">Instagram</a></li>
          <li><a href="${s.tiktok.url}" target="_blank" rel="noopener">TikTok</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul></div>
      </div>
      <div class="footer-bottom">
        <span>${esc(CONTENT.footer.copyright)}</span>
        <span class="footer-legal"><button type="button" id="cookie-settings">Cookie Settings</button><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a></span>
      </div>
    </div>`;
  document.getElementById("cookie-settings").addEventListener("click", () => {
    try { localStorage.removeItem("icw-cookie-choice"); } catch (e) {}
    showCookieNotice(true);
  });
}

/* ---------------- Cookie notice ---------------- */
function showCookieNotice(force) {
  const cfg = CONTENT.cookieNotice;
  let saved = null;
  try { saved = localStorage.getItem("icw-cookie-choice"); } catch (e) {}
  if (saved && !force) return;
  if (document.querySelector(".cookie-notice")) return;
  const el = document.createElement("div");
  el.className = "cookie-notice"; el.setAttribute("role", "dialog"); el.setAttribute("aria-label", cfg.heading);
  el.innerHTML = `<p class="cookie-title">${esc(cfg.heading)}</p><p>${esc(cfg.message)}</p>
    <div class="cookie-actions"><button type="button" class="btn btn-primary" data-c="accept">${esc(cfg.accept)}</button><a class="btn btn-outline" href="cookies.html">${esc(cfg.manage)}</a></div>`;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add("is-visible"));
  el.querySelector('[data-c="accept"]').addEventListener("click", () => {
    try { localStorage.setItem("icw-cookie-choice", "accept"); } catch (e) {}
    el.classList.remove("is-visible"); setTimeout(() => el.remove(), 350);
  });
}

/* ---------------- Scroll reveal + back to top ---------------- */
function initScrollReveal() {
  const t = document.querySelectorAll(".reveal:not(.is-visible)");
  if (!t.length) return;
  if (!("IntersectionObserver" in window)) { t.forEach((e) => e.classList.add("is-visible")); return; }
  const io = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { x.target.classList.add("is-visible"); io.unobserve(x.target); } }), { threshold: 0.12 });
  t.forEach((e) => io.observe(e));
}
function initBackToTop() {
  const b = document.createElement("button");
  b.className = "back-to-top"; b.type = "button"; b.setAttribute("aria-label", "Back to top"); b.innerHTML = ICONS.up;
  document.body.appendChild(b);
  window.addEventListener("scroll", () => b.classList.toggle("is-visible", window.scrollY > 700), { passive: true });
  b.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ---------------- FAQ accordion ---------------- */
function renderFAQAccordion(mountId, items) {
  const list = document.getElementById(mountId);
  if (!list) return;
  list.innerHTML = items.map((it, i) => `
    <div class="faq-item">
      <button type="button" class="faq-question" aria-expanded="false" aria-controls="${mountId}-a${i}"><span><span class="faq-number">${String(i + 1).padStart(2, "0")}</span>${esc(it.q)}</span><span class="faq-icon" aria-hidden="true"></span></button>
      <div class="faq-answer" id="${mountId}-a${i}"><div class="faq-answer-inner"><p>${esc(it.a)}</p></div></div>
    </div>`).join("");
  list.querySelectorAll(".faq-question").forEach((b) => b.addEventListener("click", () => {
    const open = b.closest(".faq-item").classList.toggle("is-open");
    b.setAttribute("aria-expanded", String(open));
  }));
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav(); renderStrips("strips"); renderFooter(); initScrollReveal(); initBackToTop(); showCookieNotice(false);
});
