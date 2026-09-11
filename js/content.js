/* ============================================================
   ICONICWEAR — CENTRAL CONTENT FILE
   ============================================================
   Edit everything about the website's text, images, prices and
   links right here. You should not need to touch any HTML, CSS
   or other JS files for normal day-to-day updates.

   After editing this file, just refresh the site (or re-deploy
   to GitHub Pages) to see your changes.
   ============================================================ */

const CONTENT = {

  /* ---------------------------------------------------------
     BRAND
  --------------------------------------------------------- */
  brand: {
    name: "ICONICWEAR",
    tagline: "Streetwear made to be worn.",
    logo: "assets/images/logo/iconicwear-logo.png", // transparent PNG
    favicon32: "assets/images/icons/favicon-32.png",
    favicon512: "assets/images/icons/favicon-512.png",
    appleTouchIcon: "assets/images/icons/apple-touch-icon.png",
    seoTitleSuffix: "ICONICWEAR — Streetwear Made to Be Worn",
    seoDescription: "ICONICWEAR is a Pakistan-focused streetwear brand building its first signature collection.",
  },

  /* ---------------------------------------------------------
     NAVIGATION — kept minimal on purpose
  --------------------------------------------------------- */
  nav: [
    { label: "Home", href: "index.html" },
    { label: "Collection", href: "collection.html" },
    { label: "About", href: "about.html" },
    { label: "Contact", href: "contact.html" },
  ],

  /* ---------------------------------------------------------
     HOME / HERO SLIDESHOW
     Only banners you've actually uploaded belong here. If you
     remove one, just delete its object below.

     Each banner can have its own title/subtitle. If the image
     ALREADY has campaign text baked into it, set hasText: true
     so we don't overlay duplicate text — only the button shows.
     position: "center" keeps text balanced rather than stuck
     to one edge; use "left" / "right" only when an image's
     empty space clearly favors one side.
  --------------------------------------------------------- */
  hero: {
    ctaLabel: "Explore the collection",
    ctaHref: "collection.html",
    banners: [
      {
        image: "assets/images/banners/banner-01.jpg",
        hasText: true, // image already contains "ICONICWEAR — THE FIRST DROP"
        position: "center",
      },
      {
        image: "assets/images/banners/banner-02.jpg",
        hasText: true, // image already contains the "ICONICWEAR — THE FIRST DROP" billboard
        position: "center",
      },
      {
        image: "assets/images/banners/banner-03.jpg",
        hasText: true, // image already contains "ICONICWEAR — THE FIRST DROP."
        position: "center",
      },
      {
        image: "assets/images/banners/banner-04.jpg",
        hasText: false,
        title: "Made for everyday wear.",
        subtitle: "From the warehouse to your door.",
        position: "center",
      },
    ],
  },

  /* ---------------------------------------------------------
     FEATURED COLLECTION SECTION ("First Drop" intro, Home page)
  --------------------------------------------------------- */
  featuredSection: {
    heading: "The first drop",
    supporting: "Two signature pieces. One beginning.",
  },

  /* ---------------------------------------------------------
     HOME — OUR STORY (compact, centered, links to About)
  --------------------------------------------------------- */
  homeStory: {
    eyebrow: "Our story",
    heading: "Streetwear made to be worn.",
    body: "ICONICWEAR is part of a larger journey that began with GoodsifyCo and grew through years of experimenting with ecommerce, products and business. ICONICWEAR focuses on clean, wearable pieces with a streetwear identity — designed to feel distinctive without being difficult to wear.",
    ctaLabel: "Read our story →",
    ctaHref: "about.html",
  },

  /* ---------------------------------------------------------
     PRODUCTS
     Every product has its OWN image folder
     (assets/images/products/<slug>/). Never point two products
     at the same folder, and never mix images between products.

     status options: "AVAILABLE" | "COMING SOON" | "SOLD OUT"
  --------------------------------------------------------- */
  products: [
    {
      id: "ICW-01",
      slug: "icw-01",
      name: "ICONICWEAR Signature Tee",
      category: "Premium T-Shirt",
      color: "White",
      material: "100% cotton, 200–220 GSM, soft-touch, pre-shrunk, ribbed crew neck",
      fit: "Regular / not tight, not baggy — comfortable everyday streetwear",
      sizes: ["S", "M", "L", "XL", "XXL"],
      price: "PKR 1,500",
      status: "AVAILABLE",
      shortDescription: "A clean signature tee built around comfort, structure and everyday streetwear.",
      description: "A clean signature tee designed around comfort, structure and everyday streetwear. The focus is a soft premium feel, a clean silhouette and understated ICONICWEAR branding, finished with a ribbed crew neck.",
      // Only images of the Signature Tee live here. Never reuse another product's photos.
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
      color: "Black",
      material: "TBD — final fabric composition to be confirmed",
      fit: "Slightly baggy — not extremely oversized, not tight",
      sizes: ["S", "M", "L", "XL", "XXL"],
      price: "PKR 4,000",
      status: "AVAILABLE",
      shortDescription: "A relaxed black tracksuit built around comfort and a clean streetwear silhouette.",
      description: "The second signature piece from ICONICWEAR. A relaxed black tracksuit — matching jacket and trousers — built around comfort, everyday wear and a clean streetwear silhouette.",
      // Only images of the Signature Tracksuit live here. Never reuse another product's photos.
      images: [
        "assets/images/products/icw-02/tracksuit-04-hang-set.jpg",
        "assets/images/products/icw-02/tracksuit-01-flatlay.jpg",
        "assets/images/products/icw-02/tracksuit-02-lifestyle.jpg",
        "assets/images/products/icw-02/tracksuit-03-lifestyle.jpg",
      ],
    },
  ],

  /* ---------------------------------------------------------
     SIZE GUIDE — shown on every product page until finalized
  --------------------------------------------------------- */
  sizeGuide: {
    heading: "Size chart — coming soon",
    body: "Final measurements will be added once our production specifications are finalized.",
  },

  /* ---------------------------------------------------------
     ORDER NOW — sends visitors to Instagram to place an order.
  --------------------------------------------------------- */
  order: {
    label: "Order now",
    destinationLabel: "via Instagram — @iconicstreetwear.pk",
  },

  /* ---------------------------------------------------------
     ORDER PROCESS ("How your order reaches you") — Contact page
  --------------------------------------------------------- */
  orderProcess: {
    heading: "How your order reaches you",
    supporting: "From a message on Instagram to a piece at your door.",
    steps: [
      { step: "01", icon: "message", title: "Order & address", body: "We receive your order and confirm your product, size and delivery address." },
      { step: "02", icon: "box", title: "Pack", body: "Your item is checked and prepared for packaging." },
      { step: "03", icon: "truck", title: "Ship", body: "Your package is handed over for delivery." },
      { step: "04", icon: "pin", title: "Delivered", body: "Your order reaches you within the estimated delivery window." },
    ],
  },

  /* ---------------------------------------------------------
     ABOUT PAGE
  --------------------------------------------------------- */
  about: {
    heading: "About ICONICWEAR",
    intro: [
      "ICONICWEAR is built around a simple idea: streetwear made to be worn.",
      "The brand is part of a larger journey that began with GoodsifyCo and grew through years of experimenting with ecommerce, products and business.",
      "ICONICWEAR focuses on creating clean, wearable pieces with a streetwear identity — designed to feel distinctive without being difficult to wear.",
    ],
    image: "assets/images/about/about-01.jpg",

    journeyHeading: "The GoodsifyCo journey",
    journey: [
      {
        year: "2024",
        title: "GoodsifyCo",
        body: "The GoodsifyCo idea began and was developed into a real business direction.",
        planned: false,
      },
      {
        year: "2025",
        title: "GoodsifyCo came to life",
        body: "GoodsifyCo moved into ecommerce, initially working with products such as watches and toys through sourcing and dropshipping.",
        planned: false,
      },
      {
        year: "2026",
        title: "Clothing",
        body: "GoodsifyCo expanded into clothing reselling and dropshipping in Canada, gaining experience with products, customers and ecommerce.",
        planned: false,
      },
      {
        year: "2026",
        title: "A new direction",
        body: "After moving to Saudi Arabia, a new direction began to take shape and the ICONICWEAR idea was developed.",
        planned: false,
      },
      {
        year: "2027",
        title: "ICONICWEAR",
        body: "The planned next stage — where ICONICWEAR moves from concept into its own dedicated streetwear identity.",
        planned: true,
      },
    ],

    founder: {
      heading: "The person behind ICONICWEAR",
      photo: "assets/images/about/founder-01.jpg",
      body: [
        "It started small — selling items at school back in 2021. That early experience grew into a genuine interest in business that kept building over time.",
        "The GoodsifyCo idea began in 2024, and by 2025 it had come to life. In 2026, that grew into clothing reselling and dropshipping in Canada, gaining real experience and some early success in a short period.",
        "After moving to Saudi Arabia, work began toward a different direction — one focused on building something more original. That's where the ICONICWEAR idea took shape.",
        "This is still early. Still learning, still building, still figuring things out one step at a time.",
      ],
    },
  },

  /* ---------------------------------------------------------
     CONTACT
     NOTE: the business email is intentionally NOT stored here —
     EmailJS delivers messages to the inbox configured on the
     EmailJS dashboard, so the frontend never needs to know it.
  --------------------------------------------------------- */
  contact: {
    heading: "Let's talk.",
    supporting: "Questions, collaborations or general enquiries? Connect with ICONICWEAR.",
    formNote: "Messages are sent securely through EmailJS — this site has no other backend or database.",
  },

  /* ---------------------------------------------------------
     EMAILJS — contact form wiring (public key only; safe for
     the frontend). Do not add any private/secret key here.
  --------------------------------------------------------- */
  emailjs: {
    publicKey: "uR0KaIuT_eEe-bXwt",
    serviceId: "service_p9kciyd",
    contactTemplateId: "template_vzcfusb",
    // A newsletter-specific template hasn't been created yet.
    // Once it exists, put its real ID here — until then the
    // newsletter form stays UI-only and never calls EmailJS.
    newsletterTemplateId: "EMAILJS_NEWSLETTER_TEMPLATE_ID",
  },

  /* ---------------------------------------------------------
     SOCIAL / INSTAGRAM
  --------------------------------------------------------- */
  social: {
    goodsifyco: {
      label: "Instagram — GoodsifyCo",
      handle: "@goodsifyco",
      url: "https://instagram.com/goodsifyco",
    },
    iconicwear: {
      label: "Instagram — ICONICWEAR",
      handle: "@iconicstreetwear.pk",
      url: "https://instagram.com/iconicstreetwear.pk",
    },
  },

  /* ---------------------------------------------------------
     FAQ — shown on the Contact page
  --------------------------------------------------------- */
  faq: {
    heading: "Frequently asked questions",
    items: [
      {
        q: "How do I order?",
        a: "Orders are currently placed through our Instagram. Message @iconicstreetwear.pk with the product name or product code and your required size. We'll guide you through the next steps.",
      },
      {
        q: "How long does shipping take?",
        a: "Shipping usually takes around 2–5 days. This is an estimated delivery time and orders may arrive earlier or later.",
      },
      {
        q: "What payment options are available?",
        a: "Bank transfer is currently available. Cash on Delivery is not currently available and will be announced when it becomes available.",
      },
      {
        q: "What is the delivery fee?",
        a: "The current delivery fee is PKR 400. Delivery charges and payment instructions will be confirmed through Instagram before the order is finalized.",
      },
      {
        q: "Can I exchange an item?",
        a: "Exchanges may be considered under our exchange policy if the request meets the requirements — see our Returns & Exchanges page for details.",
      },
    ],
  },

  /* ---------------------------------------------------------
     SHIPPING
  --------------------------------------------------------- */
  shipping: {
    heading: "Shipping",
    intro: "ICONICWEAR currently ships within Pakistan only.",
    charge: "PKR 400",
    points: [
      "Estimated delivery: around 2–5 days.",
      "Delivery timing is an estimate and can be earlier or later.",
      "Payment and delivery instructions will be confirmed through Instagram before your order is finalized.",
      "Please don't separately tip the delivery person or pay any additional delivery fee outside the confirmed order charges.",
      "Customers must provide an accurate delivery address and contact information.",
      "ICONICWEAR is not responsible for delays caused by incorrect or incomplete customer information, or by circumstances outside our reasonable control.",
    ],
  },

  /* ---------------------------------------------------------
     RETURNS & EXCHANGES
  --------------------------------------------------------- */
  returns: {
    heading: "Returns & Exchanges",
    intro: "Exchanges are handled fairly and reviewed case by case.",
    points: [
      "Exchange requests must be made as soon as the item is delivered and delivery is confirmed, within 12 hours.",
      "Contact ICONICWEAR through Instagram with your order details and clear proof/photos.",
      "Exchanges are considered for reasonable issues such as incorrect size or verified quality/damage issues.",
      "Approval is required before sending anything back.",
      "Items must remain in original condition and should not be worn, washed or damaged.",
      "Items may be inspected before an exchange is approved.",
      "Damage caused after delivery, signs of wear, washing or misuse are not eligible.",
      "Refunds are not currently provided as a standard option.",
      "Exchange/shipping arrangements will be confirmed through Instagram before processing.",
      "If an incorrect address or information causes additional delivery costs, those costs are the customer's responsibility.",
    ],
  },

  /* ---------------------------------------------------------
     PRIVACY POLICY
  --------------------------------------------------------- */
  privacy: {
    heading: "Privacy Policy",
    updated: "Last updated: 2026",
    sections: [
      {
        title: "Information We Collect",
        body: "ICONICWEAR may collect information you submit through website forms, such as your name and email address.",
      },
      {
        title: "How Information Is Used",
        body: "Information you submit is used for communication, customer support, and — if you choose to sign up — newsletter updates. We do not sell customer information.",
      },
      {
        title: "Third-Party Services",
        body: "Website communication relies on third-party services required for the site to function, such as EmailJS for the contact form. These services may process the information you submit in order to deliver it to us.",
      },
      {
        title: "Instagram Communications",
        body: "If you order or message us through Instagram, that conversation is handled on Meta's platform under Instagram's own privacy policy.",
      },
      {
        title: "Data Retention",
        body: "This website does not operate its own database. Information submitted is retained only as long as needed to respond to you or fulfil an order.",
      },
      {
        title: "Policy Updates",
        body: "This policy may be updated as ICONICWEAR grows. Check back here for the latest version.",
      },
      {
        title: "Contact",
        body: "Questions about this policy can be sent through the Contact page or via Instagram at @iconicstreetwear.pk.",
      },
    ],
  },

  /* ---------------------------------------------------------
     COOKIE POLICY
  --------------------------------------------------------- */
  cookies: {
    heading: "Cookie Policy",
    intro: "Cookies are small pieces of data websites can use to remember information about your visit.",
    sections: [
      {
        title: "What This Website Actually Uses",
        body: "This website may use necessary technologies, such as your browser's local storage, required for basic functionality and website operation — for example, remembering whether you've dismissed the cookie notice.",
      },
      {
        title: "No Tracking or Advertising Cookies",
        body: "ICONICWEAR does not use tracking or advertising cookies.",
      },
      {
        title: "Managing Your Preference",
        body: "You can clear this preference at any time by clearing your browser's site data for this domain.",
      },
    ],
  },

  /* ---------------------------------------------------------
     NEWSLETTER (footer only — small signup, UI only for now)
  --------------------------------------------------------- */
  newsletter: {
    heading: "Sign up for our newsletter",
    body: "Get updates on new drops, announcements and ICONICWEAR news.",
    placeholder: "Enter your email",
    buttonLabel: "Sign up",
    disclaimer: "This isn't connected to a mailing list yet — a dedicated newsletter service will be added soon.",
  },

  /* ---------------------------------------------------------
     POPUPS — both fully optional and editable
  --------------------------------------------------------- */
  popups: {
    cookieNotice: {
      enabled: true,
      heading: "We use cookies",
      message: "We use cookies to improve your experience.",
      acceptLabel: "Accept",
      manageLabel: "Manage",
    },
    newsletterPopup: {
      enabled: true,
      discountEnabled: false,
      discountText: "",
      delayMs: 8000,
      heading: "Join the ICONICWEAR list",
      body: "New pieces. Upcoming drops. Exclusive announcements.",
      placeholder: "Your email",
      buttonLabel: "Join",
    },
  },

  /* ---------------------------------------------------------
     FOOTER
  --------------------------------------------------------- */
  footer: {
    tagline: "Streetwear made to be worn.",
    credit: "Founded under GoodsifyCo.",
    copyright: "© 2026 ICONICWEAR. All rights reserved.",
  },
};
