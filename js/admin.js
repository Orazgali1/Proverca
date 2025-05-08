document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-product-form');
    const productList = document.getElementById('admin-product-list');
  
    function loadProducts() {
      const adminProducts = JSON.parse(localStorage.getItem('adminProducts')) || [];
      productList.innerHTML = '';
  
      adminProducts.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'bg-white p-4 rounded shadow flex flex-col items-center';
  
        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="w-32 h-32 object-cover mb-2 rounded">
          <h3 class="font-semibold">${product.name}</h3>
          <p class="text-indigo-600 mb-2">${product.price} ₸</p>
          <button data-index="${index}" class="delete-btn bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 mt-2">
            Удалить
          </button>
        `;
  
        productList.appendChild(card);
      });
  
      // Удаление товара
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const i = parseInt(btn.dataset.index);
          adminProducts.splice(i, 1);
          localStorage.setItem('adminProducts', JSON.stringify(adminProducts));
          loadProducts();
        });
      });
    }
  
    // Добавление нового товара
    form.addEventListener('submit', e => {
      e.preventDefault();
  
      const name = document.getElementById('name').value.trim();
      const price = parseInt(document.getElementById('price').value);
      const image = document.getElementById('image').value.trim();
  
      if (!name || !price || !image) return;
  
      const newProduct = { name, price, images };
      const adminProducts = JSON.parse(localStorage.getItem('adminProducts')) || [];
  
      adminProducts.push(newProduct);
      localStorage.setItem('adminProducts', JSON.stringify(adminProducts));
  
      form.reset();
      loadProducts();
    });
  
    loadProducts();
  });
  