# ICONICWEAR — Brand Showcase Website

A static, editable showcase website for ICONICWEAR. Plain HTML, CSS
and vanilla JavaScript — no build step, no framework, no PHP/server
backend. Contact form sends through EmailJS. Deploys straight to
GitHub Pages.

There is **no checkout, cart, payment, or account system** anywhere —
"Order Now" sends visitors to Instagram to complete their order.

---

## 1. File structure

```
/
├── index.html            Home (hero + first drop + our story + products)
├── collection.html        Full product collection
├── product.html             Product detail page (?id=ICW-01 etc.)
├── about.html                  Story, GoodsifyCo timeline, founder
├── contact.html                  Contact form (EmailJS) + FAQ + order process
├── shipping.html                   Shipping policy
├── returns.html                      Returns & Exchanges policy
├── privacy.html                        Privacy Policy
├── cookies.html                          Cookie Policy
│
├── css/style.css            All site styling (one file)
│
├── js/
│   ├── content.js            ← YOU EDIT THIS. All text, prices, images, links.
│   ├── main.js                 Nav, footer, hero, popups, cookie notice, FAQ
│   └── products.js               Product grid + product detail rendering
│
├── assets/images/
│   ├── logo/                     Transparent ICONICWEAR logo
│   ├── banners/                    Hero slideshow images
│   ├── products/
│   │   ├── icw-01/                    Signature Tee images ONLY
│   │   └── icw-02/                      Signature Tracksuit images ONLY
│   ├── about/                             About page + founder photo
│   └── icons/                               Favicons
│
└── README.md (this file)
```

---

## 2. IMPORTANT — the contact form (EmailJS)

The Contact page form is wired to your existing EmailJS account —
**no email address is stored anywhere in this website's code.**
EmailJS delivers messages to whatever inbox you configured on the
EmailJS dashboard for that template, so the frontend never needs to
know it.

The configuration lives in `js/content.js` under `emailjs`:

```js
emailjs: {
  publicKey: "uR0KaIuT_eEe-bXwt",
  serviceId: "service_p9kciyd",
  contactTemplateId: "template_vzcfusb",
  newsletterTemplateId: "EMAILJS_NEWSLETTER_TEMPLATE_ID", // placeholder — not a real ID yet
},
```

The form sends these exact variables to match your template:
`{{name}}`, `{{email}}`, `{{title}}` (the subject field), `{{message}}`,
`{{time}}` (generated automatically at send time).

**This only works over the internet** — EmailJS's SDK is loaded from
a CDN, so testing by double-clicking `contact.html` locally with no
internet connection will show "Something went wrong." That's expected;
it'll work correctly once deployed to GitHub Pages (or any server)
with a live internet connection.

The newsletter signup in the footer is intentionally **not** wired to
EmailJS yet — it's UI-only, since no newsletter template exists yet.
Once you create one in your EmailJS dashboard, replace
`"EMAILJS_NEWSLETTER_TEMPLATE_ID"` with the real ID and let me know if
you'd like the footer form actually connected to it.

---

## 3. Where things are right now

- **Logo** — `assets/images/logo/iconicwear-logo.png` (transparent).
- **Banners** — `assets/images/banners/banner-01–04.jpg`.
- **ICW-01 (Tee) photos** — `assets/images/products/icw-01/` — includes
  the new studio hanging shots plus the original lifestyle/flat-lay set.
- **ICW-02 (Tracksuit) photos** — `assets/images/products/icw-02/` —
  same, including the new studio hanging shot.
- **Founder photo** — `assets/images/about/founder-01.jpg`.
- **About page photo** — `assets/images/about/about-01.jpg`.

If any image path in `content.js` doesn't match a real file, the site
shows a clean placeholder instead of a broken image.

---

## 4. How to add a new product (e.g. ICW-03)

1. Create `assets/images/products/icw-03/` and put **only that
   product's photos** in it.
2. In `js/content.js`, copy one of the existing product objects in
   the `products: [ ... ]` array, change the `id`/`slug`/details, and
   point `images` at the new folder only.

It appears automatically on Collection (and Home) with its own page
at `product.html?id=ICW-03`.

---

## 5. How to change prices / the delivery fee

- Product prices: `js/content.js` → each product's `price` field.
- Delivery fee: `js/content.js` → `shipping.charge` (currently
  `"PKR 400"`) — this also feeds the FAQ answer automatically.

---

## 6. How to edit the FAQ, order process, or policies

All in `js/content.js`:
- `faq.items` — question/answer pairs shown on the Contact page.
- `orderProcess.steps` — the 4-step "How your order reaches you" cards.
- `shipping.points` / `returns.points` — bulleted policy text.
- `privacy.sections` / `cookies.sections` — legal page content.

---

## 7. How to edit About Us / the founder section / the timeline

`js/content.js` → `about`:
- `intro` — opening paragraphs.
- `journey` — the GoodsifyCo → ICONICWEAR timeline (each entry has a
  `year`, `title`, `body`, and `planned: true/false` — the 2027 entry
  is marked `planned: true` so it visually shows as a future
  milestone, not something that's already happened).
- `founder.photo` / `founder.body` — the founder section.

---

## 8. How to change Instagram links

`js/content.js` → `social.goodsifyco` / `social.iconicwear`. The
Order Now buttons use `social.iconicwear.url` automatically.

---

## 9. How to enable/disable the popups

`js/content.js` → `popups.cookieNotice` / `popups.newsletterPopup` —
set `enabled: false` on either to turn it off.

---

## 10. How to deploy to GitHub Pages

1. Push all files to your GitHub repository, keeping the folder
   structure intact (upload the unzipped contents, not the zip).
2. Repository must be **Public** for GitHub Pages on a free account.
3. Settings → Pages → Source: "Deploy from a branch" → `main` → `/ (root)`.
4. Wait 1–2 minutes, hard-refresh, and check your live link.

All paths are relative, so this works from the root of a domain or a
subfolder like `/iconicwear/`.

---

## 11. Notes

- No prices, delivery times, or policy details were invented beyond
  what you provided.
- The contact form is honestly wired to a real, working service
  (EmailJS) using your exact credentials — no fake "sent" messages.
- The newsletter signup is honestly labelled as not yet connected to
  a real mailing list.
- No checkout, cart, accounts, testimonials, reviews, or fake stock
  numbers exist anywhere on the site.
- The business email address does not appear anywhere in the site's
  code or visible pages.
