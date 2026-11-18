/**
 * STORE CONFIGURATION - ÉLÉVATION ATELIER
 * -------------------------------------------------------------
 * This is the central configuration file for the store.
 * When your client provides their actual details, you can simply update
 * the values in this file without modifying the core HTML or logic.
 * -------------------------------------------------------------
 */

const STORE_CONFIG = {
  // Brand Identity
  brandName: "ÉLÉVATION ATELIER",
  brandSubtitle: "Contemporary Luxury & Timeless Apparel",
  tagline: "Curated Elegance for Modern Living",
  establishedYear: "2024",
  
  // Contact & Social Details
  supportEmail: "concierge@elevation-atelier.com",
  supportPhone: "+1 (800) 845-8930",
  address: "740 Fifth Avenue, Suite 1400, New York, NY 10019",
  socials: {
    instagram: "https://instagram.com",
    pinterest: "https://pinterest.com",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com"
  },

  // E-Commerce Settings
  currency: "$",
  currencyCode: "USD",
  currencies: [
    { code: "USD", symbol: "$", rate: 1.0 },
    { code: "EUR", symbol: "€", rate: 0.92 },
    { code: "GBP", symbol: "£", rate: 0.79 },
    { code: "INR", symbol: "₹", rate: 83.5 }
  ],
  freeShippingThreshold: 150, // Free shipping if cart exceeds this amount
  standardShippingFee: 15,
  expressShippingFee: 30,
  taxRate: 0.08, // 8% sales tax

  // Promo Codes & Discounts (Code: discount multiplier)
  promoCodes: {
    "ELEVATE20": { discount: 0.20, label: "20% Exclusive VIP Atelier Discount" },
    "WELCOME10": { discount: 0.10, label: "10% Welcome First Order Discount" },
    "VOGUE30": { discount: 0.30, label: "30% Seasonal Runway Privilege" }
  },

  // Announcements to display in the top announcement bar
  announcements: [
    "✨ Complimentary Global Express Delivery on orders over $150",
    "🌿 New Autumn/Winter Atelier Collection has arrived",
    "🎁 Use code ELEVATE20 for an exclusive 20% privilege off your order"
  ],

  // Brand Pillars / Value Propositions
  brandPillars: [
    {
      icon: "gem",
      title: "Artisanal Craftsmanship",
      description: "Meticulously handcrafted in limited batches by heritage European ateliers."
    },
    {
      icon: "leaf",
      title: "Sustainable & Ethical",
      description: "100% certified organic silks, Italian virgin wool, and zero-waste packaging."
    },
    {
      icon: "truck",
      title: "White Glove Delivery",
      description: "Insured express worldwide shipping with bespoke keepsake unboxing."
    },
    {
      icon: "rotate-ccw",
      title: "Complimentary 30-Day Returns",
      description: "Effortless door-to-door courier collections for worry-free sizing."
    }
  ]
};

// Expose configuration globally
window.STORE_CONFIG = STORE_CONFIG;
