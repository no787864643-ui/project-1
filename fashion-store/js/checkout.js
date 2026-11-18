/**
 * CHECKOUT & INVOICE ENGINE - ÉLÉVATION ATELIER
 * -------------------------------------------------------------
 * Provides a seamless luxury checkout flow with shipping forms,
 * payment selection, order completion simulation, and printable
 * invoice generation.
 * -------------------------------------------------------------
 */

class CheckoutManager {
  constructor() {
    this.checkoutModal = document.getElementById("checkout-modal");
    this.invoiceModal = document.getElementById("invoice-modal");
    this.selectedShippingMethod = "standard";
    this.selectedPaymentMethod = "card";
    this.lastOrder = null;
    this.bindEvents();
  }

  bindEvents() {
    const startCheckoutBtns = document.querySelectorAll("[data-checkout-start]");
    const closeCheckoutBtns = document.querySelectorAll("[data-checkout-close]");
    const closeInvoiceBtns = document.querySelectorAll("[data-invoice-close]");

    startCheckoutBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.startCheckout();
      });
    });

    closeCheckoutBtns.forEach(btn => {
      btn.addEventListener("click", () => this.closeCheckout());
    });

    closeInvoiceBtns.forEach(btn => {
      btn.addEventListener("click", () => this.closeInvoice());
    });

    // Shipping selection change
    const shippingRadios = document.querySelectorAll("input[name='checkout_shipping']");
    shippingRadios.forEach(radio => {
      radio.addEventListener("change", (e) => {
        this.selectedShippingMethod = e.target.value;
        this.renderOrderSummary();
      });
    });

    // Payment method tabs
    const paymentRadios = document.querySelectorAll("input[name='checkout_payment']");
    paymentRadios.forEach(radio => {
      radio.addEventListener("change", (e) => {
        this.selectedPaymentMethod = e.target.value;
        this.updatePaymentFields();
      });
    });

    // Form submit
    const form = document.getElementById("checkout-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.processOrder();
      });
    }

    // Print Invoice button
    const printBtn = document.getElementById("invoice-print-btn");
    if (printBtn) {
      printBtn.addEventListener("click", () => {
        window.print();
      });
    }
  }

  startCheckout() {
    if (!window.cartManager || window.cartManager.items.length === 0) {
      window.showToast("Your shopping bag is empty", "info");
      return;
    }

    if (window.cartManager.closeDrawer) {
      window.cartManager.closeDrawer();
    }

    this.renderOrderSummary();
    this.updatePaymentFields();

    if (this.checkoutModal) {
      this.checkoutModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  closeCheckout() {
    if (this.checkoutModal) {
      this.checkoutModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  closeInvoice() {
    if (this.invoiceModal) {
      this.invoiceModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  updatePaymentFields() {
    const cardFields = document.getElementById("payment-fields-card");
    const upiFields = document.getElementById("payment-fields-upi");
    const codFields = document.getElementById("payment-fields-cod");

    if (cardFields) cardFields.classList.toggle("hidden", this.selectedPaymentMethod !== "card");
    if (upiFields) upiFields.classList.toggle("hidden", this.selectedPaymentMethod !== "upi");
    if (codFields) codFields.classList.toggle("hidden", this.selectedPaymentMethod !== "cod");
  }

  renderOrderSummary() {
    const totals = window.cartManager.getTotals();
    const currency = totals.currency;

    // Additional shipping fee if express chosen
    let effectiveShipping = totals.shippingFee;
    if (this.selectedShippingMethod === "express") {
      effectiveShipping = window.STORE_CONFIG.expressShippingFee;
    }

    const grandTotal = (totals.subtotal - totals.discountAmount) + effectiveShipping + totals.estimatedTax;

    const listContainer = document.getElementById("checkout-items-list");
    if (listContainer) {
      listContainer.innerHTML = window.cartManager.items.map(item => `
        <div class="flex items-center justify-between text-xs py-2 border-b border-[#F0ECE1]">
          <div class="flex items-center gap-3">
            <span class="w-5 h-5 bg-[#121212] text-white rounded-full flex items-center justify-center font-bold text-[10px]">${item.quantity}</span>
            <span class="font-medium text-[#121212] truncate max-w-[180px]">${item.name} (${item.size})</span>
          </div>
          <span class="font-semibold">${currency}${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      `).join("");
    }

    const subtotalEl = document.getElementById("checkout-subtotal");
    const discountEl = document.getElementById("checkout-discount");
    const discountRow = document.getElementById("checkout-discount-row");
    const shippingEl = document.getElementById("checkout-shipping");
    const taxEl = document.getElementById("checkout-tax");
    const totalEl = document.getElementById("checkout-total");

    if (subtotalEl) subtotalEl.textContent = `${currency}${totals.subtotal.toFixed(2)}`;
    
    if (discountRow && discountEl) {
      if (totals.discountAmount > 0) {
        discountRow.classList.remove("hidden");
        discountEl.textContent = `-${currency}${totals.discountAmount.toFixed(2)}`;
      } else {
        discountRow.classList.add("hidden");
      }
    }

    if (shippingEl) {
      shippingEl.textContent = effectiveShipping === 0 ? "Complimentary" : `${currency}${effectiveShipping.toFixed(2)}`;
    }

    if (taxEl) taxEl.textContent = `${currency}${totals.estimatedTax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `${currency}${grandTotal.toFixed(2)}`;
  }

  processOrder() {
    const firstName = document.getElementById("checkout-firstname")?.value.trim() || "Valued";
    const lastName = document.getElementById("checkout-lastname")?.value.trim() || "Guest";
    const email = document.getElementById("checkout-email")?.value.trim() || "customer@example.com";
    const address = document.getElementById("checkout-address")?.value.trim() || "100 Luxury Boulevard";
    const city = document.getElementById("checkout-city")?.value.trim() || "New York";
    const postalCode = document.getElementById("checkout-zip")?.value.trim() || "10001";
    const country = document.getElementById("checkout-country")?.value || "United States";

    // Simulate order placement
    const submitBtn = document.getElementById("checkout-submit-btn");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="inline-block animate-spin mr-2">⟳</span>
        Securing Atelier Order...
      `;
    }

    setTimeout(() => {
      const orderId = "EA-" + Math.floor(100000 + Math.random() * 900000);
      const totals = window.cartManager.getTotals();
      let effectiveShipping = totals.shippingFee;
      if (this.selectedShippingMethod === "express") {
        effectiveShipping = window.STORE_CONFIG.expressShippingFee;
      }
      const grandTotal = (totals.subtotal - totals.discountAmount) + effectiveShipping + totals.estimatedTax;

      this.lastOrder = {
        orderId,
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        customer: {
          name: `${firstName} ${lastName}`,
          email,
          address: `${address}, ${city}, ${postalCode}, ${country}`
        },
        shippingMethod: this.selectedShippingMethod === "express" ? "Priority Express Air (1-2 Business Days)" : "Complimentary White Glove Delivery (3-5 Business Days)",
        paymentMethod: this.selectedPaymentMethod.toUpperCase(),
        items: [...window.cartManager.items],
        subtotal: totals.subtotal,
        discount: totals.discountAmount,
        shippingFee: effectiveShipping,
        tax: totals.estimatedTax,
        grandTotal: grandTotal,
        currency: totals.currency
      };

      // Reset button
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `Place Order`;
      }

      // Close checkout modal & clear cart
      this.closeCheckout();
      window.cartManager.clearCart();

      // Show Invoice Modal
      this.showInvoice();
      window.showToast(`Order #${orderId} confirmed! Thank you for choosing ÉLÉVATION.`, "success");
    }, 1200);
  }

  showInvoice() {
    if (!this.lastOrder || !this.invoiceModal) return;

    const ord = this.lastOrder;
    const invoiceIdEl = document.getElementById("invoice-order-id");
    const invoiceDateEl = document.getElementById("invoice-date");
    const invoiceNameEl = document.getElementById("invoice-cust-name");
    const invoiceEmailEl = document.getElementById("invoice-cust-email");
    const invoiceAddrEl = document.getElementById("invoice-cust-address");
    const invoiceShippingEl = document.getElementById("invoice-shipping-method");
    const invoicePaymentEl = document.getElementById("invoice-payment-method");
    const invoiceTableBody = document.getElementById("invoice-items-body");

    const invSubtotal = document.getElementById("inv-subtotal");
    const invDiscount = document.getElementById("inv-discount");
    const invDiscountRow = document.getElementById("inv-discount-row");
    const invShipping = document.getElementById("inv-shipping");
    const invTax = document.getElementById("inv-tax");
    const invGrandTotal = document.getElementById("inv-grand-total");

    if (invoiceIdEl) invoiceIdEl.textContent = ord.orderId;
    if (invoiceDateEl) invoiceDateEl.textContent = ord.date;
    if (invoiceNameEl) invoiceNameEl.textContent = ord.customer.name;
    if (invoiceEmailEl) invoiceEmailEl.textContent = ord.customer.email;
    if (invoiceAddrEl) invoiceAddrEl.textContent = ord.customer.address;
    if (invoiceShippingEl) invoiceShippingEl.textContent = ord.shippingMethod;
    if (invoicePaymentEl) invoicePaymentEl.textContent = ord.paymentMethod;

    if (invoiceTableBody) {
      invoiceTableBody.innerHTML = ord.items.map(item => `
        <tr class="border-b border-[#F0ECE1] text-xs">
          <td class="py-3 font-medium text-[#121212]">${item.name}</td>
          <td class="py-3 text-gray-500">${item.size} / ${item.color}</td>
          <td class="py-3 text-center">${item.quantity}</td>
          <td class="py-3 text-right font-medium">${ord.currency}${item.price.toFixed(2)}</td>
          <td class="py-3 text-right font-semibold">${ord.currency}${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
      `).join("");
    }

    if (invSubtotal) invSubtotal.textContent = `${ord.currency}${ord.subtotal.toFixed(2)}`;
    
    if (invDiscountRow && invDiscount) {
      if (ord.discount > 0) {
        invDiscountRow.classList.remove("hidden");
        invDiscount.textContent = `-${ord.currency}${ord.discount.toFixed(2)}`;
      } else {
        invDiscountRow.classList.add("hidden");
      }
    }

    if (invShipping) {
      invShipping.textContent = ord.shippingFee === 0 ? "Complimentary" : `${ord.currency}${ord.shippingFee.toFixed(2)}`;
    }

    if (invTax) invTax.textContent = `${ord.currency}${ord.tax.toFixed(2)}`;
    if (invGrandTotal) invGrandTotal.textContent = `${ord.currency}${ord.grandTotal.toFixed(2)}`;

    this.invoiceModal.classList.add("active");
    document.body.style.overflow = "hidden";

    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }
}

window.checkoutManager = new CheckoutManager();
