/**
 * QUICK VIEW MODAL - ÉLÉVATION ATELIER
 * -------------------------------------------------------------
 * Provides an interactive modal for examining product details,
 * switching image angles, choosing sizes & colors, and adding to bag.
 * -------------------------------------------------------------
 */

class QuickViewManager {
  constructor() {
    this.modal = document.getElementById("quickview-modal");
    this.currentProduct = null;
    this.selectedSize = null;
    this.selectedColor = null;
    this.quantity = 1;
    this.bindEvents();
  }

  bindEvents() {
    const closeBtns = document.querySelectorAll("[data-quickview-close]");
    closeBtns.forEach(btn => {
      btn.addEventListener("click", () => this.close());
    });

    if (this.modal) {
      this.modal.addEventListener("click", (e) => {
        if (e.target === this.modal) {
          this.close();
        }
      });
    }
  }

  open(productId) {
    const product = window.PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    this.currentProduct = product;
    this.selectedSize = product.sizes[0] || "Standard";
    this.selectedColor = product.colors[0] ? product.colors[0].name : "Standard";
    this.quantity = 1;

    this.render();

    if (this.modal) {
      this.modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  close() {
    if (this.modal) {
      this.modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  setPrimaryImage(url) {
    const imgEl = document.getElementById("qv-main-image");
    if (imgEl) {
      imgEl.src = url;
    }
  }

  setSize(size) {
    this.selectedSize = size;
    const sizeBtns = document.querySelectorAll(".qv-size-btn");
    sizeBtns.forEach(btn => {
      if (btn.getAttribute("data-size") === size) {
        btn.classList.add("bg-[#121212]", "text-white", "border-[#121212]");
        btn.classList.remove("bg-white", "text-black", "border-gray-200");
      } else {
        btn.classList.remove("bg-[#121212]", "text-white", "border-[#121212]");
        btn.classList.add("bg-white", "text-black", "border-gray-200");
      }
    });
  }

  setColor(colorName) {
    this.selectedColor = colorName;
    const colorLabel = document.getElementById("qv-color-label");
    if (colorLabel) colorLabel.textContent = colorName;

    const swatches = document.querySelectorAll(".qv-color-swatch");
    swatches.forEach(swatch => {
      if (swatch.getAttribute("data-color") === colorName) {
        swatch.classList.add("active");
      } else {
        swatch.classList.remove("active");
      }
    });
  }

  adjustQuantity(delta) {
    this.quantity = Math.max(1, this.quantity + delta);
    const qtyEl = document.getElementById("qv-qty-val");
    if (qtyEl) qtyEl.textContent = this.quantity;
  }

  addToBag() {
    if (!this.currentProduct) return;
    window.cartManager.addItem(
      this.currentProduct.id,
      this.selectedSize,
      this.selectedColor,
      this.quantity
    );
    this.close();
  }

  render() {
    const p = this.currentProduct;
    if (!p) return;

    const currency = window.STORE_CONFIG.currency || "$";

    // Set Main Image & Thumbnails
    const mainImgEl = document.getElementById("qv-main-image");
    if (mainImgEl) mainImgEl.src = p.images[0];

    const thumbsContainer = document.getElementById("qv-thumbnails");
    if (thumbsContainer) {
      thumbsContainer.innerHTML = p.images.map((imgUrl, i) => `
        <button onclick="window.quickViewManager.setPrimaryImage('${imgUrl}')" class="w-16 h-20 rounded overflow-hidden border border-gray-200 hover:border-black transition-all">
          <img src="${imgUrl}" alt="${p.name}" class="w-full h-full object-cover" />
        </button>
      `).join("");
    }

    // Details
    const titleEl = document.getElementById("qv-title");
    const categoryEl = document.getElementById("qv-category");
    const priceEl = document.getElementById("qv-price");
    const origPriceEl = document.getElementById("qv-original-price");
    const descEl = document.getElementById("qv-description");
    const fabricEl = document.getElementById("qv-fabric");
    const stockEl = document.getElementById("qv-stock");

    if (titleEl) titleEl.textContent = p.name;
    if (categoryEl) categoryEl.textContent = `${p.category.toUpperCase()} • ${p.subCategory}`;
    if (priceEl) priceEl.textContent = `${currency}${p.price.toFixed(2)}`;
    
    if (origPriceEl) {
      if (p.originalPrice && p.originalPrice > p.price) {
        origPriceEl.textContent = `${currency}${p.originalPrice.toFixed(2)}`;
        origPriceEl.classList.remove("hidden");
      } else {
        origPriceEl.classList.add("hidden");
      }
    }

    if (descEl) descEl.textContent = p.description;
    if (fabricEl) fabricEl.textContent = p.fabricCare;
    
    if (stockEl) {
      stockEl.innerHTML = p.stock <= 5 
        ? `<span class="text-amber-700 font-medium">⚡ Low Stock: Only ${p.stock} units remaining</span>`
        : `<span class="text-emerald-700 font-medium">✓ In Stock, ready to dispatch</span>`;
    }

    // Render Sizes
    const sizesContainer = document.getElementById("qv-sizes-container");
    if (sizesContainer) {
      sizesContainer.innerHTML = p.sizes.map((size, idx) => `
        <button 
          onclick="window.quickViewManager.setSize('${size}')" 
          data-size="${size}"
          class="qv-size-btn px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded border transition-colors ${idx === 0 ? 'bg-[#121212] text-white border-[#121212]' : 'bg-white text-black border-gray-200 hover:border-black'}">
          ${size}
        </button>
      `).join("");
    }

    // Render Colors
    const colorsContainer = document.getElementById("qv-colors-container");
    const colorLabel = document.getElementById("qv-color-label");
    if (colorLabel && p.colors[0]) colorLabel.textContent = p.colors[0].name;

    if (colorsContainer) {
      colorsContainer.innerHTML = p.colors.map((c, idx) => `
        <span 
          onclick="window.quickViewManager.setColor('${c.name}')"
          data-color="${c.name}"
          title="${c.name}"
          class="color-swatch qv-color-swatch ${idx === 0 ? 'active' : ''}" 
          style="background-color: ${c.hex};">
        </span>
      `).join("");
    }

    // Quantity reset
    const qtyEl = document.getElementById("qv-qty-val");
    if (qtyEl) qtyEl.textContent = "1";

    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }
}

window.quickViewManager = new QuickViewManager();
