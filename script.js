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

let cart = [];

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

    if(parentButton){
        const name = parentButton.getAttribute('data-name');
        const price = parseFloat(parentButton.getAttribute('data-price'));

        addToCart(name, price);
    }
});

function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name);
    if(existingItem){
        existingItem.quantity+=1;
    }else{
        cart.push({name, price, quantity: 1});
    }
    updateCartModal()

}

function updateCartModal(){
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div>${item.name}</div>
            <div>${item.quantity} x $${item.price}</div>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.quantity * item.price;
    });
    cartTotal.innerText = `$${total.toFixed(2)}`;
    cartCounter.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);

}

checkoutBtn.addEventListener('click', () => {
    if(cart.length === 0){
        alert('Your cart is empty!');
    }else if(addressInput.value === ''){
        addressWarn.style.display = 'block';
    }else{
        alert('Pedido feito com sucesso!');
        cart = [];
        updateCartModal();
        addressInput.value = '';
        addressWarn.style.display = 'none';
        cartModal.style.display = 'none';
    }
});

addressInput.addEventListener('input', () => {
    addressWarn.style.display = 'none';
});

