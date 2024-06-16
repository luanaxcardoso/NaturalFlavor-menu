const menu = document.getElementById('menu');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const cartCounter = document.getElementById('cart-count');
const addressInput = document.getElementById('address');
const addressWarn = document.getElementById('address-warn');
const displayAddress = document.getElementById('display-address');

let cart = [];
let address = '';

cartBtn.addEventListener('click', () => {
  updateCartModal();
  cartModal.style.display = 'flex';
});
cartModal.addEventListener('click', (e) => {
  if (e.target === cartModal) {
    cartModal.style.display = 'none';
  }
});

closeModalBtn.addEventListener('click', () => {
  cartModal.style.display = 'none';
});

menu.addEventListener('click', (e) => {
  let parentButton = e.target.closest('.add-to-cart-btn');

  if (parentButton) {
    const name = parentButton.getAttribute('data-name');
    const price = parseFloat(parentButton.getAttribute('data-price'));

    addToCart(name, price);
  }
});

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCartModal();
}

function updateCartModal() {
  cartItemsContainer.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item', 'flex', 'justify-between', 'items-center', 'mb-2', 'p-2', 'border-b', 'border-gray-200');
    itemElement.innerHTML = `
      <div class="flex-1">${item.name}</div>
      <div class="flex items-center">
        <div class="flex items-center">
          <button class="remove-one-btn bg-red-500 text-white rounded-full px-2 py-1 mx-1" data-name="${item.name}">-</button>
          <span class="mx-2">${item.quantity} x R$${item.price.toFixed(2)}</span>
          <button class="add-one-btn bg-green-500 text-white rounded-full px-2 py-1 mx-1" data-name="${item.name}">+</button>
        </div>
      </div>
    `;
    cartItemsContainer.appendChild(itemElement);
    total += item.quantity * item.price;
  });
  cartTotal.innerText = `R$${total.toFixed(2)}`;
  cartCounter.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
  
  
  if (address.trim() !== '') {
    displayAddress.textContent = `Endereço de entrega: ${address}`;
  } else {
    displayAddress.textContent = '';
  }
}

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Seu carrinho está vazio!');
    } else if (addressInput.value === '') {
      addressWarn.style.display = 'block';
    } else {
     
      const confirmationMessage = `Obrigado por sua compra!\n\n`;
      const orderDetails = cart.map(item => `${item.quantity}x ${item.name} - R$${(item.quantity * item.price).toFixed(2)}`).join('\n');
      const totalAmount = `Total: R$${cartTotal.innerText}`;
      const deliveryAddress = `Endereço de entrega: ${address}`;
  
      const finalMessage = `${confirmationMessage}${orderDetails}\n${totalAmount}\n${deliveryAddress}`;
  
      alert(finalMessage);
  
      
      cart = [];
      updateCartModal();
      addressInput.value = '';
      addressWarn.style.display = 'none';
      cartModal.style.display = 'none';
    }
  });
  

addressInput.addEventListener('input', () => {
  addressWarn.style.display = 'none';
  address = addressInput.value;
  if (address.trim() !== '') {
    displayAddress.textContent = `Endereço de entrega: ${address}`;
  } else {
    displayAddress.textContent = '';
  }
});

cartItemsContainer.addEventListener('click', (e) => {
  const parentButton = e.target.closest('button');
  if (parentButton) {
    const name = parentButton.getAttribute('data-name');
    const item = cart.find(item => item.name === name);
    if (parentButton.classList.contains('add-one-btn')) {
      item.quantity += 1;
    } else {
      item.quantity -= 1;
      if (item.quantity === 0) {
        cart = cart.filter(item => item.name !== name);
      }
    }
    updateCartModal();
  }
});

function checkOpen() {
  const data = new Date();
  const hora = data.getHours();
  return hora >= 17 && hora <= 23;
}

if (!checkOpen()) {
  const body = document.querySelector('body');
  body.innerHTML = `
    <div class="flex h-screen justify-center items-center">
      <h1 class="text-4xl">Desculpe, estamos fechados!</h1>
    </div>
  `;
}

document.getElementById('close-modal-btn').addEventListener('click', function () {
  document.getElementById('cart-modal').classList.add('hidden');
});

document.getElementById('checkout-btn').addEventListener('click', function () {
  const address = document.getElementById('address').value.trim();
  const addressWarn = document.getElementById('address-warn');

  if (address === '') {
    addressWarn.classList.remove('hidden');
  } else {
    addressWarn.classList.add('hidden');
    alert('Pedido finalizado com sucesso!');
  }
});

document.getElementById('address').addEventListener('input', function() {
    document.getElementById('display-address').textContent = this.value;
});

document.getElementById('confirm-address').addEventListener('change', function() {
    document.getElementById('checkout-btn').disabled = !this.checked;
});
