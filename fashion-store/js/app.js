/**
 * MAIN APPLICATION CONTROLLER - ÉLÉVATION ATELIER
 * -------------------------------------------------------------
 * Controls catalog rendering, live searching, category filtering,
 * sorting, announcements carousel, currency converter, and toast UI.
 * -------------------------------------------------------------
 */

// Toast notification helper
window.showToast = function(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";

  const iconName = type === "success" ? "check-circle-2" : type === "error" ? "alert-circle" : "info";
  const iconColor = type === "success" ? "text-emerald-600" : type === "error" ? "text-red-500" : "text-amber-700";

  toast.innerHTML = `
    <div class="flex items-center gap-3">
      <i data-lucide="${iconName}" class="w-5 h-5 ${iconColor}"></i>
      <span class="text-xs font-medium text-[#121212]">${message}</span>
    </div>
    <button class="text-gray-400 hover:text-black ml-4" onclick="this.parentElement.remove()">
      <i data-lucide="x" class="w-4 h-4"></i>
    </button>
  `;

  container.appendChild(toast);
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }

  // Animate in
  setTimeout(() => toast.classList.add("show"), 10);

  // Auto remove after 3.5 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

class StoreApp {
  constructor() {
    this.currentCategory = "all";
    this.currentSort = "featured";
    this.searchQuery = "";
    this.activeAnnouncementIndex = 0;
    this.init();
  }

  init() {
    this.initAnnouncements();
    this.renderProducts();
    this.bindEvents();
    this.bindMobileNav();
    this.bindNewsletter();
  }

  initAnnouncements() {
    const bannerText = document.getElementById("announcement-text");
    const announcements = window.STORE_CONFIG.announcements || [];
    if (!bannerText || announcements.length === 0) return;

    bannerText.textContent = announcements[0];

    setInterval(() => {
      this.activeAnnouncementIndex = (this.activeAnnouncementIndex + 1) % announcements.length;
      bannerText.style.opacity = 0;
      setTimeout(() => {
        bannerText.textContent = announcements[this.activeAnnouncementIndex];
        bannerText.style.opacity = 1;
      }, 300);
    }, 4500);
  }

  bindEvents() {
    // Category filter pills
    const filterButtons = document.querySelectorAll(".category-filter-btn");
    filterButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        filterButtons.forEach(b => {
          b.classList.remove("bg-[#121212]", "text-white");
          b.classList.add("bg-white", "text-black", "border-[#EAE6DF]");
        });
        btn.classList.add("bg-[#121212]", "text-white");
        btn.classList.remove("bg-white", "text-black", "border-[#EAE6DF]");

        this.currentCategory = btn.getAttribute("data-category");
        this.renderProducts();
      });
    });

    // Sorting dropdown
    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        this.currentSort = e.target.value;
        this.renderProducts();
      });
    }

    // Live search input
    const searchInputs = document.querySelectorAll(".store-search-input");
    searchInputs.forEach(input => {
      input.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderProducts();
      });
    });

    // Currency Switcher
    const currencySelect = document.getElementById("currency-select");
    if (currencySelect) {
      currencySelect.addEventListener("change", (e) => {
        const selectedCode = e.target.value;
        const targetCurrency = window.STORE_CONFIG.currencies.find(c => c.code === selectedCode);
        if (targetCurrency) {
          window.STORE_CONFIG.currency = targetCurrency.symbol;
          window.STORE_CONFIG.currencyCode = targetCurrency.code;
          this.renderProducts();
          if (window.cartManager) window.cartManager.render();
          if (window.wishlistManager) window.wishlistManager.render();
          window.showToast(`Switched currency to ${selectedCode} (${targetCurrency.symbol})`, "info");
        }
      });
    }
  }

  bindMobileNav() {
    const mobileToggle = document.getElementById("mobile-menu-btn");
    const mobileDrawer = document.getElementById("mobile-menu-drawer");
    const mobileClose = document.getElementById("mobile-menu-close");

    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener("click", () => {
        mobileDrawer.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    }

    if (mobileClose && mobileDrawer) {
      mobileClose.addEventListener("click", () => {
        mobileDrawer.classList.remove("active");
        document.body.style.overflow = "";
      });
    }
  }

  bindNewsletter() {
    const form = document.getElementById("newsletter-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const emailInput = document.getElementById("newsletter-email");
        if (emailInput && emailInput.value) {
          window.showToast("Welcome to the Atelier. Use code ELEVATE20 for 20% off your first order!", "success");
          emailInput.value = "";
        }
      });
    }
  }

  filterProducts() {
    let items = [...window.PRODUCTS_DATA];

    // Filter by Category or Tag
    if (this.currentCategory !== "all") {
      if (this.currentCategory === "bestseller") {
        items = items.filter(item => item.isBestseller);
      } else if (this.currentCategory === "sale") {
        items = items.filter(item => item.originalPrice && item.originalPrice > item.price);
      } else {
        items = items.filter(item => item.category === this.currentCategory);
      }
    }

    // Filter by Search Query
    if (this.searchQuery) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(this.searchQuery) ||
        item.category.toLowerCase().includes(this.searchQuery) ||
        item.subCategory.toLowerCase().includes(this.searchQuery) ||
        item.description.toLowerCase().includes(this.searchQuery)
      );
    }

    // Sort items
    if (this.currentSort === "price-low") {
      items.sort((a, b) => a.price - b.price);
    } else if (this.currentSort === "price-high") {
      items.sort((a, b) => b.price - a.price);
    } else if (this.currentSort === "rating") {
      items.sort((a, b) => b.rating - a.rating);
    } else {
      // Featured
      items.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return items;
  }

  renderProducts() {
    const grid = document.getElementById("products-grid");
    const countEl = document.getElementById("products-count");
    if (!grid) return;

    const filtered = this.filterProducts();
    const currency = window.STORE_CONFIG.currency || "$";

    if (countEl) {
      countEl.textContent = `Showing ${filtered.length} creation${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center">
          <p class="font-serif text-2xl text-gray-500 mb-2">No creations found matching your filter</p>
          <p class="text-sm text-gray-400">Try adjusting your search terms or clearing the selected category.</p>
          <button onclick="document.querySelector('[data-category=all]').click()" class="mt-4 px-6 py-2 border border-black text-xs font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
            Reset Filters
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(prod => {
      const isFavorited = window.wishlistManager && window.wishlistManager.isInWishlist(prod.id);
      const discountPercent = prod.originalPrice && prod.originalPrice > prod.price 
        ? Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100) 
        : null;

      return `
        <div class="product-card group relative bg-white border border-[#EAE6DF] rounded overflow-hidden flex flex-col justify-between">
          <div>
            <!-- Image Frame -->
            <div class="product-img-wrapper relative aspect-[3/4] overflow-hidden bg-[#FAF9F5]">
              <!-- Primary image -->
              <img 
                src="${prod.images[0]}" 
                alt="${prod.name}" 
                class="product-img-primary absolute inset-0 w-full h-full object-cover object-center" 
                loading="lazy"
              />
              <!-- Hover secondary image -->
              ${prod.images[1] ? `
                <img 
                  src="${prod.images[1]}" 
                  alt="${prod.name} alternate view" 
                  class="product-img-secondary absolute inset-0 w-full h-full object-cover object-center opacity-0 pointer-events-none" 
                  loading="lazy"
                />
              ` : ''}

              <!-- Badges -->
              <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                ${prod.badge ? `
                  <span class="badge-luxury bg-[#121212] text-white">
                    ${prod.badge}
                  </span>
                ` : ''}
                ${discountPercent ? `
                  <span class="badge-luxury bg-[#B33927] text-white">
                    -${discountPercent}%
                  </span>
                ` : ''}
              </div>

              <!-- Top Right Wishlist Button -->
              <button 
                onclick="window.wishlistManager.toggle('${prod.id}')"
                data-wishlist-btn="${prod.id}"
                title="Save to Wishlist"
                class="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur shadow-sm flex items-center justify-center transition-transform hover:scale-110 ${isFavorited ? 'text-red-500' : 'text-gray-400 hover:text-black'}">
                <i data-lucide="heart" class="w-4 h-4" ${isFavorited ? 'style="fill:#EF4444; color:#EF4444;"' : ''}></i>
              </button>

              <!-- Quick View Floating Button on Card Hover -->
              <div class="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onclick="window.quickViewManager.open('${prod.id}')"
                  class="w-full py-2.5 bg-white/95 backdrop-blur hover:bg-[#121212] hover:text-white text-xs font-semibold uppercase tracking-wider text-[#121212] shadow-md transition-all rounded">
                  Quick View
                </button>
              </div>
            </div>

            <!-- Card Content -->
            <div class="p-4">
              <div class="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>${prod.category.toUpperCase()}</span>
                <div class="flex items-center gap-1 text-amber-600 font-medium">
                  <i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
                  <span>${prod.rating.toFixed(1)} (${prod.reviewCount})</span>
                </div>
              </div>

              <h3 class="font-medium text-sm text-[#121212] line-clamp-1 mb-1.5 hover:text-[#C5A880] transition-colors cursor-pointer" onclick="window.quickViewManager.open('${prod.id}')">
                ${prod.name}
              </h3>

              <!-- Price -->
              <div class="flex items-center gap-2 mb-3">
                <span class="text-base font-semibold text-[#121212]">${currency}${prod.price.toFixed(2)}</span>
                ${prod.originalPrice && prod.originalPrice > prod.price ? `
                  <span class="text-xs text-gray-400 line-through">${currency}${prod.originalPrice.toFixed(2)}</span>
                ` : ''}
              </div>

              <!-- Available Colors Dots -->
              <div class="flex items-center gap-1.5">
                ${prod.colors.slice(0, 3).map(c => `
                  <span class="w-3 h-3 rounded-full border border-gray-300" style="background-color: ${c.hex};" title="${c.name}"></span>
                `).join("")}
                ${prod.colors.length > 3 ? `<span class="text-[10px] text-gray-400">+${prod.colors.length - 3}</span>` : ''}
              </div>
            </div>
          </div>

          <!-- Bottom Action Button -->
          <div class="p-4 pt-0">
            <button 
              onclick="window.cartManager.addItem('${prod.id}', '${prod.sizes[0]}', '${prod.colors[0].name}', 1)"
              class="w-full py-2 border border-[#121212] text-xs font-semibold uppercase tracking-wider text-[#121212] hover:bg-[#121212] hover:text-white transition-all rounded">
              Add To Bag
            </button>
          </div>
        </div>
      `;
    }).join("");

    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }
}

// Instantiate on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.storeApp = new StoreApp();
});
