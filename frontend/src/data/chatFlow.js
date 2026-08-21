// ---------------------------------------------------------------------------
// EDIT THIS FILE to change bot copy, add languages, or update redirect links.
// The whole conversation tree is data, not code, so no component changes are
// needed for most content updates.
// ---------------------------------------------------------------------------

// Marketplace / redirect links (fill in real URLs where placeholders exist)
export const LINKS = {
  flipkart: "https://www.flipkart.com/search?q=ramajeyam%20rice", // TODO: replace with real product link
  website: "https://www.ramajeyamrice.com", // TODO: replace with real website URL
};

// Per-platform product catalogues shown as cards once a platform is picked.
// `image` is a real product photo URL. For KPN Fresh we could source photos
// directly from the retailer's own product pages. Blinkit and Amazon block
// scraping their product images, so those platforms instead use the
// brand's own official packshots from ramajeyamrice.com (same physical
// product, just hosted on a domain that allows direct linking). Only when
// no matching official photo exists do we omit `image` and let the UI fall
// back to the designed rice-themed placeholder instead of guessing.
export const PRODUCTS = {
  kpnfresh: {
    label: "KPN Fresh",
    moreLink: "https://www.kpnfresh.com/search?q=ramajeyam",
    items: [
      {
        name: "Ramajeyam Manachanallur Ponni Rice",
        url: "https://www.kpnfresh.com/ramajeyam-manachanallur-ponni-rice/p/10037850",
        image:
          "https://services.kpnfresh.com/media/v1/products/images/659fa29c-b6e0-459e-baf2-bb11b94c22a3/ramajeyam-manachanallur-ponni-rice.webp?c_type=C1",
      },
      {
        name: "Ramajeyam Raw Sona Rice 26kg",
        url: "https://www.kpnfresh.com/ramajeyam-raw-sona-rice-26kg/p/10034933",
        image:
          "https://services.kpnfresh.com/media/v1/products/images/da411833-04c5-4d07-962f-80f1273275e6/ramajeyam-raw-sona-rice-26kg.webp?c_type=C1",
      },
      {
        name: "Ramajeyam Idli Rice",
        url: "https://www.kpnfresh.com/ramajeyam-idli-rice/p/10037854",
        image:
          "https://services.kpnfresh.com/media/v1/products/images/fc101c78-47a2-4095-b0b6-167db5e15b3a/ramajeyam-idli-rice.webp?c_type=C1",
      },
    ],
  },
  blinkit: {
    label: "Blinkit",
    moreLink: "https://blinkit.com/s/?q=ramajeyam",
    items: [
      {
        name: "Ramajeyam Premium Idli Rice (Medium Grain)",
        url: "https://blinkit.com/prn/ramajeyam-premium-idli-rice-medium-grain/prid/653704",
        image:
          "https://www.ramajeyamrice.com/shop/wp-content/uploads/2021/06/RMJ-5kg-BOTTOM-PINCH-ARTWORK-IDLI-RICE-__Front__Mockup-450x450.jpg",
      },
      {
        name: "Ramajeyam Manachanallur Boiled Ponni Rice (Medium Grain)",
        url: "https://blinkit.com/prn/ramajeyam-manachanallur-boiled-ponni-rice-medium-grain/prid/682322",
        image:
          "https://www.ramajeyamrice.com/wp-content/uploads/2021/06/RMJ-26kg-BOPP-Bag-MANCHULAR-PONNI-__Mockup-980x1282.jpg",
      },
      {
        name: "Ramajeyam Tanjore Boiled Ponni Rice (Medium Grain)",
        url: "https://blinkit.com/prn/ramajeyam-tanjore-boiled-ponni-rice-medium-grain/prid/682577",
        image:
          "https://www.ramajeyamrice.com/shop/wp-content/uploads/2021/06/RMJ-5kg-BOTTOM-PINCH-ARTWORK-TANJORE-PONNI-__Front__Mockup-1-scaled.jpg",
      },
    ],
  },
  amazon: {
    label: "Amazon",
    moreLink:
      "https://www.amazon.in/stores/page/D6A7CEA0-6096-449A-A3AA-58701CF478E6?ingress=2&lp_context_asin=B0D83M2PGJ&visitId=1db9cbf9-984c-4058-b473-84db53495d6f&store_ref=bl_ast_dp_brandlogo_sto&ref_=ast_bln",
    items: [
      {
        name: "Ramajeyam Premium Rice - Ramarajyam Red",
        url: "https://www.amazon.in/RAMAJEYAM-Premium-Rice-Ramarajyam-Red/dp/B082MKXF2B/ref=ast_sto_dp_puis",
        image:
          "https://www.ramajeyamrice.com/shop/wp-content/uploads/2021/06/RMJ-5kg-BOTTOM-PINCH-ARTWORK-TANJORE-PONNI-__Front__Mockup-1-scaled.jpg",
      },
      {
        name: "Ramajeyam Premium Rice - Idly 10Kg",
        url: "https://www.amazon.in/RAMAJEYAM-Premium-Rice-Idly-10Kg/dp/B077SDHWTN/ref=ast_sto_dp_puis?th=1",
        image:
          "https://www.ramajeyamrice.com/shop/wp-content/uploads/2021/06/RMJ-5kg-BOTTOM-PINCH-ARTWORK-IDLI-RICE-__Front__Mockup-450x450.jpg",
      },
      {
        name: "Ramajeyam Premium Rice - Ramarajyam Purple",
        url: "https://www.amazon.in/RAMAJEYAM-Premium-Rice-Ramarajyam-Purple/dp/B082NQ3BFJ/ref=ast_sto_dp_puis",
        image:
          "https://www.ramajeyamrice.com/shop/wp-content/uploads/2021/06/RMJ-5kg-BOTTOM-PINCH-ARTWORK-SONA-MANSOORI-__Front__Mockup-scaled.jpg",
      },
    ],
  },
  website: {
    label: "Website",
    moreLink: "https://www.ramajeyamrice.com/",
    items: [
      {
        name: "Rajabhogam Ponni Boiled Rice",
        url: "https://www.ramajeyamrice.com/products/rajabhogam-ponni-boiled-rice/",
        image:
          "https://www.ramajeyamrice.com/wp-content/uploads/2021/06/RMJ-26kg-BOPP-Bag-RAJABHOGHAM-PONNI-__Mockup-980x1282.jpg",
      },
      {
        name: "Seeraga Samba Biryani Rice",
        url: "https://www.ramajeyamrice.com/products/seeraga-samba-biryani-rice/",
        image:
          "https://www.ramajeyamrice.com/wp-content/uploads/2021/06/RMJ-26kg-BOPP-Bag-JEERAKASALA-RICE-__Mockup-980x1282.jpg",
      },
      {
        name: "Idli Kar Rice",
        url: "https://www.ramajeyamrice.com/products/idli-kar-rice/",
        image:
          "https://www.ramajeyamrice.com/wp-content/uploads/2021/06/RMJ-26kg-BOPP-Bag-IDLI-RICE-__Mockup-980x1282.jpg",
      },
    ],
  },
};

// Text strings per language. Add more keys / languages here as needed.
export const STRINGS = {
  english: {
    welcome: "Thank you for visiting Ramajeyam Rice Brand 🌾",
    chooseLanguage: "Please choose your language",
    mainMenu: "How can we help you today?",
    quickCommercePrompt: "Choose your quick commerce platform:",
    ecommercePrompt: "Choose your e-commerce platform:",
    websiteRedirect: "Taking you to our website to place your order...",
    kpnTitle: "Ramajeyam products on KPN Fresh 🌾",
    blinkitTitle: "Ramajeyam products on Blinkit ⚡",
    amazonTitle: "Ramajeyam products on Amazon 🛒",
    websiteTitle: "Ramajeyam products on our website 🌐",
    viewProduct: "View product",
    moreProducts: "See more products",
    queriesIntro: "Sorry for the inconvenience 🙏\nPlease choose an option:",
    formIntro: "Please share the following details:",
    platformLabel: "Platform purchased",
    dateLabel: "Ordered date",
    productLabel: "Product",
    rateLabel: "Rate (price / quantity)",
    contactLabel: "Contact number",
    descriptionLabel: "Describe your issue",
    attachmentLabel: "Attach a photo or PDF (optional)",
    attachmentHint: "JPG, PNG, WEBP, GIF or PDF, up to 5MB",
    attachmentChoose: "Choose file",
    attachmentChange: "Change file",
    attachmentRemove: "Remove",
    attachmentTooLarge: "File is too large. Max size is 5MB.",
    attachmentBadType: "Only image or PDF files are allowed.",
    submit: "Submit",
    thankYou:
      "Thank you for sharing the details. Our customer agent will connect with you shortly.",
    restart: "Start over",
    goBack: "Back to menu",
    // Main menu options - English
    menuQuickCommerce: "Quick commerce order",
    menuEcommerce: "E-commerce order",
    menuWebsite: "Website order",
    menuQueries: "Queries",
    // Query options - English
    queryNotReceived: "Product not received",
    queryDamaged: "Product damaged",
    queryMissed: "Product missed",
    queryOthers: "Others",
  },
  tamil: {
    welcome: "ராமஜெயம் அரிசி பிராண்டைப் பார்வையிட்டதற்கு நன்றி 🌾",
    chooseLanguage: "தயவுசெய்து உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
    mainMenu: "இன்று நாங்கள் எப்படி உதவலாம்?",
    quickCommercePrompt: "உங்கள் குயிக் காமர்ஸ் தளத்தைத் தேர்ந்தெடுக்கவும்:",
    ecommercePrompt: "உங்கள் இ-காமர்ஸ் தளத்தைத் தேர்ந்தெடுக்கவும்:",
    websiteRedirect: "எங்கள் இணையதளத்திற்கு அழைத்துச் செல்கிறோம்...",
    kpnTitle: "KPN Fresh இல் ராமஜெயம் பொருட்கள் 🌾",
    blinkitTitle: "Blinkit இல் ராமஜெயம் பொருட்கள் ⚡",
    amazonTitle: "Amazon இல் ராமஜெயம் பொருட்கள் 🛒",
    websiteTitle: "எங்கள் இணையதளத்தில் ராமஜெயம் பொருட்கள் 🌐",
    viewProduct: "பொருளைப் பார்க்க",
    moreProducts: "மேலும் பொருட்களைப் பார்க்க",
    queriesIntro: "சிரமத்திற்கு வருந்துகிறோம் 🙏\nஒரு விருப்பத்தைத் தேர்ந்தெடுக்கவும்:",
    formIntro: "தயவுசெய்து பின்வரும் விவரங்களைப் பகிரவும்:",
    platformLabel: "வாங்கிய தளம்",
    dateLabel: "ஆர்டர் செய்த தேதி",
    productLabel: "பொருள்",
    rateLabel: "விலை / அளவு",
    contactLabel: "தொடர்பு எண்",
    descriptionLabel: "உங்கள் பிரச்சனையை விவரிக்கவும்",
    attachmentLabel: "புகைப்படம் / PDF இணைக்கவும் (விருப்பத்தேர்வு)",
    attachmentHint: "JPG, PNG, WEBP, GIF அல்லது PDF, அதிகபட்சம் 5MB",
    attachmentChoose: "கோப்பைத் தேர்ந்தெடுக்கவும்",
    attachmentChange: "கோப்பை மாற்றவும்",
    attachmentRemove: "அகற்று",
    attachmentTooLarge: "கோப்பு மிகப் பெரியது. அதிகபட்சம் 5MB.",
    attachmentBadType: "படம் அல்லது PDF கோப்புகள் மட்டுமே அனுமதிக்கப்படும்.",
    submit: "சமர்ப்பிக்கவும்",
    thankYou:
      "விவரங்களைப் பகிர்ந்ததற்கு நன்றி. எங்கள் வாடிக்கையாளர் பிரதிநிதி விரைவில் உங்களைத் தொடர்பு கொள்வார்.",
    restart: "மீண்டும் தொடங்கு",
    goBack: "மெனுவிற்குத் திரும்பு",
    // Main menu options - Tamil
    menuQuickCommerce: "குயிக் காமர்ஸ் ஆர்டர்",
    menuEcommerce: "இ-காமர்ஸ் ஆர்டர்",
    menuWebsite: "இணையதள ஆர்டர்",
    menuQueries: "கேள்விகள்",
    // Query options - Tamil
    queryNotReceived: "பொருள் கிடைக்கவில்லை",
    queryDamaged: "பொருள் சேதமடைந்துள்ளது",
    queryMissed: "பொருள் தவறிவிட்டது",
    queryOthers: "மற்றவை",
  },
};

// The conversation tree. Each node id is referenced by "next" pointers.
// node types: "options" | "form" | "end"
export const FLOW = {
  welcome: {
    type: "options",
    text: (t) => t.welcome,
    options: [{ label: "Continue / தொடரவும்", next: "language" }],
  },

  language: {
    type: "options",
    text: (t) => t.chooseLanguage,
    // value sets the active language for all subsequent screens
    options: [
      { label: "1. English", value: "english", next: "main_menu" },
      { label: "2. Tamil", value: "tamil", next: "main_menu" },
    ],
  },

  main_menu: {
    type: "options",
    text: (t) => t.mainMenu,
    options: [
      { label: (t) => t.menuQuickCommerce, next: "quick_commerce" },
      { label: (t) => t.menuEcommerce, next: "ecommerce" },
      { label: (t) => t.menuWebsite, next: "website_order" },
      { label: (t) => t.menuQueries, next: "queries" },
    ],
  },

  quick_commerce: {
    type: "options",
    text: (t) => t.quickCommercePrompt,
    options: [
      { label: "KPN Fresh", next: "kpn_products" },
      { label: "Blinkit", next: "blinkit_products" },
    ],
  },

  kpn_products: {
    type: "products",
    text: (t) => t.kpnTitle,
    platform: "kpnfresh",
    accent: "kpn",
  },

  blinkit_products: {
    type: "products",
    text: (t) => t.blinkitTitle,
    platform: "blinkit",
    accent: "blinkit",
  },

  ecommerce: {
    type: "options",
    text: (t) => t.ecommercePrompt,
    options: [
      { label: "Amazon", next: "amazon_products" },
      { label: "Flipkart", link: LINKS.flipkart },
    ],
  },

  amazon_products: {
    type: "products",
    text: (t) => t.amazonTitle,
    platform: "amazon",
    accent: "amazon",
  },

  website_order: {
    type: "products",
    text: (t) => t.websiteTitle,
    platform: "website",
    accent: "website",
  },

  queries: {
    type: "options",
    text: (t) => t.queriesIntro,
    options: [
      {
        label: (t) => t.queryNotReceived,
        next: "query_form",
        queryType: "not_received",
      },
      {
        label: (t) => t.queryDamaged,
        next: "query_form",
        queryType: "damaged",
      },
      {
        label: (t) => t.queryMissed,
        next: "query_form",
        queryType: "missed",
      },
      {
        label: (t) => t.queryOthers,
        next: "query_form",
        queryType: "others",
      },
    ],
  },

  // Form node: fields collected then POSTed to the backend
  query_form: {
    type: "form",
    text: (t) => t.formIntro,
    fields: [
      { key: "platformPurchased", labelKey: "platformLabel" },
      { key: "orderedDate", labelKey: "dateLabel", inputType: "date" },
      { key: "product", labelKey: "productLabel" },
      { key: "rate", labelKey: "rateLabel" },
      { key: "contactNumber", labelKey: "contactLabel" },
      { key: "description", labelKey: "descriptionLabel", multiline: true },
      { key: "attachment", labelKey: "attachmentLabel", type: "file" },
    ],
    next: "thank_you",
  },

  thank_you: {
    type: "end",
    text: (t) => t.thankYou,
  },
};

export const START_NODE = "welcome";