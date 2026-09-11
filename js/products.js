/* ============================================================
   ICONICWEAR — PRODUCTS.JS
   Renders the product grid (Home + Collection pages) and the
   individual product detail page, all driven by CONTENT.products
   in content.js. Add a new product there and it appears here
   automatically — no changes needed in this file.

   Each product's "images" array is its own, dedicated gallery —
   this file never mixes images between products.
   ============================================================ */

function priceHTML(product) {
  return product.price
    ? product.price
    : `<span class="tbc">Price — to be confirmed</span>`;
}

function productCardHTML(product) {
  return `
    <article class="product-card reveal">
      <a href="product.html?id=${encodeURIComponent(product.id)}" class="product-card-media" data-media></a>
      <div class="product-card-body">
        <p class="product-number">${product.id}</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-category">${product.category}</p>
        <div class="product-card-meta">
          <span class="product-card-price">${priceHTML(product)}</span>
        </div>
        <p class="product-card-desc">${product.shortDescription}</p>
        <div class="product-card-actions">
          <a href="product.html?id=${encodeURIComponent(product.id)}" class="btn btn-outline">View piece</a>
          <a href="${CONTENT.social.iconicwear.url}" target="_blank" rel="noopener" class="btn btn-primary">${CONTENT.order.label}</a>
        </div>
      </div>
    </article>
  `;
}

function renderProductGrid(mountId, limit) {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  const products = limit ? CONTENT.products.slice(0, limit) : CONTENT.products;
  mount.innerHTML = products.map(productCardHTML).join("");

  mount.querySelectorAll(".product-card").forEach((card, i) => {
    const product = products[i];
    const mediaSlot = card.querySelector("[data-media]");
    const statusBadge = document.createElement("span");
    statusBadge.className = "product-status";
    statusBadge.dataset.status = product.status;
    statusBadge.textContent = product.status;

    // This product's own image ONLY — never another product's.
    const imgWrap = buildImage(product.images && product.images[0], product.name, null);
    imgWrap.querySelectorAll("img, .placeholder").forEach((el) => {
      el.style.width = "100%";
      el.style.height = "100%";
    });
    mediaSlot.appendChild(statusBadge);
    while (imgWrap.firstChild) mediaSlot.appendChild(imgWrap.firstChild);
  });

  initScrollReveal();
}

/* ---------- Product detail page ---------- */

function getProductFromURL() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return CONTENT.products[0];
  return CONTENT.products.find((p) => p.id === id) || CONTENT.products[0];
}

function renderProductDetail() {
  const mount = document.getElementById("product-detail");
  if (!mount) return;

  const product = getProductFromURL();
  if (!product) {
    mount.innerHTML = `<div class="container section"><p>Product not found.</p></div>`;
    return;
  }

  document.title = `${product.name} — ${CONTENT.brand.name}`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", product.shortDescription);

  const sizesHTML = (product.sizes || [])
    .map((s) => `<span class="size-chip">${s}</span>`)
    .join("");

  const thumbsHTML = (product.images || [])
    .map((src, i) => `<button data-index="${i}" class="${i === 0 ? "is-active" : ""}" aria-label="View image ${i + 1}"></button>`)
    .join("");

  mount.innerHTML = `
    <div class="container">
      <p class="reveal" style="margin-bottom:28px;"><a href="collection.html" class="btn btn-outline" style="padding:12px 22px;">&larr; Back to collection</a></p>
      <div class="product-detail-layout">
        <div class="product-gallery reveal">
          <div class="product-gallery-main" id="gallery-main"></div>
          <div class="product-gallery-thumbs" id="gallery-thumbs">${thumbsHTML}</div>
        </div>
        <div class="product-info-panel reveal">
          <p class="product-info-number">${product.id} — ${product.category}</p>
          <h1 class="display product-info-name">${product.name}</h1>
          <span class="status-inline" data-status="${product.status}" style="margin-bottom:20px;display:inline-block;">${product.status}</span>
          <p class="product-info-price">${priceHTML(product)}</p>
          <p class="product-info-desc">${product.description}</p>

          <dl class="spec-table">
            <div class="spec-row"><dt>Color</dt><dd>${product.color}</dd></div>
            <div class="spec-row"><dt>Material</dt><dd>${product.material}</dd></div>
            <div class="spec-row"><dt>Fit</dt><dd>${product.fit}</dd></div>
          </dl>

          <p class="eyebrow" style="margin-bottom:12px;">Available sizes</p>
          <div class="size-list">${sizesHTML}</div>

          <div class="size-guide-box">
            <h3>${CONTENT.sizeGuide.heading}</h3>
            <p>${CONTENT.sizeGuide.body}</p>
          </div>

          <div class="product-actions">
            <a href="${CONTENT.social.iconicwear.url}" target="_blank" rel="noopener" class="btn btn-primary btn-block">
              <span class="btn-icon">${ICONS.instagram}</span> ${CONTENT.order.label}
            </a>
            <p class="form-note" style="text-align:center;">${CONTENT.order.destinationLabel}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  const images = product.images || [];
  const mainSlot = document.getElementById("gallery-main");
  const thumbButtons = document.querySelectorAll("#gallery-thumbs button");

  function showImage(index) {
    mainSlot.innerHTML = "";
    const imgWrap = buildImage(images[index], `${product.name} — image ${index + 1}`, null);
    imgWrap.querySelectorAll("img, .placeholder").forEach((el) => {
      el.style.width = "100%";
      el.style.height = "100%";
    });
    while (imgWrap.firstChild) mainSlot.appendChild(imgWrap.firstChild);

    thumbButtons.forEach((b) => b.classList.remove("is-active"));
    if (thumbButtons[index]) thumbButtons[index].classList.add("is-active");
  }

  thumbButtons.forEach((btn, i) => {
    const imgWrap = buildImage(images[i], `${product.name} thumbnail ${i + 1}`, null);
    imgWrap.querySelectorAll("img, .placeholder").forEach((el) => {
      el.style.width = "100%";
      el.style.height = "100%";
    });
    while (imgWrap.firstChild) btn.appendChild(imgWrap.firstChild);
    btn.addEventListener("click", () => showImage(i));
  });

  showImage(0);
  initScrollReveal();
}

document.addEventListener("DOMContentLoaded", () => {
  renderProductGrid("home-product-grid", 2);
  renderProductGrid("collection-product-grid");
  renderProductDetail();
});
