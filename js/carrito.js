document.addEventListener('DOMContentLoaded', function() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cancelButton = document.getElementById('cancel');
    let cart = [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);

            const existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            renderCart();
        });
    });

    function renderCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)} 
                <div class="update-quantity">
                    <button class="decrease-quantity">-</button>
                    <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                    <button class="increase-quantity">+</button>
                </div>
                <button class="remove-item">Eliminar</button>
            `;

            li.querySelector('.increase-quantity').addEventListener('click', () => {
                item.quantity += 1;
                renderCart();
            });

            li.querySelector('.decrease-quantity').addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    renderCart();
                }
            });

            li.querySelector('.remove-item').addEventListener('click', () => {
                removeFromCart(item.name);
            });

            cartItems.appendChild(li);
            total += item.price * item.quantity;
        });

        totalPrice.textContent = total.toFixed(2);
    }

    function removeFromCart(name) {
        cart = cart.filter(item => item.name !== name);
        renderCart();
    }

    document.getElementById('checkout').addEventListener('click', function() {
        if (cart.length > 0) {
            alert('Gracias por su compra!');
            cart = [];
            renderCart();
        } else {
            alert('El carrito está vacío.');
        }
    });

    cancelButton.addEventListener('click', function() {
        if (cart.length > 0) {
            if (confirm('¿Estás seguro de que quieres cancelar la compra?')) {
                cart = [];
                renderCart();
            }
        } else {
            alert('El carrito está vacío.');
        }
    });
});
