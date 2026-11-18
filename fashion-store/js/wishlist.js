/**
 * WISHLIST SYSTEM - ÉLÉVATION ATELIER
 * -------------------------------------------------------------
 * Manages saved favorite items with LocalStorage sync, heart icons,
 * and a dedicated slide-over Wishlist drawer.
 * -------------------------------------------------------------
 */

class WishlistManager {
  constructor() {
    this.storageKey = "elevation_wishlist_v1";
    this.items = this.loadWishlist();
    this.init();
  }

  loadWishlist() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to load wishlist from localStorage", e);
      return [];
    }
  }

  saveWishlist() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    } catch (e) {
      console.error("Failed to save wishlist to localStorage", e);
    }
    this.render();
  }

  init() {
    this.render();
    this.bindEvents();
  }

  bindEvents() {
    const openBtns = document.querySelectorAll("[data-wishlist-open]");
    const closeBtns = document.querySelectorAll("[data-wishlist-close]");
    const drawer = document.getElementById("wishlist-drawer");

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

    if (drawer) {
      drawer.addEventListener("click", (e) => {
        if (e.target === drawer) {
          this.closeDrawer();
        }
      });
    }
  }

  openDrawer() {
    const drawer = document.getElementById("wishlist-drawer");
    if (drawer) {
      drawer.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  closeDrawer() {
    const drawer = document.getElementById("wishlist-drawer");
    if (drawer) {
      drawer.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  toggle(productId) {
    const index = this.items.indexOf(productId);
    const product = window.PRODUCTS_DATA.find(p => p.id === productId);
    const title = product ? product.name : "Item";

    if (index > -1) {
      this.items.splice(index, 1);
      window.showToast(`Removed "${title}" from your wishlist`, "info");
    } else {
      this.items.push(productId);
      window.showToast(`Saved "${title}" to your wishlist`, "success");
    }

    this.saveWishlist();
    this.updateCardHearts();
  }

  isInWishlist(productId) {
    return this.items.includes(productId);
  }

  moveToCart(productId) {
    const product = window.PRODUCTS_DATA.find(p => p.id === productId);
    if (product) {
      window.cartManager.addItem(productId, product.sizes[0], product.colors[0].name, 1);
      this.toggle(productId); // Remove from wishlist after moving
    }
  }

  updateCardHearts() {
    const buttons = document.querySelectorAll("[data-wishlist-btn]");
    buttons.forEach(btn => {
      const prodId = btn.getAttribute("data-wishlist-btn");
      const icon = btn.querySelector("svg, i");
      if (this.isInWishlist(prodId)) {
        btn.classList.add("text-red-500");
        btn.classList.remove("text-gray-400");
        if (icon) {
          icon.style.fill = "#EF4444";
          icon.style.color = "#EF4444";
        }
      } else {
        btn.classList.remove("text-red-500");
        btn.classList.add("text-gray-400");
        if (icon) {
          icon.style.fill = "none";
          icon.style.color = "currentColor";
        }
      }
    });
  }

  render() {
    // Update badge count
    const badgeElements = document.querySelectorAll(".wishlist-count-badge");
    badgeElements.forEach(badge => {
      badge.textContent = this.items.length;
      if (this.items.length > 0) {
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
      }
    });

    // Render list
    const container = document.getElementById("wishlist-items-container");
    const emptyState = document.getElementById("wishlist-empty-state");

    if (container) {
      const products = this.items
        .map(id => window.PRODUCTS_DATA.find(p => p.id === id))
        .filter(Boolean);

      if (products.length === 0) {
        container.innerHTML = "";
        if (emptyState) emptyState.classList.remove("hidden");
      } else {
        if (emptyState) emptyState.classList.add("hidden");
        const currency = window.STORE_CONFIG.currency || "$";

        container.innerHTML = products.map(prod => `
          <div class="flex gap-4 py-4 border-b border-[#EAE6DF] items-center">
            <img src="${prod.images[0]}" alt="${prod.name}" class="w-20 h-24 object-cover rounded bg-[#F4F1EB]" />
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-start">
                <h4 class="font-medium text-sm text-[#121212] truncate">${prod.name}</h4>
                <button onclick="window.wishlistManager.toggle('${prod.id}')" class="text-gray-400 hover:text-red-600 transition-colors ml-2">
                  <i data-lucide="x" class="w-4 h-4"></i>
                </button>
              </div>
              <p class="text-xs text-gray-500 mt-1">${prod.category.toUpperCase()}</p>
              <div class="flex justify-between items-center mt-3">
                <span class="text-sm font-semibold text-[#121212]">${currency}${prod.price.toFixed(2)}</span>
                <button onclick="window.wishlistManager.moveToCart('${prod.id}')" class="text-xs uppercase tracking-wider font-semibold bg-[#121212] text-white px-3 py-1.5 rounded hover:bg-[#C5A880] transition-colors">
                  Move To Bag
                </button>
              </div>
            </div>
          </div>
        `).join("");
      }
    }

    this.updateCardHearts();

    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }
}

window.wishlistManager = new WishlistManager();
