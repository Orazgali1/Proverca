document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="text-gray-500 italic">Корзина пуста.</p>';
      cartTotal.textContent = '';
      checkoutBtn.disabled = true;
      checkoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
      return;
    }

    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const itemDiv = document.createElement('div');
      itemDiv.className = 'bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full';

      itemDiv.innerHTML = `
        <div class="flex items-center gap-6 w-full sm:w-auto">
          <img src="${item.images}" alt="${item.name}" class="w-24 h-28 object-cover rounded-lg border" />
          <div>
            <p class="text-base font-semibold mb-1">${item.name}</p>
            <div class="flex items-center gap-2 text-sm text-gray-700">
              <span>${item.price} ₸ ×</span>
              <button class="qty-btn px-2 bg-gray-200 rounded font-bold" data-id="${item.id}" data-action="decrease">−</button>
              <span class="font-semibold">${item.quantity}</span>
              <button class="qty-btn px-2 bg-gray-200 rounded font-bold" data-id="${item.id}" data-action="increase">+</button>
              <span>= <strong>${itemTotal} ₸</strong></span>
            </div>
          </div>
        </div>
        <div class="self-start sm:self-auto">
          <button class="remove-btn bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 transition text-sm" data-id="${item.id}">
            Удалить
          </button>
        </div>
      `;

      cartItemsContainer.appendChild(itemDiv);
    });

    cartTotal.textContent = `Итого: ${total.toLocaleString()} ₸`;
    checkoutBtn.disabled = false;
    checkoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');

    // Удаление
    document.querySelectorAll('.remove-btn').forEach(button => {
      button.addEventListener('click', () => {
        const id = parseInt(button.dataset.id);
        cart = cart.filter(p => p.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });

    // Кол-во +/−
    document.querySelectorAll('.qty-btn').forEach(button => {
      button.addEventListener('click', () => {
        const id = parseInt(button.dataset.id);
        const action = button.dataset.action;
        const product = cart.find(p => p.id === id);

        if (action === 'increase') {
          product.quantity += 1;
        } else if (action === 'decrease' && product.quantity > 1) {
          product.quantity -= 1;
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });
  }

  checkoutBtn.addEventListener('click', () => {
    localStorage.removeItem('cart');
    window.location.href = 'thanks.html';
  });

  renderCart();
});
