/**
 * SHOPPING CART ENGINE - ÉLÉVATION ATELIER
 * -------------------------------------------------------------
 * Manages cart state with LocalStorage persistence, discount calculations,
 * free shipping progress tracking, and cart drawer UI rendering.
 * -------------------------------------------------------------
 */

class CartManager {
  constructor() {
    this.storageKey = "elevation_cart_v1";
    this.appliedCoupon = JSON.parse(localStorage.getItem("elevation_applied_coupon")) || null;
    this.items = this.loadCart();
    this.init();
  }

  loadCart() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
      if (this.appliedCoupon) {
        localStorage.setItem("elevation_applied_coupon", JSON.stringify(this.appliedCoupon));
      } else {
        localStorage.removeItem("elevation_applied_coupon");
      }
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
    this.render();
  }

  init() {
    this.render();
    this.bindEvents();
  }

  bindEvents() {
    // Open & close cart drawer triggers
    const openBtns = document.querySelectorAll("[data-cart-open]");
    const closeBtns = document.querySelectorAll("[data-cart-close]");
    const drawer = document.getElementById("cart-drawer");

    openBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.openDrawer();
      });
    });

    closeBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.closeDrawer();
      });
    });

    // Close when clicking outside panel
    if (drawer) {
      drawer.addEventListener("click", (e) => {
        if (e.target === drawer) {
          this.closeDrawer();
        }
      });
    }

    // Coupon form submission
    const couponForm = document.getElementById("cart-coupon-form");
    if (couponForm) {
      couponForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = document.getElementById("cart-coupon-input");
        if (input) {
          this.applyCoupon(input.value.trim());
        }
      });
    }
  }

  openDrawer() {
    const drawer = document.getElementById("cart-drawer");
    if (drawer) {
      drawer.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  closeDrawer() {
    const drawer = document.getElementById("cart-drawer");
    if (drawer) {
      drawer.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  addItem(productId, size, color, quantity = 1) {
    const product = window.PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) {
      window.showToast("Product could not be found", "error");
      return;
    }

    // Selected size fallback
    const selectedSize = size || (product.sizes && product.sizes.length ? product.sizes[0] : "Standard");
    // Selected color fallback
    const selectedColor = color || (product.colors && product.colors.length ? product.colors[0].name : "Standard");

    // Check if duplicate item exists
    const existingIndex = this.items.findIndex(item => 
      item.id === productId && item.size === selectedSize && item.color === selectedColor
    );

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: selectedSize,
        color: selectedColor,
        quantity: quantity
      });
    }

    this.saveCart();
    window.showToast(`Added "${product.name}" to your bag`, "success");
    this.openDrawer();
  }

  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      const removed = this.items.splice(index, 1)[0];
      this.saveCart();
      window.showToast(`Removed "${removed.name}" from bag`, "info");
    }
  }

  updateQuantity(index, delta) {
    if (index >= 0 && index < this.items.length) {
      this.items[index].quantity += delta;
      if (this.items[index].quantity <= 0) {
        this.removeItem(index);
      } else {
        this.saveCart();
      }
    }
  }

  applyCoupon(code) {
    if (!code) return;
    const cleanCode = code.toUpperCase();
    const availablePromos = window.STORE_CONFIG.promoCodes;

    if (availablePromos[cleanCode]) {
      this.appliedCoupon = {
        code: cleanCode,
        discount: availablePromos[cleanCode].discount,
        label: availablePromos[cleanCode].label
      };
      this.saveCart();
      window.showToast(`Privilege code ${cleanCode} applied successfully!`, "success");
    } else {
      window.showToast(`Invalid promo code. Try "ELEVATE20" or "WELCOME10"`, "error");
    }
  }

  removeCoupon() {
    this.appliedCoupon = null;
    this.saveCart();
    window.showToast("Privilege code removed", "info");
  }

  clearCart() {
    this.items = [];
    this.appliedCoupon = null;
    this.saveCart();
  }

  getTotals() {
    const currency = window.STORE_CONFIG.currency || "$";
    const subtotal = this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    let discountAmount = 0;
    if (this.appliedCoupon && subtotal > 0) {
      discountAmount = subtotal * this.appliedCoupon.discount;
    }

    const freeShippingThreshold = window.STORE_CONFIG.freeShippingThreshold || 150;
    const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
    const shippingFee = isFreeShipping ? 0 : window.STORE_CONFIG.standardShippingFee;
    
    const taxRate = window.STORE_CONFIG.taxRate || 0.08;
    const estimatedTax = (subtotal - discountAmount) * taxRate;
    const total = Math.max(0, (subtotal - discountAmount) + shippingFee + estimatedTax);

    return {
      currency,
      subtotal,
      discountAmount,
      shippingFee,
      isFreeShipping,
      freeShippingThreshold,
      remainingForFreeShipping: Math.max(0, freeShippingThreshold - subtotal),
      estimatedTax,
      total,
      itemCount: this.items.reduce((acc, item) => acc + item.quantity, 0)
    };
  }

  render() {
    const totals = this.getTotals();

    // Update cart badge counters in header
    const badgeElements = document.querySelectorAll(".cart-count-badge");
    badgeElements.forEach(badge => {
      badge.textContent = totals.itemCount;
      if (totals.itemCount > 0) {
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
      }
    });

    // Update Free Shipping Progress Bar
    const shippingProgressEl = document.getElementById("cart-shipping-bar");
    const shippingTextEl = document.getElementById("cart-shipping-text");
    if (shippingProgressEl && shippingTextEl) {
      const percentage = Math.min(100, Math.round((totals.subtotal / totals.freeShippingThreshold) * 100));
      shippingProgressEl.style.width = `${percentage}%`;
      
      if (totals.isFreeShipping && totals.subtotal > 0) {
        shippingTextEl.innerHTML = `✨ <strong>Congratulations!</strong> You have unlocked complimentary white-glove shipping.`;
      } else {
        shippingTextEl.innerHTML = `Add <strong>${totals.currency}${totals.remainingForFreeShipping.toFixed(2)}</strong> more to unlock complimentary global shipping.`;
      }
    }

    // Render items list inside drawer
    const listContainer = document.getElementById("cart-items-container");
    const emptyState = document.getElementById("cart-empty-state");
    const footerContainer = document.getElementById("cart-footer");

    if (listContainer) {
      if (this.items.length === 0) {
        listContainer.innerHTML = "";
        if (emptyState) emptyState.classList.remove("hidden");
        if (footerContainer) footerContainer.classList.add("hidden");
      } else {
        if (emptyState) emptyState.classList.add("hidden");
        if (footerContainer) footerContainer.classList.remove("hidden");

        listContainer.innerHTML = this.items.map((item, index) => `
          <div class="flex gap-4 py-4 border-b border-[#EAE6DF] items-center">
            <img src="${item.image}" alt="${item.name}" class="w-20 h-24 object-cover rounded bg-[#F4F1EB]" />
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-start">
                <h4 class="font-medium text-sm text-[#121212] truncate">${item.name}</h4>
                <button onclick="window.cartManager.removeItem(${index})" class="text-gray-400 hover:text-red-600 transition-colors ml-2">
                  <i data-lucide="x" class="w-4 h-4"></i>
                </button>
              </div>
              <p class="text-xs text-gray-500 mt-1">Size: <span class="text-black font-medium">${item.size}</span> | Color: <span class="text-black font-medium">${item.color}</span></p>
              <div class="flex justify-between items-center mt-3">
                <div class="flex items-center border border-[#EAE6DF] rounded">
                  <button onclick="window.cartManager.updateQuantity(${index}, -1)" class="w-7 h-7 flex items-center justify-center text-xs text-gray-600 hover:bg-[#FAF9F5]">−</button>
                  <span class="w-8 text-center text-xs font-semibold">${item.quantity}</span>
                  <button onclick="window.cartManager.updateQuantity(${index}, 1)" class="w-7 h-7 flex items-center justify-center text-xs text-gray-600 hover:bg-[#FAF9F5]">+</button>
                </div>
                <span class="text-sm font-semibold text-[#121212]">${totals.currency}${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          </div>
        `).join("");
      }
    }

    // Render totals
    const subtotalEl = document.getElementById("cart-subtotal");
    const discountRowEl = document.getElementById("cart-discount-row");
    const discountValEl = document.getElementById("cart-discount-val");
    const discountBadgeEl = document.getElementById("cart-discount-badge");
    const shippingEl = document.getElementById("cart-shipping-val");
    const totalEl = document.getElementById("cart-total-val");

    if (subtotalEl) subtotalEl.textContent = `${totals.currency}${totals.subtotal.toFixed(2)}`;
    
    if (discountRowEl && discountValEl) {
      if (totals.discountAmount > 0) {
        discountRowEl.classList.remove("hidden");
        discountValEl.textContent = `-${totals.currency}${totals.discountAmount.toFixed(2)}`;
        if (discountBadgeEl && this.appliedCoupon) {
          discountBadgeEl.innerHTML = `
            ${this.appliedCoupon.code} 
            <button onclick="window.cartManager.removeCoupon()" class="ml-1 text-xs hover:text-red-500">✕</button>
          `;
        }
      } else {
        discountRowEl.classList.add("hidden");
      }
    }

    if (shippingEl) {
      shippingEl.textContent = totals.shippingFee === 0 ? "Complimentary" : `${totals.currency}${totals.shippingFee.toFixed(2)}`;
    }

    if (totalEl) totalEl.textContent = `${totals.currency}${totals.total.toFixed(2)}`;

    // Re-initialize dynamic icons if Lucide is loaded
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }
}

// Instantiate globally
window.cartManager = new CartManager();
