/* ICONICWEAR — product grids, category pages and product detail.
   Driven entirely by CONTENT.products / CONTENT.categories. */

const normSizes = (p) => (p.sizes || []).map((s) => typeof s === "string" ? { size: s, status: "AVAILABLE" } : s);
const priceText = (p) => p.price ? esc(p.price) : '<span class="muted">Price on request</span>';
const instaUrl = () => CONTENT.social.iconicwear.url;

function productStatus(p) {
  const sizes = normSizes(p);
  if (sizes.length && sizes.every((s) => s.status === "SOLD OUT")) return "SOLD OUT";
  return p.status || "AVAILABLE";
}

function cardHTML(p) {
  const url = `product.html?id=${encodeURIComponent(p.id)}`;
  const status = productStatus(p);
  const sizes = normSizes(p).map((s) => s.status === "SOLD OUT" ? `<s title="Sold out">${esc(s.size)}</s>` : `<span>${esc(s.size)}</span>`).join("");
  return `<article class="card reveal">
    <a class="card-media" href="${url}" aria-label="${esc(p.name)}" data-media></a>
    <div class="card-info">
      <p class="card-code">${esc(p.id)}</p>
      <h3 class="card-name"><a href="${url}">${esc(p.name)}</a></h3>
      <p class="card-price">${priceText(p)}</p>
      <p class="card-sizes">${sizes}</p>
    </div></article>`;
}

function renderGrid(mount, list) {
  mount.innerHTML = list.map(cardHTML).join("");
  mount.querySelectorAll(".card").forEach((card, i) => {
    const p = list[i];
    const slot = card.querySelector("[data-media]");
    slot.appendChild(buildImage(p.images && p.images[0], p.name));
    const st = productStatus(p);
    if (st !== "AVAILABLE") { const b = document.createElement("span"); b.className = "badge"; b.textContent = st; slot.appendChild(b); }
    if (p.images && p.images[1]) { // this product's own second image only
      const a = document.createElement("img"); a.src = p.images[1]; a.alt = ""; a.loading = "lazy"; a.className = "card-alt"; a.onerror = () => a.remove(); slot.appendChild(a);
    }
  });
  initScrollReveal();
}

/* Homepage "New in" and any [data-products] grid */
function initGrids() {
  const home = document.getElementById("home-grid");
  if (home) renderGrid(home, CONTENT.products);

  const cat = document.getElementById("category-grid");
  if (cat) {
    const key = cat.dataset.category;
    const list = CONTENT.products.filter((p) => p.section === key);
    if (list.length) renderGrid(cat, list);
    else {
      const msg = (CONTENT.categories[key] || {}).empty || "New pieces are on the way.";
      cat.outerHTML = `<div class="empty-state reveal is-visible"><p class="display">Coming soon</p><p>${esc(msg)}</p><a class="btn btn-outline" href="${instaUrl()}" target="_blank" rel="noopener">Follow on Instagram →</a></div>`;
    }
  }
  const all = document.getElementById("all-grid");
  if (all) renderGrid(all, CONTENT.products);
}

/* ---------------- Product detail ---------------- */
function getProduct() {
  const id = new URLSearchParams(window.location.search).get("id");
  return CONTENT.products.find((p) => p.id === id) || null;
}

function renderProductDetail() {
  const mount = document.getElementById("product-detail");
  if (!mount) return;
  const p = getProduct();
  if (!p) {
    mount.innerHTML = `<div class="container text-center"><h1 class="display">Product not found</h1><p style="margin:16px 0 28px">That piece isn't available.</p><a class="btn btn-primary" href="collection.html">Back to collection</a></div>`;
    return;
  }
  document.title = `${p.name} — ICONICWEAR`;
  const sizes = normSizes(p);
  const rows = [["Colour", p.color], ["Fit", p.fit], ["Style", p.style], ["Material", p.material], ["Made in", p.origin && p.origin.replace(/^Made in\s*/i, "")]]
    .filter((r) => r[1]).map((r) => `<div class="spec-row"><dt>${r[0]}</dt><dd>${esc(r[1])}</dd></div>`).join("");
  const sizeBtns = sizes.map((s) => {
    const sold = s.status === "SOLD OUT";
    return `<button type="button" class="size-btn${sold ? " is-sold" : ""}" data-size="${esc(s.size)}" ${sold ? 'disabled aria-disabled="true"' : ""} aria-pressed="false">${esc(s.size)}${sold ? '<small>Sold out</small>' : ""}</button>`;
  }).join("");
  const status = productStatus(p);

  mount.innerHTML = `
    <div class="container">
      <p class="crumbs"><a href="collection.html">← Back to collection</a></p>
      <div class="pd-layout">
        <div class="pd-gallery">
          <div class="pd-main" id="pd-main"></div>
          <div class="pd-thumbs" id="pd-thumbs"></div>
        </div>
        <div class="pd-info">
          <p class="eyebrow">${esc(p.id)} — ${esc(p.category)}</p>
          <h1 class="display pd-title">${esc(p.name)}</h1>
          <p class="pd-price">${priceText(p)}</p>
          ${status !== "AVAILABLE" ? `<p class="pd-status">${esc(status)}</p>` : ""}
          <p class="pd-desc">${esc(p.description)}</p>
          <dl class="spec-table">${rows}</dl>
          ${sizes.length ? `<div class="pd-sizes"><p class="eyebrow">Size</p><div class="size-list" id="size-list" role="group" aria-label="Select a size">${sizeBtns}</div><p class="size-note">${esc(CONTENT.sizeNote)}</p></div>` : ""}
          <p class="order-line" id="order-line" role="status" aria-live="polite">${sizes.length ? "Select a size to order." : ""}</p>
          <a class="btn btn-primary btn-block order-btn${sizes.length ? " is-disabled" : ""}" id="order-btn" href="${instaUrl()}" target="_blank" rel="noopener" ${sizes.length ? 'aria-disabled="true" tabindex="-1"' : ""}>${esc(CONTENT.order.label)}</a>
          <ul class="pd-links"><li><a href="shipping.html">Shipping · ${esc(CONTENT.shipping.charge)}, around 2–5 days</a></li><li><a href="returns.html">Returns &amp; exchanges · report within 12 hours</a></li></ul>
        </div>
      </div>
    </div>`;

  // gallery
  const main = document.getElementById("pd-main"), thumbs = document.getElementById("pd-thumbs");
  const imgs = p.images || [];
  const show = (i) => {
    main.innerHTML = ""; main.appendChild(buildImage(imgs[i], `${p.name} — image ${i + 1}`));
    thumbs.querySelectorAll("button").forEach((b, j) => b.classList.toggle("is-active", j === i));
  };
  if (imgs.length > 1) imgs.forEach((src, i) => {
    const b = document.createElement("button"); b.type = "button"; b.setAttribute("aria-label", `View image ${i + 1}`);
    b.appendChild(buildImage(src, `${p.name} thumbnail ${i + 1}`)); b.addEventListener("click", () => show(i)); thumbs.appendChild(b);
  });
  show(0);

  // size selection — sold-out sizes can never be chosen
  const btn = document.getElementById("order-btn"), line = document.getElementById("order-line");
  let chosen = null;
  btn.addEventListener("click", (e) => { if (btn.classList.contains("is-disabled")) e.preventDefault(); });
  document.querySelectorAll(".size-btn:not(.is-sold)").forEach((b) => b.addEventListener("click", () => {
    chosen = b.dataset.size;
    document.querySelectorAll(".size-btn").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    b.parentElement.querySelectorAll(".size-btn").forEach((x) => x.classList.toggle("is-selected", x === b));
    btn.classList.remove("is-disabled"); btn.removeAttribute("aria-disabled"); btn.removeAttribute("tabindex");
    line.innerHTML = `Message <strong>${esc(CONTENT.social.iconicwear.handle)}</strong> with <strong>${esc(p.id)} · ${esc(chosen)}</strong>.`;
  }));
}

document.addEventListener("DOMContentLoaded", () => { initGrids(); renderProductDetail(); });
