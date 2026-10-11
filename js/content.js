/* ============================================================
   ICONICWEAR — CENTRAL CONTENT FILE
   Edit everything about the website's text, images, prices and
   links right here. Refresh (or redeploy) to see changes.
   ============================================================ */

const CONTENT = {

  brand: {
    name: "ICONICWEAR",
    tagline: "Streetwear made to be worn.",
    logo: "assets/images/logo/iconicwear-logo.png",
    favicon32: "assets/images/icons/favicon-32.png",
    favicon512: "assets/images/icons/favicon-512.png",
    appleTouchIcon: "assets/images/icons/apple-touch-icon.png",
    seoTitleSuffix: "ICONICWEAR — Pakistani Streetwear",
    seoDescription: "ICONICWEAR is an independent Pakistani streetwear label creating wearable pieces with a distinct identity. Streetwear made to be worn.",
  },

  /* ---------------------------------------------------------
     NAVIGATION — Men / Women route to category pages; Women
     is intentionally Coming Soon until real products exist.
  --------------------------------------------------------- */
  nav: [
    { label: "Men", href: "men.html" },
    { label: "Women", href: "women.html" },
    { label: "Collection", href: "collection.html" },
    { label: "About", href: "about.html" },
    { label: "Contact", href: "contact.html" },
  ],

  /* category quick-links shown under the hero + used to build
     men.html / tops.html / bottoms.html / accessories.html */
  categories: [
    { key: "men", label: "Men", href: "men.html", status: "AVAILABLE" },
    { key: "women", label: "Women", href: "women.html", status: "COMING SOON" },
    { key: "tops", label: "Tops", href: "tops.html", status: "AVAILABLE" },
    { key: "bottoms", label: "Bottoms", href: "bottoms.html", status: "AVAILABLE" },
    { key: "accessories", label: "Accessories", href: "accessories.html", status: "COMING SOON" },
  ],

  hero: {
    ctaLabel: "Shop collection",
    ctaHref: "collection.html",
    ctaSecondaryLabel: "Explore ICONICWEAR",
    ctaSecondaryHref: "about.html",
    banners: [
      { image: "assets/images/banners/banner-01.jpg", hasText: true, position: "center" },
      { image: "assets/images/banners/banner-02.jpg", hasText: true, position: "center" },
      { image: "assets/images/banners/banner-03.jpg", hasText: true, position: "center" },
      { image: "assets/images/banners/banner-04.jpg", hasText: false, title: "Made for everyday wear.", subtitle: "From the warehouse to your door.", position: "center" },
    ],
  },

  /* exact marquee copy as specified */
  marquee: "MADE IN PAKISTAN — BUILT FOR THE ICONIC — STREETWEAR MADE TO BE WORN — WEAR WHAT FEELS LIKE YOU —",

  featuredSection: {
    heading: "The first drop",
    supporting: "Two signature pieces. One beginning.",
  },

  homeStory: {
    eyebrow: "Our story",
    heading: "Streetwear made to be worn.",
    body: "ICONICWEAR is a Pakistani streetwear label built around a simple idea: clothing should feel like you. Wearable streetwear with strong silhouettes, everyday comfort and an identity that doesn't need to follow every trend.",
    ctaLabel: "Read our story →",
    ctaHref: "about.html",
  },

  /* ---------------------------------------------------------
     PRODUCTS
     "section" maps each product to Tops / Bottoms / Accessories
     so men.html / tops.html / bottoms.html can filter correctly.
     Every product's images live in their own folder — never
     mix images between products.
  --------------------------------------------------------- */
  products: [
    {
      id: "ICW-01",
      slug: "icw-01",
      name: "ICONICWEAR Signature Tee",
      category: "Premium T-Shirt",
      section: "tops",
      color: "White",
      material: "100% cotton, 200–220 GSM, soft-touch, pre-shrunk, ribbed crew neck",
      fit: "Regular / not tight, not baggy — comfortable everyday streetwear",
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
    {
      id: "ICW-02",
      slug: "icw-02",
      name: "ICONICWEAR Signature Tracksuit",
      category: "Tracksuit",
      section: "bottoms",
      color: "Black",
      material: "TBD — final fabric composition to be confirmed",
      fit: "Slightly baggy — not extremely oversized, not tight",
      sizes: ["S", "M", "L", "XL", "XXL"],
      price: "PKR 4,000",
      status: "AVAILABLE",
      shortDescription: "A relaxed black tracksuit built around comfort and a clean streetwear silhouette.",
      description: "The second signature piece from ICONICWEAR. A relaxed black tracksuit — matching jacket and trousers — built around comfort, everyday wear and a clean streetwear silhouette.",
      images: [
        "assets/images/products/icw-02/tracksuit-04-hang-set.jpg",
        "assets/images/products/icw-02/tracksuit-01-flatlay.jpg",
        "assets/images/products/icw-02/tracksuit-02-lifestyle.jpg",
        "assets/images/products/icw-02/tracksuit-03-lifestyle.jpg",
      ],
    },
  ],

  sizeGuide: {
    heading: "Size chart — coming soon",
    body: "Final measurements will be added once our production specifications are finalized.",
  },

  order: {
    label: "Order on Instagram",
    destinationLabel: "via Instagram — @iconicstreetwear.pk",
  },

  /* "How we process your order" — shown on the homepage */
  orderProcess: {
    heading: "How we process your order",
    supporting: "Select your product → contact us on Instagram → confirm your order → we process and ship it.",
    steps: [
      { step: "01", icon: "message", title: "Choose", body: "Find the piece you want." },
      { step: "02", icon: "box", title: "Message", body: "Send us the product details through Instagram." },
      { step: "03", icon: "truck", title: "Confirm", body: "We confirm availability, size and order details." },
      { step: "04", icon: "pin", title: "Ship", body: "Your order is prepared and shipped to you." },
    ],
  },

  about: {
    heading: "About ICONICWEAR",
    intro: [
      "ICONICWEAR is a Pakistani streetwear label built around a simple idea: clothing should feel like you.",
      "The brand focuses on wearable streetwear with strong silhouettes, everyday comfort and an identity that does not need to follow every trend.",
      "ICONICWEAR is made for people who want to wear something that feels personal, confident and unmistakably theirs.",
    ],
    tags: ["Streetwear made to be worn.", "Made in Pakistan"],
  },

  contact: {
    heading: "Let's talk.",
    supporting: "For questions about products, orders, availability or collaborations, reach out through Instagram or email.",
    email: "shopgoodsifyco@gmail.com",
  },

  emailjs: {
    publicKey: "uR0KaIuT_eEe-bXwt",
    serviceId: "service_p9kciyd",
    contactTemplateId: "template_vzcfusb",
    newsletterTemplateId: "EMAILJS_NEWSLETTER_TEMPLATE_ID",
  },

  /* ---------------------------------------------------------
     SOCIAL
  --------------------------------------------------------- */
  social: {
    iconicwear: {
      label: "Instagram — ICONICWEAR",
      handle: "@iconicstreetwear.pk",
      url: "https://www.instagram.com/iconicstreetwear.pk/",
    },
    tiktok: {
      label: "TikTok — ICONICWEAR",
      handle: "@iconicwear",
      url: "https://www.tiktok.com/@iconicwear",
    },
  },

  faq: {
    heading: "Frequently asked questions",
    items: [
      { q: "How do I place an order?", a: "Order through our Instagram, @iconicstreetwear.pk. Message us the product name or code and your size." },
      { q: "Do you offer Cash on Delivery?", a: "No. Orders are handled through our current ordering process — confirmed through Instagram before shipping." },
      { q: "How much is delivery?", a: "PKR 400." },
      { q: "How long does delivery take?", a: "Approximately 2–5 days." },
      { q: "Can I return or exchange an item?", a: "See our Returns & Exchanges policy, and report any issue within 12 hours of confirmed delivery." },
      { q: "Where is ICONICWEAR made?", a: "Pakistan." },
      { q: "Is the women's collection available?", a: "Coming soon." },
      { q: "How can I contact ICONICWEAR?", a: "Instagram or email — see our Contact page." },
    ],
  },

  shipping: {
    heading: "Shipping",
    intro: "ICONICWEAR currently ships within Pakistan only.",
    charge: "PKR 400",
    points: [
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
    updated: "Last updated: 2026",
    sections: [
      { title: "Information We Collect", body: "ICONICWEAR may collect information you submit directly — for example your name and email, if you message us or use the Contact page." },
      { title: "How Information Is Used", body: "Information you submit is used only for communication, customer support and order coordination. We do not sell customer information." },
      { title: "Third-Party Services", body: "Links to Instagram and TikTok take you to Meta's and TikTok's own platforms, governed by their own privacy policies." },
      { title: "Data Retention", body: "This website does not operate its own database. Information submitted is retained only as long as needed to respond to you or fulfil an order." },
      { title: "Policy Updates", body: "This policy may be updated as ICONICWEAR grows. Check back here for the latest version." },
      { title: "Contact", body: "Questions about this policy can be sent via Instagram at @iconicstreetwear.pk or by email." },
    ],
  },

  terms: {
    heading: "Terms & Conditions",
    updated: "Last updated: 2026",
    sections: [
      { title: "About This Website", body: "ICONICWEAR is a product showcase and order-intent website. Browsing and using this site means you accept these terms." },
      { title: "No Online Payment", body: "This website does not process payments or checkouts. Orders are placed and confirmed through Instagram, outside of this website." },
      { title: "Product Information", body: "We aim to present product information accurately. Colors may vary slightly due to photography and screen settings. Where details are not yet confirmed, the site will say so rather than guess." },
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
      { title: "What This Website Actually Uses", body: "This website uses your browser's local storage for basic functionality — for example, remembering whether you've dismissed the cookie notice." },
      { title: "No Tracking or Advertising Cookies", body: "ICONICWEAR does not use tracking or advertising cookies." },
      { title: "Managing Your Preference", body: "You can clear this preference at any time by clearing your browser's site data for this domain." },
    ],
  },

  popups: {
    cookieNotice: {
      enabled: true,
      heading: "We use cookies",
      message: "We use cookies to improve your browsing experience and understand how the site is used.",
      acceptLabel: "Accept",
      manageLabel: "Manage preferences",
    },
  },

  footer: {
    tagline: "Streetwear made to be worn.",
    credit: "Made in Pakistan.",
    copyright: "© 2026 ICONICWEAR. All rights reserved.",
    navLinks: [
      { label: "Home", href: "index.html" },
      { label: "Collection", href: "collection.html" },
      { label: "Men", href: "men.html" },
      { label: "Women", href: "women.html" },
      { label: "About", href: "about.html" },
      { label: "Contact", href: "contact.html" },
      { label: "FAQ", href: "faq.html" },
    ],
    policyLinks: [
      { label: "Shipping", href: "shipping.html" },
      { label: "Returns", href: "returns.html" },
      { label: "Privacy", href: "privacy.html" },
      { label: "Terms", href: "terms.html" },
      { label: "Cookies", href: "cookies.html" },
    ],
  },
};
