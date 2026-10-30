# ICONICWEAR — website

Static HTML / CSS / vanilla JS. Deploys to GitHub Pages (relative paths, no build step).

## Edit everything in `js/content.js`
- `products` — name, code, price, sizes, images. Sizes: a plain string = available;
  `{ size: "XL", status: "SOLD OUT" }` = sold out (cannot be selected on the product page).
  Leave `price: ""` until a price is confirmed.
- `categories` — `state: "open"` shows that section's products (empty state until you add some);
  `state: "soon"` shows a COMING SOON page.
- To add a Watch / Wallet / Bag: add a product with `section: "watches"` or `section: "wallets-bags"`
  and its own image folder under `assets/images/products/`.
- `campaigns` — the three homepage campaign images and their button destinations.
- `strips` — the two announcement strips. `nav`, `faq`, `shipping`, `returns`, `privacy`, `terms`, `cookies` also live here.

## Notes
- Google tag (G-NQ1DWGSQ0M) is on every page; the Search Console verification meta is on `index.html`.
- Ordering is via Instagram only — no checkout or payments.
- `men.html`, `women.html`, `accessories.html` are redirect stubs so old links don't break.
- `assets/images/products/iw-ls-001/longsleeve-01.jpg` is a TEMPORARY crop of the campaign photo — replace with the final product photos.
