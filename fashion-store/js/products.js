/**
 * PRODUCT CATALOG - ÉLÉVATION ATELIER
 * -------------------------------------------------------------
 * Curated catalog of contemporary luxury garments and accessories.
 * Easily replace or add products here when your client provides
 * their inventory list.
 * -------------------------------------------------------------
 */

const PRODUCTS_DATA = [
  {
    id: "prod-001",
    name: "The Florence Cashmere Wrap Coat",
    category: "outerwear",
    subCategory: "Coats & Jackets",
    price: 495,
    originalPrice: 620,
    rating: 4.9,
    reviewCount: 38,
    badge: "Bestseller",
    isBestseller: true,
    isNew: false,
    featured: true,
    stock: 8,
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce667883?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Oatmeal Camel", hex: "#C2A889" },
      { name: "Midnight Charcoal", hex: "#22252A" },
      { name: "Alabaster Cream", hex: "#EBE6DD" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "An iconic oversized silhouette tailored from 100% double-faced Italian cashmere wool. Features relaxed dropped shoulders, deep patch pockets, and a wide matching sash belt that flatters effortlessly.",
    fabricCare: "100% Mongolian Cashmere Wool. Specialist dry clean only. Store on shaped wooden hanger."
  },
  {
    id: "prod-002",
    name: "Aura Bias-Cut Silk Slip Gown",
    category: "women",
    subCategory: "Dresses & Evening",
    price: 340,
    originalPrice: 340,
    rating: 5.0,
    reviewCount: 52,
    badge: "New Arrival",
    isBestseller: true,
    isNew: true,
    featured: true,
    stock: 12,
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Champagne Pearl", hex: "#E7DCBF" },
      { name: "Noir Onyx", hex: "#111111" },
      { name: "Bordeaux Wine", hex: "#581825" }
    ],
    sizes: ["XS", "S", "M", "L"],
    description: "Sculpted on the bias for an alluring, fluid drape that clings gracefully to natural contours. Crafted in heavyweight 22-momme Mulberry silk with delicate adjustable rouleau straps and a cowl neckline.",
    fabricCare: "100% Grade 6A Mulberry Silk. Gentle hand wash in cold water with silk detergent or dry clean."
  },
  {
    id: "prod-003",
    name: "Monaco Double-Breasted Wool Blazer",
    category: "men",
    subCategory: "Tailoring & Suiting",
    price: 420,
    originalPrice: 510,
    rating: 4.8,
    reviewCount: 29,
    badge: "Curator's Pick",
    isBestseller: false,
    isNew: true,
    featured: true,
    stock: 6,
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Savile Navy", hex: "#1C2833" },
      { name: "Pebble Grey", hex: "#626567" },
      { name: "Tobacco Brown", hex: "#4A3525" }
    ],
    sizes: ["38R", "40R", "42R", "44R"],
    description: "Sharp architectural shoulders and a modern relaxed cut. Precision-tailored in Biella, Italy using Super 130s virgin wool, framed with horn buttons, peak lapels, and double back vents.",
    fabricCare: "100% Italian Super 130s Virgin Wool. Bemberg cupro lining. Dry clean only."
  },
  {
    id: "prod-004",
    name: "L'Atelier Structured Leather Tote",
    category: "accessories",
    subCategory: "Leather Goods",
    price: 385,
    originalPrice: 450,
    rating: 4.9,
    reviewCount: 44,
    badge: "Limited Edition",
    isBestseller: true,
    isNew: false,
    featured: true,
    stock: 5,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Cognac Tan", hex: "#8B4513" },
      { name: "Obsidian Black", hex: "#1C1C1C" },
      { name: "Warm Taupe", hex: "#9E8B7D" }
    ],
    sizes: ["One Size"],
    description: "An architectural everyday tote designed to hold up to a 15-inch laptop with room to spare. Hand-stitched full-grain calfskin leather with polished 24k gold-plated hardware and protective metal feet.",
    fabricCare: "Full-Grain Tuscan Calfskin. Condition with leather balm twice annually. Includes dust bag."
  },
  {
    id: "prod-005",
    name: "The Como Pleated Wide-Leg Trouser",
    category: "women",
    subCategory: "Trousers & Pants",
    price: 260,
    originalPrice: 260,
    rating: 4.7,
    reviewCount: 31,
    badge: "Trending",
    isBestseller: false,
    isNew: true,
    featured: false,
    stock: 14,
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Ivory Ecru", hex: "#F3EDE2" },
      { name: "Sandstone", hex: "#BA9F84" },
      { name: "Jet Black", hex: "#111111" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "High-waisted tailoring with inverted double front pleats that release into an elongating wide leg. Cut in fluid tropical wool blend that retains crisp creases all day without wrinkling.",
    fabricCare: "70% Virgin Wool, 28% Lyocell, 2% Elastane. Dry clean or cold wool wash."
  },
  {
    id: "prod-006",
    name: "Milano Chunky Ribbed Mockneck",
    category: "outerwear",
    subCategory: "Knitwear",
    price: 290,
    originalPrice: 350,
    rating: 4.9,
    reviewCount: 67,
    badge: "Sale",
    isBestseller: true,
    isNew: false,
    featured: false,
    stock: 9,
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Almond Milk", hex: "#E6DFD3" },
      { name: "Forest Moss", hex: "#2C3E2D" },
      { name: "Slate Blue", hex: "#4B6584" }
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Sumptuously plush and tactile, knit in Northern Scotland using 6-ply pure lambswool. Designed with an effortless drop shoulder, sculpted mock collar, and thick ribbed cuffs.",
    fabricCare: "100% Extra-Fine Lambswool. Hand wash in cool water. Reshape and dry flat."
  },
  {
    id: "prod-007",
    name: "Sorrento Relaxed Linen Camp Shirt",
    category: "men",
    subCategory: "Shirts",
    price: 185,
    originalPrice: 185,
    rating: 4.6,
    reviewCount: 22,
    badge: "Summer Essential",
    isBestseller: false,
    isNew: true,
    featured: false,
    stock: 18,
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Mediterranean White", hex: "#FAF8F5" },
      { name: "Olive Sage", hex: "#7D8C71" },
      { name: "Dusty Terracotta", hex: "#C07258" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Breezy and effortlessly sophisticated. Woven from breathable Normandy flax linen, garment-washed for a soft vintage feel. Finished with mother-of-pearl buttons and a convertible Cuban collar.",
    fabricCare: "100% European Flax Linen. Machine wash gentle on cold. Line dry or tumble dry low."
  },
  {
    id: "prod-008",
    name: "The Aurelia Hammered Gold Cuff",
    category: "accessories",
    subCategory: "Jewellery",
    price: 210,
    originalPrice: 250,
    rating: 5.0,
    reviewCount: 19,
    badge: "Artisanal",
    isBestseller: false,
    isNew: true,
    featured: false,
    stock: 7,
    images: [
      "https://images.unsplash.com/photo-1611591475879-119c8f0b797b?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "24k Yellow Vermeil", hex: "#D4AF37" },
      { name: "Sterling Silver", hex: "#C0C0C0" }
    ],
    sizes: ["Standard Adjustable"],
    description: "Individually hand-hammered by Greek silversmiths to capture the light at every angle. Thick 24-karat gold vermeil over recycled 925 sterling silver with a softly curved silhouette.",
    fabricCare: "24k Gold Vermeil (3.0 microns) over 925 Sterling Silver. Polish with microfiber cloth."
  },
  {
    id: "prod-009",
    name: "The Kensington Trench Coat",
    category: "outerwear",
    subCategory: "Coats & Jackets",
    price: 520,
    originalPrice: 650,
    rating: 4.9,
    reviewCount: 45,
    badge: "Heritage",
    isBestseller: true,
    isNew: false,
    featured: true,
    stock: 10,
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Classic Honey", hex: "#D2B48C" },
      { name: "Deep Ink", hex: "#0E1821" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "The definitive trans-seasonal outerwear piece. Crafted from weatherproof high-density cotton gabardine with traditional gun flaps, D-ring storm belt, and horn buckle cuffs.",
    fabricCare: "100% Showerproof Cotton Gabardine. Cupro lining. Wipe clean or dry clean."
  },
  {
    id: "prod-010",
    name: "Atelier Sculpted Poplin Shirt",
    category: "women",
    subCategory: "Tops & Blouses",
    price: 215,
    originalPrice: 215,
    rating: 4.8,
    reviewCount: 34,
    badge: "Essential",
    isBestseller: false,
    isNew: true,
    featured: false,
    stock: 16,
    images: [
      "https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Crisp Optical White", hex: "#FFFFFF" },
      { name: "Sky Pinstripe", hex: "#A8C0D8" },
      { name: "Pale Pink", hex: "#F3D8D8" }
    ],
    sizes: ["XS", "S", "M", "L"],
    description: "The classic white shirt reimagined with architectural volume. Features exaggerated turn-back French cuffs, a curved high-low hemline, and hidden placket mother-of-pearl buttons.",
    fabricCare: "100% GOTS Certified Organic Compact Cotton. Warm machine wash. Press with steam."
  },
  {
    id: "prod-011",
    name: "Ravello Pleated Linen Chino",
    category: "men",
    subCategory: "Trousers & Pants",
    price: 220,
    originalPrice: 260,
    rating: 4.7,
    reviewCount: 18,
    badge: "Sale",
    isBestseller: false,
    isNew: false,
    featured: false,
    stock: 11,
    images: [
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Sand Dune", hex: "#D6C7B2" },
      { name: "Navy Blazer", hex: "#1A2530" },
      { name: "Olive Drab", hex: "#556B2F" }
    ],
    sizes: ["30W", "32W", "34W", "36W"],
    description: "Relaxed tailored cut with double reverse pleats and side tab adjusters that eliminate the need for a belt. Woven in Biella from premium Belgian flax blended with soft cotton.",
    fabricCare: "55% Linen, 45% Cotton. Machine wash delicate. Iron while damp."
  },
  {
    id: "prod-012",
    name: "The Riviera Woven Leather Mule",
    category: "accessories",
    subCategory: "Footwear",
    price: 310,
    originalPrice: 310,
    rating: 4.9,
    reviewCount: 26,
    badge: "New Arrival",
    isBestseller: true,
    isNew: true,
    featured: true,
    stock: 8,
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Espresso Brown", hex: "#3D2B1F" },
      { name: "Cream Butter", hex: "#F3ECD8" }
    ],
    sizes: ["36 EU", "37 EU", "38 EU", "39 EU", "40 EU", "41 EU"],
    description: "Intricately hand-woven intrecciato leather upper with a sculpted 45mm block heel and memory foam cushioned insole. Engineered for effortless day-to-evening transitions.",
    fabricCare: "100% Hand-woven Nappa Lambskin. Leather sole. Store in complimentary shoe dust bag."
  },
  {
    id: "prod-013",
    name: "Geneva Cashmere Turtleneck Sweater",
    category: "men",
    subCategory: "Knitwear",
    price: 340,
    originalPrice: 390,
    rating: 4.9,
    reviewCount: 33,
    badge: "Bestseller",
    isBestseller: true,
    isNew: false,
    featured: false,
    stock: 7,
    images: [
      "https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Anthracite", hex: "#2E3134" },
      { name: "Camel", hex: "#B8860B" },
      { name: "Winter White", hex: "#F5F5F0" }
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Exquisitely soft 12-gauge knit in pure Inner Mongolian cashmere. Seamless tubular neck construction that folds cleanly without pinching, complemented by ribbed hems and cuffs.",
    fabricCare: "100% Sustainable Cashmere. Gentle hand wash with wool shampoo. Dry flat."
  },
  {
    id: "prod-014",
    name: "Sienna Silk Crepe Midi Skirt",
    category: "women",
    subCategory: "Skirts",
    price: 245,
    originalPrice: 295,
    rating: 4.8,
    reviewCount: 41,
    badge: "Sale",
    isBestseller: false,
    isNew: false,
    featured: false,
    stock: 13,
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Rust Terracotta", hex: "#A0522D" },
      { name: "Champagne", hex: "#F7E7CE" },
      { name: "Deep Emerald", hex: "#043927" }
    ],
    sizes: ["XS", "S", "M", "L"],
    description: "Flowing midi skirt cut on the bias from matte silk crepe de chine. Sits at the natural waist with a comfortable hidden elastic waistband and rolled baby hem.",
    fabricCare: "100% Silk Crepe de Chine. Hand wash cold or dry clean. Low iron on reverse."
  },
  {
    id: "prod-015",
    name: "Verona Minimalist Leather Belt",
    category: "accessories",
    subCategory: "Belts",
    price: 135,
    originalPrice: 135,
    rating: 4.7,
    reviewCount: 28,
    badge: "Curator's Pick",
    isBestseller: false,
    isNew: true,
    featured: false,
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Calf Black", hex: "#0D0D0D" },
      { name: "Saddle Tan", hex: "#8A5229" }
    ],
    sizes: ["75 cm", "85 cm", "95 cm", "105 cm"],
    description: "Handcrafted in Florence from vegetable-tanned French calfskin that develops an authentic patina over time. Features a bespoke brushed brass buckle with hand-painted beveled edges.",
    fabricCare: "Vegetable-tanned full grain leather. Solid brass hardware."
  },
  {
    id: "prod-016",
    name: "The Zurich Shearling Flight Jacket",
    category: "outerwear",
    subCategory: "Coats & Jackets",
    price: 780,
    originalPrice: 950,
    rating: 5.0,
    reviewCount: 15,
    badge: "Limited Edition",
    isBestseller: false,
    isNew: true,
    featured: true,
    stock: 4,
    images: [
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { name: "Aged Espresso", hex: "#3E2723" }
    ],
    sizes: ["38R", "40R", "42R", "44R"],
    description: "A showpiece investment garment. Crafted from heavyweight Spanish Merino shearling with a crackled vintage-finish exterior and dense, cloud-soft wool fleece interior. Heavy-duty two-way Riri zippers.",
    fabricCare: "100% Spanish Merino Lamb Shearling. Specialist leather/shearling clean only."
  }
];

// Expose products globally
window.PRODUCTS_DATA = PRODUCTS_DATA;
