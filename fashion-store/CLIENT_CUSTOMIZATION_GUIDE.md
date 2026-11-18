# Client Customization Guide — ÉLÉVATION ATELIER

This guide explains how to customize this website when your client provides their final brand details, products, images, and pricing.

All client-specific configurations are cleanly separated from the website's engine so you never have to break any layouts or code.

---

## 1. Changing Brand Name, Contact, & Settings

Open `js/store-config.js` in any text editor. You can change:

```javascript
const STORE_CONFIG = {
  // 1. Update Brand Names
  brandName: "YOUR CLIENT'S BRAND NAME",
  brandSubtitle: "Tagline or Brand Slogan",
  
  // 2. Contact Details & Social Links
  supportEmail: "client@brand.com",
  supportPhone: "+1 (555) 000-0000",
  address: "Your Client Store Address, City, Country",
  socials: {
    instagram: "https://instagram.com/clienthandle",
    pinterest: "https://pinterest.com/clienthandle",
    facebook: "https://facebook.com/clienthandle"
  },

  // 3. Currency & Shipping Rules
  currency: "$", // or "£", "€", "₹"
  currencyCode: "USD",
  freeShippingThreshold: 150, // Amount to unlock free shipping
  standardShippingFee: 15,
  expressShippingFee: 30,
  taxRate: 0.08, // 8% sales tax

  // 4. Promo Discount Codes
  promoCodes: {
    "CLIENT20": { discount: 0.20, label: "20% Exclusive Discount" },
    "WELCOME10": { discount: 0.10, label: "10% Welcome Discount" }
  },

  // 5. Rotating Announcements at the very top bar
  announcements: [
    "✨ Free shipping on orders over $150",
    "🌿 New Collection Available Now",
    "🎁 Use code CLIENT20 for 20% off"
  ]
};
```

---

## 2. Adding & Updating Products

Open `js/products.js`. Each product is an object in the `PRODUCTS_DATA` array.

### To Edit an Existing Product:
Simply update the fields:
- `name`: Product title (e.g., `"Silk Slip Dress"`)
- `category`: `"women"`, `"men"`, `"outerwear"`, or `"accessories"`
- `price`: Retail price (e.g., `250`)
- `originalPrice`: Original price if on sale (e.g., `320`)
- `badge`: `"New"`, `"Bestseller"`, `"Sale"`, etc.
- `images`: Array of image URLs or local files (e.g., `["assets/dress-front.jpg", "assets/dress-back.jpg"]`)
- `colors`: Array of colors with name and hex code:
  ```javascript
  colors: [
    { name: "Emerald Green", hex: "#043927" },
    { name: "Onyx Black", hex: "#111111" }
  ]
  ```
- `sizes`: Array of sizes (e.g., `["XS", "S", "M", "L", "XL"]`)
- `description`: Product marketing text
- `fabricCare`: Material composition and wash instructions

### To Add a New Product:
Copy and paste this template at the bottom of the array in `js/products.js`:
```javascript
{
  id: "prod-017",
  name: "New Luxury Dress",
  category: "women",
  subCategory: "Dresses",
  price: 290,
  originalPrice: 290,
  rating: 5.0,
  reviewCount: 1,
  badge: "New Arrival",
  isBestseller: false,
  isNew: true,
  featured: true,
  stock: 10,
  images: [
    "https://images.unsplash.com/photo-example-1...",
    "https://images.unsplash.com/photo-example-2..."
  ],
  colors: [
    { name: "Noir", hex: "#000000" }
  ],
  sizes: ["XS", "S", "M", "L"],
  description: "Exquisite tailor finish with premium fabric.",
  fabricCare: "100% Organic Silk. Dry clean only."
}
```

---

## 3. Changing Photos & Banner Images

- **Hero Banner Image**: Open `index.html` and search for `<section class="relative min-h-[85vh]`. Replace the `src` attribute of the `<img>` tag with your client's runway image or banner.
- **Editorial Banner Image**: Search for `id="editorial-lookbook"` in `index.html` and update the background image URL.
- **Local Photos**: You can save image files inside the `assets/` folder (e.g. `assets/hero.jpg`) and set `src="assets/hero.jpg"`.

---

## 4. Connecting Live Payments (When Ready)

Currently, the store includes a high-end **checkout simulation** and **printable invoice generator** that works out-of-the-box for client demonstrations.

When your client is ready to accept live transactions, you can easily integrate:
- **Stripe Checkout**: Embed a Stripe payment link or Stripe Elements in `js/checkout.js`.
- **PayPal Commerce**: Add the PayPal JS SDK button.
- **Razorpay**: Add the Razorpay checkout modal for India/global payments.
- **Shopify Buy Button**: Embed direct checkout buttons if the client already has a Shopify catalog.
