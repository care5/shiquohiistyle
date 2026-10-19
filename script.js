const mobileBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
if (mobileBtn && mobileNav) {
  mobileBtn.addEventListener('click', () => mobileNav.classList.toggle('open'));
}
let cartCount = 0;
const cartCountEl = document.querySelectorAll('.cart-count');
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    cartCount++;
    cartCountEl.forEach(el => el.textContent = cartCount);
    btn.innerHTML = '<i class="fas fa-check"></i> Added';
    setTimeout(() => { btn.innerHTML = '<i class="fas fa-plus"></i> Add'; }, 1200);
  });
});
document.querySelectorAll('.wishlist-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    btn.classList.toggle('active');
    const icon = btn.querySelector('i');
    if (btn.classList.contains('active')) {
      icon.classList.remove('far'); icon.classList.add('fas');
    } else {
      icon.classList.remove('fas'); icon.classList.add('far');
    }
  });
});
