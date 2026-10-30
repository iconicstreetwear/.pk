/* ============================================================
   ICONICWEAR — CENTRAL CONTENT FILE
   Edit text, prices, sizes, images and links here. Refresh (or
   redeploy) to see changes. Nothing below is invented: where a
   detail has not been supplied, the field is left empty.
   ============================================================ */

const CONTENT = {

  brand: {
    name: "ICONICWEAR",
    tagline: "Streetwear made to be worn.",
    logo: "assets/images/logo/iconicwear-logo.png",
  },

  /* ---------------- NAVIGATION ----------------
     Items with "children" render as dropdowns. A child with no
     href renders as plain (non-clickable) text.                */
  nav: [
    { label: "Home", href: "index.html" },
    {
      label: "Our Collection", href: "collection.html",
      children: [
        { label: "Tops", href: "tops.html" },
        { label: "Bottoms", href: "bottoms.html" },
        { label: "Cult", href: "cult.html", tag: "Soon" },
      ],
    },
    {
      label: "Sidequest", href: "sidequest.html",
      children: [
        { label: "Watches", href: "watches.html" },
        { label: "Wallets & Bags", href: "wallets-bags.html" },
        { label: "Eyewear", href: "eyewear.html", tag: "Soon" },
        { label: "Jewellery", href: "jewellery.html", tag: "Soon" },
        { label: "Others", tag: "Coming soon" },
      ],
    },
    { label: "The Story", href: "about.html" },
    { label: "Talk to Us", href: "contact.html" },
  ],

  /* ---------------- HOMEPAGE ---------------- */
  strips: [
    { text: "LIMITED PIECES — LIVE NOW", reverse: false },
    { text: "FREE SHIPPING ON ORDERS ABOVE PKR 3,000", reverse: true },
  ],

  /* Three independent campaign sections, in order. */
  campaigns: [
    {
      key: "tops", number: "01", title: "Tops",
      image: "assets/images/campaign/campaign-01-tops.jpg",
      alt: "ICONICWEAR campaign: black graphic longsleeve and white signature tee",
      href: "tops.html", button: "Shop Tops →", style: "primary",
    },
    {
      key: "sidequest", number: "02", title: "Sidequest",
      image: "assets/images/campaign/campaign-02-sidequest.jpg",
      alt: "ICONICWEAR campaign at the warehouse with the first drop boxes",
      href: "watches.html", button: "Shop Watches →", style: "primary",
    },
    {
      key: "cult", number: "03", title: "Cult",
      image: "assets/images/campaign/campaign-03-cult.jpg",
      alt: "ICONICWEAR campaign: packaged pieces floating in a dark warehouse",
      href: "cult.html", button: "Cult — Coming soon →", style: "outline",
    },
  ],

  featuredSection: { heading: "New in", supporting: "The current drop." },

  orderProcess: {
    heading: "How we process your order",
    supporting: "Select your product → contact us on Instagram → confirm your order → we process and ship it.",
    steps: [
      { step: "01", title: "Choose", body: "Find the piece you want." },
      { step: "02", title: "Message", body: "Send us the product details through Instagram." },
      { step: "03", title: "Confirm", body: "We confirm availability, size and order details." },
      { step: "04", title: "Ship", body: "Your order is prepared and shipped to you." },
    ],
  },

  /* ---------------- PRODUCTS ----------------
     section: tops | bottoms | cult | watches | wallets-bags
     sizes: strings are treated as available; use
            { size: "XL", status: "SOLD OUT" } to mark a size sold out.
     price: leave "" until confirmed (the site shows "Price on request").
     images: each product only ever uses its own images.           */
  products: [
    {
      id: "IW-LS-001",
      slug: "iw-ls-001",
      name: "Savage Graphic Longsleeve",
      category: "Graphic long-sleeve tee",
      section: "tops",
      color: "Black",
      fit: "Regular / slightly relaxed",
      style: "Graphic long-sleeve tee",
      material: "",
      origin: "Made in Pakistan",
      sizes: [
        { size: "S", status: "AVAILABLE" },
        { size: "M", status: "AVAILABLE" },
        { size: "L", status: "AVAILABLE" },
        { size: "XL", status: "SOLD OUT" },
      ],
      price: "",
      status: "AVAILABLE",
      shortDescription: "A black graphic long-sleeve with a bold portrait, red star details and signature sleeve graphics.",
      description: "A black graphic long-sleeve featuring a bold portrait, red star details, and signature sleeve graphics. Designed for a distinctive everyday streetwear look.",
      // TEMPORARY: unaltered crop of the campaign photo. Replace with the final product photos.
      images: ["assets/images/products/iw-ls-001/longsleeve-01.jpg"],
    },
    {
      id: "ICW-01",
      slug: "icw-01",
      name: "ICONICWEAR Signature Tee",
      category: "Premium T-shirt",
      section: "tops",
      color: "White",
      fit: "Regular — not tight, not baggy",
      style: "",
      material: "100% cotton, 200–220 GSM, soft-touch, pre-shrunk, ribbed crew neck",
      origin: "",
      sizes: ["S", "M", "L", "XL", "XXL"],
      price: "PKR 1,500",
      status: "AVAILABLE",
      shortDescription: "A clean signature tee built around comfort, structure and everyday streetwear.",
      description: "A clean signature tee designed around comfort, structure and everyday streetwear. The focus is a soft premium feel, a clean silhouette and understated ICONICWEAR branding, finished with a ribbed crew neck.",
      images: [
        "assets/images/products/icw-01/tee-04-hang-front.jpg",
        "assets/images/products/icw-01/tee-05-hang-back.jpg",
        "assets/images/products/icw-01/tee-01-flatlay.jpg",
        "assets/images/products/icw-01/tee-02-lifestyle.jpg",
        "assets/images/products/icw-01/tee-03-back.jpg",
      ],
    },
  ],

  /* ---------------- CATEGORY PAGES ----------------
     state "open"  -> product grid for that section (empty state until
                      products with that section are added above)
     state "soon"  -> COMING SOON page, no products shown            */
  categories: {
    tops:        { title: "Tops", eyebrow: "Our Collection", state: "open", lede: "T-shirts, long-sleeves and more.", empty: "" },
    bottoms:     { title: "Bottoms", eyebrow: "Our Collection", state: "open", lede: "", empty: "New bottoms are on the way." },
    cult:        { title: "Cult", eyebrow: "Our Collection", state: "soon", line: "The Cult collection isn't here yet." },
    watches:     { title: "Watches", eyebrow: "Sidequest", state: "open", lede: "", empty: "Watches are being added. Message us on Instagram for availability." },
    "wallets-bags": { title: "Wallets & Bags", eyebrow: "Sidequest", state: "open", lede: "", empty: "Wallets & bags are being added. Message us on Instagram for availability." },
    eyewear:     { title: "Eyewear", eyebrow: "Sidequest", state: "soon", line: "Eyewear is coming soon." },
    jewellery:   { title: "Jewellery", eyebrow: "Sidequest", state: "soon", line: "Jewellery is coming soon." },
  },

  sidequest: [
    { label: "Watches", href: "watches.html", state: "open" },
    { label: "Wallets & Bags", href: "wallets-bags.html", state: "open" },
    { label: "Eyewear", href: "eyewear.html", state: "soon" },
    { label: "Jewellery", href: "jewellery.html", state: "soon" },
    { label: "Others", href: "", state: "soon" },
  ],

  sizeNote: "Size chart coming soon.",

  order: { label: "Order on Instagram" },

  /* ---------------- THE STORY ---------------- */
  about: {
    heading: "The Story",
    intro: [
      "ICONICWEAR is a Pakistani streetwear label built around a simple idea: clothing should feel like you.",
      "The brand focuses on wearable streetwear with strong silhouettes, everyday comfort and an identity that does not need to follow every trend.",
      "ICONICWEAR is made for people who want to wear something that feels personal, confident and unmistakably theirs.",
    ],
    statements: ["Streetwear made to be worn.", "Made in Pakistan."],
  },

  contact: {
    heading: "Talk to us.",
    supporting: "For questions about products, orders, availability or collaborations, reach out through Instagram or email.",
    email: "shopgoodsifyco@gmail.com",
  },

  social: {
    iconicwear: { handle: "@iconicstreetwear.pk", url: "https://www.instagram.com/iconicstreetwear.pk/" },
    tiktok: { handle: "@iconicwear", url: "https://www.tiktok.com/@iconicwear" },
  },

  faq: {
    heading: "Frequently asked questions",
    items: [
      { q: "How do I place an order?", a: "Order through our Instagram, @iconicstreetwear.pk. Message us the product name or code and your size." },
      { q: "Do you offer Cash on Delivery?", a: "No. Orders are handled through our current ordering process — confirmed through Instagram before shipping." },
      { q: "How much is delivery?", a: "PKR 400. Shipping is free on orders above PKR 3,000." },
      { q: "How long does delivery take?", a: "Approximately 2–5 days." },
      { q: "Can I return or exchange an item?", a: "See our Returns & Exchanges policy, and report any issue within 12 hours of confirmed delivery." },
      { q: "Where is ICONICWEAR made?", a: "Pakistan." },
      { q: "Which Sidequest categories are open?", a: "Watches and Wallets & Bags. Eyewear, Jewellery and more are coming soon." },
      { q: "How can I contact ICONICWEAR?", a: "Instagram or email — see our Talk to Us page." },
    ],
  },

  shipping: {
    heading: "Shipping",
    intro: "ICONICWEAR currently ships within Pakistan only.",
    charge: "PKR 400",
    points: [
      "Free shipping on orders above PKR 3,000.",
      "Estimated delivery: around 2–5 days.",
      "Delivery timing is an estimate and can vary depending on location and circumstances.",
      "Payment and delivery instructions will be confirmed through Instagram before your order is finalized.",
      "Please don't separately tip the delivery person or pay any additional delivery fee outside the confirmed order charges.",
      "Customers must provide an accurate delivery address and contact information.",
      "ICONICWEAR is not responsible for delays caused by incorrect or incomplete customer information, or by circumstances outside our reasonable control.",
    ],
  },

  returns: {
    heading: "Returns & Exchanges",
    intro: "Exchanges are handled fairly and reviewed case by case.",
    points: [
      "Report a return/exchange issue within 12 hours of confirmed delivery.",
      "Contact ICONICWEAR through Instagram with your order details, a clear explanation, and photos/videos of the issue.",
      "Exchanges are considered for reasonable issues such as incorrect size or verified quality/damage issues.",
      "Approval is required before sending anything back.",
      "Items must remain in original condition and should not be worn, washed or damaged.",
      "Items may be inspected before an exchange is approved.",
      "Damage caused after delivery, signs of wear, washing or misuse are not eligible.",
      "Refunds are not provided as a standard option for a simple change of mind.",
      "Exchange/shipping arrangements will be confirmed through Instagram before processing.",
      "If an incorrect address or information causes additional delivery costs, those costs are the customer's responsibility.",
    ],
  },

  privacy: {
    heading: "Privacy Policy",
    sections: [
      { title: "Information We Collect", body: "ICONICWEAR may collect information you submit directly — for example your name and email, if you message us or contact us by email." },
      { title: "How Information Is Used", body: "Information you submit is used only for communication, customer support and order coordination. We do not sell customer information." },
      { title: "Analytics", body: "This website uses Google Analytics to understand how the site is used, such as which pages are visited. It may set cookies and collect anonymous usage data." },
      { title: "Third-Party Services", body: "Links to Instagram and TikTok take you to Meta's and TikTok's own platforms, governed by their own privacy policies." },
      { title: "Data Retention", body: "This website does not operate its own database. Information submitted is retained only as long as needed to respond to you or fulfil an order." },
      { title: "Policy Updates", body: "This policy may be updated as ICONICWEAR grows. Check back here for the latest version." },
      { title: "Contact", body: "Questions about this policy can be sent via Instagram at @iconicstreetwear.pk or by email." },
    ],
  },

  terms: {
    heading: "Terms & Conditions",
    sections: [
      { title: "About This Website", body: "ICONICWEAR is a product showcase and order-intent website. Browsing and using this site means you accept these terms." },
      { title: "No Online Payment", body: "This website does not process payments or checkouts. Orders are placed and confirmed through Instagram, outside of this website." },
      { title: "Product Information", body: "We aim to present product information accurately. Colors may vary slightly due to photography and screen settings. Where details are not yet confirmed, the site says so rather than guess." },
      { title: "Intellectual Property", body: "The ICONICWEAR name, logo, product designs and site content belong to ICONICWEAR and may not be reproduced without permission." },
      { title: "Orders & Availability", body: "All orders are subject to confirmation and availability through Instagram. ICONICWEAR reserves the right to decline an order." },
      { title: "Limitation of Liability", body: "ICONICWEAR is not responsible for indirect losses arising from use of this website, to the extent permitted by law." },
      { title: "Changes to These Terms", body: "These terms may be updated as ICONICWEAR grows. Continued use of the site means you accept the current version." },
    ],
  },

  cookies: {
    heading: "Cookie Policy",
    intro: "We use cookies to improve your browsing experience and understand how the site is used.",
    sections: [
      { title: "What We Use", body: "Your browser's local storage remembers whether you've dismissed the cookie notice. Google Analytics may set cookies to measure how the site is used." },
      { title: "No Advertising Cookies", body: "ICONICWEAR does not use advertising cookies." },
      { title: "Managing Your Preference", body: "Use Cookie Settings in the footer to review your choice, or clear your browser's site data for this domain at any time." },
    ],
  },

  cookieNotice: {
    heading: "We use cookies",
    message: "We use cookies to improve your browsing experience and understand how the site is used.",
    accept: "Accept",
    manage: "Manage preferences",
  },

  footer: {
    tagline: "SOME BORING SH*T DOWN HERE.",
    copyright: "© 2026 ICONICWEAR. All rights reserved.",
  },
};
