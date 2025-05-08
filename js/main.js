document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn'); // 🔍 кнопка
  let allProducts = products; // ← теперь берём из products.js

  // Рендер карточек
  function renderProducts(products) {
    productList.innerHTML = '';

    if (products.length === 0) {
      productList.innerHTML = '<p class="text-gray-500">Товары не найдены.</p>';
      return;
    }

    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card bg-white rounded-lg shadow-md p-4 flex flex-col items-center';

      card.innerHTML = `
        <a href="product.html?id=${product.id}" class="block bg-white rounded-lg shadow p-2 hover:shadow-lg transition w-full max-w-[220px] mx-auto">
          <img src="${product.images}" alt="${product.name}" class="w-full aspect-[3/4] object-cover rounded-md" />
          <div class="mt-2 px-1">
            <p class="product-title text-sm text-gray-700 font-medium truncate">${product.name}</p>
            <p class="text-indigo-600 font-bold text-sm">${product.price} ₸</p>
          </div>
        </a>
        <button class="add-to-cart mt-1 w-full bg-indigo-600 text-white py-1 rounded text-sm hover:bg-indigo-700" data-id="${product.id}">
          В корзину
        </button>
      `;

      productList.appendChild(card);
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', () => {
        const id = parseInt(button.dataset.id);
        const selectedProduct = allProducts.find(p => p.id === id);
        addToCart(selectedProduct);
      });
    });
  }

  // Тост-уведомление
  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('opacity-0');
    toast.classList.add('opacity-100');

    setTimeout(() => {
      toast.classList.remove('opacity-100');
      toast.classList.add('opacity-0');
    }, 2500);
  }

  // Добавление в корзину
  function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    showToast(`${product.name} добавлен в корзину`);
  }

  // Фильтрация
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      if (category === 'all') {
        renderProducts(allProducts);
      } else {
        const filtered = allProducts.filter(p => p.category === category);
        renderProducts(filtered);
      }
    });
  });

  // Поиск
  function handleSearch() {
    const query = searchInput.value.toLowerCase();
    const filtered = allProducts.filter(p =>
      p.name.toLowerCase().includes(query)
    );
    renderProducts(filtered);
  }

  searchInput?.addEventListener('input', handleSearch);
  searchBtn?.addEventListener('click', handleSearch);

  // Показываем все товары
  renderProducts(allProducts);
});
