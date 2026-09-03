// ---------------------------------------------------------------------------
// EDIT THIS FILE to change bot copy, add languages, or update redirect links.
// The whole conversation tree is data, not code, so no component changes are
// needed for most content updates.
//
// RESTRUCTURED FLOW (per updated requirements):
//   Language -> Business type (B2B / B2C)
//     B2B -> quotation message (website link)
//     B2C -> Main menu -> Cooking Instructions | Recipe Videos | Place Order | Query
// ---------------------------------------------------------------------------

// Marketplace / redirect links (fill in real URLs where placeholders exist)
export const LINKS = {
  flipkart: "https://www.flipkart.com/search?q=ramajeyam%20rice", // TODO: replace with real product link
  website: "https://www.ramajeyamrice.com", // TODO: replace with real website URL
  // Recipe video shown under "Recipe Videos" in the main menu.
  recipeVideo: "https://youtu.be/dJaujhqZcys?si=OANK3pjpPO7AJBHG",
  // B2B / bulk-order quotation request page.
  b2bQuotation: "https://www.ramajeyamrice.com/",
  // TODO: confirm the exact Instagram handle / campaign hashtag with the
  // client — the source note said this text was smudged/unclear. Using a
  // reasonable placeholder for now; update CLOSING_HASHTAG below once
  // confirmed.
};

const CLOSING_HASHTAG = "#RamajeyamRice";

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

// ---------------------------------------------------------------------------
// Cooking instruction copy (English + Tamil), built from the source content.
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Interactive step data. Each step now carries a real photo via `image`
// (the client's own step-by-step photography, hosted on Cloudinary) — no
// more drawn placeholder icons. `image` is required on every step; if one
// is ever missing, the UI falls back to a plain rice-bag illustration
// rather than breaking.
// ---------------------------------------------------------------------------
export const STEPS = {
  ponniCooker: {
    english: [
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788428631/Chatbot/step_01_jmlwnj.png",
        title: "Wash & Soak",
        desc: "Wash 1 cup of rice 2–3 times until the water runs clear, then soak for 20 minutes before cooking.",
      },
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788428630/Chatbot/step_02_qusyhg.png",
        title: "Add to Cooker",
        desc: "Add 1 cup soaked rice and 2 to 2.5 cups water into the pressure cooker.",
      },
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788428630/Chatbot/step_03_ji8eqf.png",
        title: "Cook 3 Whistles & Release",
        desc: "Close the lid with the weight on and cook on medium-high heat for 3 whistles. Turn off the heat and let the pressure release naturally for 10–15 minutes.",
      },
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788428631/Chatbot/step_04_o22ghx.png",
        title: "Fluff & Serve",
        desc: "Open the lid and fluff the rice gently with a fork.",
      },
    ],
    tamil: [
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788428631/Chatbot/step_01_jmlwnj.png",
        title: "கழுவி ஊறவைக்கவும்",
        desc: "1 கப் அரிசியை 2-3 முறை தண்ணீர் தெளிவாகும் வரை கழுவி, சமைப்பதற்கு முன் 20 நிமிடங்கள் ஊறவைக்கவும்.",
      },
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788428630/Chatbot/step_02_qusyhg.png",
        title: "குக்கரில் சேர்க்கவும்",
        desc: "குக்கரில் 1 கப் ஊறவைத்த அரிசிக்கு 2 முதல் 2.5 கப் தண்ணீர் சேர்க்கவும்.",
      },
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788428630/Chatbot/step_03_ji8eqf.png",
        title: "3 விசில் விட்டு பிரஷர் குறையவும்",
        desc: "குக்கர் மூடி மற்றும் விசில் போட்டு, மிதமான தீயில் 3 விசில் விடவும். அடுப்பை அணைத்து, தானாகவே பிரஷர் குறையும் வரை 10–15 நிமிடங்கள் காத்திருக்கவும்.",
      },
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788428631/Chatbot/step_04_o22ghx.png",
        title: "கிளறி பரிமாறவும்",
        desc: "மூடியைத் திறந்து, கரண்டியால் லேசாகக் கிளறி பரிமாறவும்.",
      },
    ],
  },
  ponniPotSteam: {
    english: [
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788429616/Chatbot/step_05_1_ziovfb.png",
        title: "Wash & Soak",
        desc: "Wash 1 cup of rice 2–3 times until the water runs clear, then soak for 20 minutes before cooking.",
      },
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788429616/Chatbot/step_06_2_pcdzio.png",
        title: "Boil Water",
        desc: "Boil 4 to 5 cups of water in a wide vessel.",
      },
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788429617/Chatbot/step_07_1_iyvgr2.png",
        title: "Add Rice & Cook Uncovered",
        desc: "Add the soaked rice to the boiling water and cook uncovered on medium-high heat for 18–25 minutes until the grains are soft.",
      },
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788429616/Chatbot/step_08_1_r1bupt.png",
        title: "Drain",
        desc: "Turn off the heat and drain the excess starch water using a colander or vessel lid.",
      },
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788429615/Chatbot/step_09_1_bc4cyt.png",
        title: "Rest & Serve",
        desc: "Cover with a lid and let it rest for 5 minutes before serving.",
      },
    ],
    tamil: [
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788429616/Chatbot/step_05_1_ziovfb.png",
        title: "கழுவி ஊறவைக்கவும்",
        desc: "1 கப் அரிசியை 2-3 முறை தண்ணீர் தெளிவாகும் வரை கழுவி, சமைப்பதற்கு முன் 20 நிமிடங்கள் ஊறவைக்கவும்.",
      },
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788429616/Chatbot/step_06_2_pcdzio.png",
        title: "தண்ணீர் கொதிக்க வையுங்கள்",
        desc: "ஒரு அகலமான பாத்திரத்தில் 4 முதல் 5 கப் தண்ணீர் ஊற்றி கொதிக்க வைக்கவும்.",
      },
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788429617/Chatbot/step_07_1_iyvgr2.png",
        title: "அரிசியைச் சேர்த்து மூடாமல் வேகவைக்கவும்",
        desc: "கொதிக்கும் தண்ணீரில் ஊறவைத்த அரிசியைச் சேர்த்து, மிதமான தீயில் 18–25 நிமிடங்கள் அரிசி நன்கு வேகும் வரை மூடாமல் கொதிக்க விடவும்.",
      },
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788429616/Chatbot/step_08_1_r1bupt.png",
        title: "வடிகட்டவும்",
        desc: "சாதம் வெந்ததும், தட்டை வைத்து கஞ்சியை வடிகட்டவும்.",
      },
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788429615/Chatbot/step_09_1_bc4cyt.png",
        title: "மூடி வைத்து பரிமாறவும்",
        desc: "பாத்திரத்தை மூடி 5 நிமிடங்கள் கழித்து பரிமாறவும்.",
      },
    ],
  },
  idlyRice: {
    english: [
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788429894/Chatbot/step_10_1_dv9qo3.png",
        title: "Ingredients (4:1 Ratio)",
        desc: "Ramajeyam Idli Rice 4 cups, whole urad dal 1 cup, fenugreek seeds 1 tsp, rock salt 1.5–2 tsp.",
      },
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788429892/Chatbot/step_11_1_jrbus6.png",
        title: "Wash & Soak Rice",
        desc: "Wash the idli rice 2–3 times until the water is clear, then soak for 4 to 5 hours.",
      },
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788435120/Chatbot/step_03_1_cbeo0s.png",
        title: "Soak Dal & Fenugreek",
        desc: "Wash urad dal and fenugreek seeds together and soak separately for 4 to 5 hours.",
      },
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788435356/Chatbot/step_04_2_xqjqo7.png",
        title: "Grind",
        desc: "Grind the urad dal first with ice-cold water for 20–25 minutes until fluffy, then grind the rice to a coarse, semolina-like texture.",
      },
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788435357/Chatbot/step_05_2_ffco9b.png",
        title: "Mix by Hand",
        desc: "Add rock salt and mix the rice and dal batters thoroughly by hand for 2–3 minutes. Keep the vessel only half full.",
      },
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788435356/Chatbot/step_06_4_tbkcke.png",
        title: "Ferment",
        desc: "Cover and let the batter ferment in a warm place for 8 to 12 hours.",
      },
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788435357/Chatbot/step_07_3_ysnh1l.png",
        title: "Steam Idlis or Make Dosas",
        desc: "Days 1–2: gently fold the batter and steam in idli plates for 10–12 minutes. Day 3+: thin the batter with a little water and spread it on a hot tawa for crispy dosas.",
      },
    ],
    tamil: [
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788429894/Chatbot/step_10_1_dv9qo3.png",
        title: "பொருட்கள் (4:1 அளவு)",
        desc: "ராமஜெயம் இட்லி அரிசி 4 கப், முழு உளுந்தம்பருப்பு 1 கப், வெந்தயம் 1 தேக்கரண்டி, கல் உப்பு 1.5–2 தேக்கரண்டி.",
      },
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788429892/Chatbot/step_11_1_jrbus6.png",
        title: "அரிசியைக் கழுவி ஊறவைக்கவும்",
        desc: "இட்லி அரிசியை 2-3 முறை தண்ணீர் தெளிவாகும் வரை கழுவி, 4 முதல் 5 மணி நேரம் ஊறவைக்கவும்.",
      },
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788435120/Chatbot/step_03_1_cbeo0s.png",
        title: "பருப்பு & வெந்தயம் ஊறவைக்கவும்",
        desc: "உளுந்தம்பருப்பு மற்றும் வெந்தயத்தை ஒன்றாகக் கழுவி, தனி பாத்திரத்தில் 4 முதல் 5 மணி நேரம் ஊறவைக்கவும்.",
      },
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788435356/Chatbot/step_04_2_xqjqo7.png",
        title: "அரைக்கவும்",
        desc: "முதலில் உளுந்தை ஜில்லென்ற தண்ணீருடன் 20-25 நிமிடங்கள் மிருதுவாக அரைத்து, பின் அரிசியை கொரகொரப்பாக அரைக்கவும்.",
      },
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788435357/Chatbot/step_05_2_ffco9b.png",
        title: "கையால் கலக்கவும்",
        desc: "கல் உப்பு சேர்த்து, சுத்தமான கைகளால் 2-3 நிமிடங்கள் நன்றாக கலக்கவும். பாத்திரத்தில் பாதி அளவு மட்டுமே மாவு இருக்க வேண்டும்.",
      },
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788435356/Chatbot/step_06_4_tbkcke.png",
        title: "புளிக்க வைக்கவும்",
        desc: "மூடி, வெதுவெதுப்பான இடத்தில் 8 முதல் 12 மணி நேரம் புளிக்க விடவும்.",
      },
      {
        image:
          "https://res.cloudinary.com/ds4i8pujs/image/upload/v1788435357/Chatbot/step_07_3_ysnh1l.png",
        title: "இட்லி வேகவைக்கவும் அல்லது தோசை சுடவும்",
        desc: "1-2 நாட்கள்: மாவை லேசாகக் கிளறி, இட்லி தட்டில் ஊற்றி 10-12 நிமிடங்கள் வேகவைக்கவும். 3 நாட்களுக்குப் பிறகு: சிறிது தண்ணீர் சேர்த்து மாவை தளரக் கரைத்து, தோசைக் கல்லில் ஊற்றி சுடவும்.",
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
    placeOrderPrompt: "How would you like to place your order?",
    quickCommerceLabel: "Quick commerce",
    ecommerceLabel: "E-commerce",
    websiteLabel: "Website",
    websiteRedirect: "Taking you to our website to place your order...",
    kpnTitle: "Ramajeyam products on KPN Fresh 🌾",
    blinkitTitle: "Ramajeyam products on Blinkit ⚡",
    amazonTitle: "Ramajeyam products on Amazon 🛒",
    websiteTitle: "Ramajeyam products on our website 🌐",
    viewProduct: "View product",
    moreProducts: "See more products",
    formIntro: "Please share the following details:",
    formTitle: "Query details",
    nameLabel: "Name",
    contactLabel: "Contact number",
    problemLabel: "Problem",
    attachmentLabel: "Attach a photo (optional)",
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
    // Business type (B2B / B2C) - English
    businessTypePrompt: "Are you ordering for business (bulk) or personal use?",
    menuB2B: "B2B (Bulk / Business Order)",
    menuB2C: "B2C (Individual Order)",
    b2bMessage:
      "For bulk and business orders, please visit our website to get a quotation 🙏",
    b2bCta: "Get Quotation on our Website",
    // Main menu options - English
    menuCookingInstructions: "Cooking instructions",
    menuRecipeVideos: "Recipe videos",
    menuPlaceOrder: "Place order",
    menuQuery: "Query",
    // Cooking instructions - English
    riceTypePrompt: "Please choose the rice type:",
    riceTypePonni: "Ponni Rice",
    riceTypeIdly: "Idly Rice",
    ponniMethodPrompt: "How would you like to cook it?",
    methodCooker: "Cooker (Pressure Cooker)",
    methodPotSteam: "Pot Steam (Open Pan)",
    stepsIntro: "Here's how to make it, step by step 👇",
    closingTitle: "You're Done! 🎉",
    closingMessage: `Thank you for connecting with us! 🌾 Once you complete cooking, capture a pic with the Ramajeyam bag and tag us on Instagram with ${CLOSING_HASHTAG} for a chance to WIN A SURPRISE GIFT! 🎁`,
    stepCounter: "Step {current} of {total}",
    stepNext: "Next",
    stepBack: "Back",
    stepFinish: "Finish",
    // Recipe video - English
    recipeVideoIntro: "Here's our recipe video for you 🎥",
    watchVideoBtn: "▶ Watch on YouTube",
  },
  tamil: {
    welcome: "ராமஜெயம் அரிசி பிராண்டைப் பார்வையிட்டதற்கு நன்றி 🌾",
    chooseLanguage: "தயவுசெய்து உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
    mainMenu: "இன்று நாங்கள் எப்படி உதவலாம்?",
    quickCommercePrompt: "உங்கள் குயிக் காமர்ஸ் தளத்தைத் தேர்ந்தெடுக்கவும்:",
    ecommercePrompt: "உங்கள் இ-காமர்ஸ் தளத்தைத் தேர்ந்தெடுக்கவும்:",
    placeOrderPrompt: "நீங்கள் எப்படி ஆர்டர் செய்ய விரும்புகிறீர்கள்?",
    quickCommerceLabel: "குயிக் காமர்ஸ்",
    ecommerceLabel: "இ-காமர்ஸ்",
    websiteLabel: "இணையதளம்",
    websiteRedirect: "எங்கள் இணையதளத்திற்கு அழைத்துச் செல்கிறோம்...",
    kpnTitle: "KPN Fresh இல் ராமஜெயம் பொருட்கள் 🌾",
    blinkitTitle: "Blinkit இல் ராமஜெயம் பொருட்கள் ⚡",
    amazonTitle: "Amazon இல் ராமஜெயம் பொருட்கள் 🛒",
    websiteTitle: "எங்கள் இணையதளத்தில் ராமஜெயம் பொருட்கள் 🌐",
    viewProduct: "பொருளைப் பார்க்க",
    moreProducts: "மேலும் பொருட்களைப் பார்க்க",
    formIntro: "தயவுசெய்து பின்வரும் விவரங்களைப் பகிரவும்:",
    formTitle: "கேள்வி விவரங்கள்",
    nameLabel: "பெயர்",
    contactLabel: "தொடர்பு எண்",
    problemLabel: "பிரச்சனை",
    attachmentLabel: "புகைப்படம் இணைக்கவும் (விருப்பத்தேர்வு)",
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
    // Business type (B2B / B2C) - Tamil
    businessTypePrompt:
      "நீங்கள் வணிக (மொத்த) தேவைக்கா அல்லது சொந்த பயன்பாட்டுக்கா ஆர்டர் செய்கிறீர்கள்?",
    menuB2B: "B2B (மொத்த / வணிக ஆர்டர்)",
    menuB2C: "B2C (தனிநபர் ஆர்டர்)",
    b2bMessage:
      "மொத்த மற்றும் வணிக ஆர்டர்களுக்கு, மேற்கோள் (quotation) பெற எங்கள் இணையதளத்தைப் பார்வையிடவும் 🙏",
    b2bCta: "இணையதளத்தில் மேற்கோள் பெறவும்",
    // Main menu options - Tamil
    menuCookingInstructions: "சமையல் முறை விவரங்கள்",
    menuRecipeVideos: "செய்முறை வீடியோக்கள்",
    menuPlaceOrder: "ஆர்டர் செய்யுங்கள்",
    menuQuery: "கேள்வி",
    // Cooking instructions - Tamil
    riceTypePrompt: "அரிசி வகையைத் தேர்ந்தெடுக்கவும்:",
    riceTypePonni: "பொன்னி அரிசி",
    riceTypeIdly: "இட்லி அரிசி",
    ponniMethodPrompt: "எந்த முறையில் சமைக்க விரும்புகிறீர்கள்?",
    methodCooker: "குக்கர் (பிரஷர் குக்கர்)",
    methodPotSteam: "பாத்திரத்தில் வடிக்கும் முறை",
    stepsIntro: "படிப்படியாக செய்முறையை பாருங்கள் 👇",
    closingTitle: "முடிந்தது! 🎉",
    closingMessage: `எங்களுடன் இணைந்ததற்கு நன்றி! 🌾 சமையலை முடித்தவுடன், ராமஜெயம் பையுடன் ஒரு புகைப்படம் எடுத்து, Instagram-இல் ${CLOSING_HASHTAG} என டேக் செய்து ஒரு சர்ப்ரைஸ் பரிசை வெல்லும் வாய்ப்பைப் பெறுங்கள்! 🎁`,
    stepCounter: "படி {current} / {total}",
    stepNext: "அடுத்து",
    stepBack: "பின்செல்",
    stepFinish: "முடி",
    // Recipe video - Tamil
    recipeVideoIntro: "இதோ எங்கள் செய்முறை வீடியோ 🎥",
    watchVideoBtn: "யூடியூபில் பார்க்க",
  },
};

// The conversation tree. Each node id is referenced by "next" pointers.
// node types: "options" | "products" | "steps" | "form" | "end"
// "steps" renders an interactive, photo-illustrated step-by-step card
// (see STEPS above and the steps renderer in Chatbot.jsx).
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
      { label: "1. English", value: "english", next: "business_type" },
      { label: "2. Tamil", value: "tamil", next: "business_type" },
    ],
  },

  // Fork: bulk/business buyers are shown a quotation message (website
  // link); individual buyers continue into the normal ordering / support
  // flow via main_menu. Uses the existing "options" node type only — the
  // single option's `link` field opens the website in a new tab without
  // navigating away from this screen (same behaviour already used for the
  // Flipkart / recipe-video links below).
  business_type: {
    type: "options",
    text: (t) => t.businessTypePrompt,
    options: [
      { label: (t) => t.menuB2B, next: "b2b_info" },
      { label: (t) => t.menuB2C, next: "main_menu" },
    ],
  },

  b2b_info: {
    type: "options",
    text: (t) => t.b2bMessage,
    options: [
      { label: (t) => t.b2bCta, link: LINKS.b2bQuotation },
      { label: (t) => t.goBack, next: "business_type" },
    ],
  },

  main_menu: {
    type: "options",
    text: (t) => t.mainMenu,
    options: [
      { label: (t) => t.menuCookingInstructions, next: "cooking_instructions" },
      { label: (t) => t.menuRecipeVideos, next: "recipe_video" },
      { label: (t) => t.menuPlaceOrder, next: "place_order" },
      { label: (t) => t.menuQuery, next: "query_form" },
    ],
  },

  // ---------------------------------------------------------------------
  // Flow 1: Cooking Instructions
  // ---------------------------------------------------------------------
  cooking_instructions: {
    type: "options",
    text: (t) => t.riceTypePrompt,
    options: [
      { label: (t) => t.riceTypePonni, next: "ponni_method" },
      { label: (t) => t.riceTypeIdly, next: "idly_rice_result" },
    ],
  },

  ponni_method: {
    type: "options",
    text: (t) => t.ponniMethodPrompt,
    options: [
      { label: (t) => t.methodCooker, next: "ponni_cooker_result" },
      { label: (t) => t.methodPotSteam, next: "ponni_pot_steam_result" },
    ],
  },

  ponni_cooker_result: {
    type: "steps",
    text: (t) => t.stepsIntro,
    stepsKey: "ponniCooker",
    goBack: "main_menu",
  },

  ponni_pot_steam_result: {
    type: "steps",
    text: (t) => t.stepsIntro,
    stepsKey: "ponniPotSteam",
    goBack: "main_menu",
  },

  idly_rice_result: {
    type: "steps",
    text: (t) => t.stepsIntro,
    stepsKey: "idlyRice",
    goBack: "main_menu",
  },

  // ---------------------------------------------------------------------
  // Flow 2: Recipe Video
  // ---------------------------------------------------------------------
  recipe_video: {
    type: "options",
    text: (t) => t.recipeVideoIntro,
    options: [
      { label: (t) => t.watchVideoBtn, link: LINKS.recipeVideo },
      { label: (t) => t.goBack, next: "main_menu" },
    ],
  },

  // ---------------------------------------------------------------------
  // Flow 3: Place Order (reuses the existing product-catalogue structure)
  // ---------------------------------------------------------------------
  place_order: {
    type: "options",
    text: (t) => t.placeOrderPrompt,
    options: [
      { label: (t) => t.quickCommerceLabel, next: "quick_commerce" },
      { label: (t) => t.ecommerceLabel, next: "ecommerce" },
      { label: (t) => t.websiteLabel, next: "website_order" },
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

  // ---------------------------------------------------------------------
  // Flow 4: Query — only Name / Contact number / Problem / Image upload
  // ---------------------------------------------------------------------
  query_form: {
    type: "form",
    text: (t) => t.formIntro,
    fields: [
      { key: "name", labelKey: "nameLabel" },
      { key: "contactNumber", labelKey: "contactLabel", inputType: "tel" },
      { key: "description", labelKey: "problemLabel", multiline: true },
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