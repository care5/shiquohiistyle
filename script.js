/* ===== HIISTYLE Cart + UI ===== */
(function () {
  const CART_KEY = 'hiistyle_cart';

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
  }

  function cartTotalQty(cart) {
    return cart.reduce((s, i) => s + (i.qty || 1), 0);
  }

  function updateCartBadge() {
    const cart = getCart();
    const count = cartTotalQty(cart);
    document.querySelectorAll('.cart-count').forEach((el) => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : '';
    });
  }

  function addToCart(item) {
    const cart = getCart();
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
    } else {
      cart.push({ ...item, qty: 1 });
    }
    saveCart(cart);
    return cart;
  }

  function removeFromCart(id) {
    const cart = getCart().filter((i) => i.id !== id);
    saveCart(cart);
    return cart;
  }

  function setQty(id, qty) {
    let cart = getCart();
    if (qty <= 0) {
      cart = cart.filter((i) => i.id !== id);
    } else {
      const item = cart.find((i) => i.id === id);
      if (item) item.qty = qty;
    }
    saveCart(cart);
    return cart;
  }

  function clearCart() {
    saveCart([]);
  }

  window.HiistyleCart = {
    getCart, saveCart, addToCart, removeFromCart, setQty, clearCart, updateCartBadge, cartTotalQty
  };

  // Mobile menu
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => mobileNav.classList.toggle('open'));
  }

  // Add to cart
  document.querySelectorAll('.add-to-cart').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.product-card');
      if (!card) return;

      const nameEl = card.querySelector('.product-name');
      const priceEl = card.querySelector('.product-price');
      const imgEl = card.querySelector('.product-image img');
      const catEl = card.querySelector('.product-category');

      const name = nameEl ? nameEl.textContent.trim() : 'Product';
      const priceText = priceEl ? priceEl.textContent.trim() : 'WhatsApp for Price';
      const img = imgEl ? imgEl.getAttribute('src') : '';
      const category = catEl ? catEl.textContent.trim() : '';
      const id = (img || name).replace(/\s+/g, '_').slice(0, 100);

      addToCart({ id, name, price: priceText, img, category });

      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Added';
      btn.classList.add('added');
      setTimeout(() => {
        btn.innerHTML = original;
        btn.classList.remove('added');
      }, 1400);
    });
  });

  // Wishlist
  document.querySelectorAll('.wishlist-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.classList.toggle('active');
      const icon = btn.querySelector('i');
      if (!icon) return;
      if (btn.classList.contains('active')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
      } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
      }
    });
  });

  updateCartBadge();
})();
