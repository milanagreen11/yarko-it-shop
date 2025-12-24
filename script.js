let cart = [];

function addToCart(serviceName, price) {
    cart.push({ name: serviceName, price: price });
    updateCart();
}

function updateCart() {
    const count = cart.length;
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.textContent = count;
        countElement.style.display = count > 0 ? 'flex' : 'none';
    }
}

function openCart() {
    const modal = document.getElementById('cart-modal');
    const itemsContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    itemsContainer.innerHTML = '';
    if (cart.length === 0) {
        itemsContainer.innerHTML = '<p style="text-align:center;">Корзина пуста</p>';
        totalElement.innerHTML = '';
        document.getElementById('checkout-btn').style.display = 'none';
    } else {
        let totalPrice = 0;
        cart.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <span>${item.name}<br><small>${item.price}</small></span>
                <button onclick="removeFromCart(${index})">Удалить</button>
            `;
            itemsContainer.appendChild(div);
            let priceNum = parseInt(item.price.replace(/\D/g, '')) || 0;
            totalPrice += priceNum;
        });
        totalElement.innerHTML = `Итого: от ${totalPrice.toLocaleString()} ₽`;
        document.getElementById('checkout-btn').style.display = 'block';
    }
    modal.style.display = 'flex';
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    openCart();
}

function showPaymentForm() {
    document.getElementById('payment-form').style.display = 'block';
}

function submitOrder() {
    const name = document.getElementById('name').value.trim();
    const contact = document.getElementById('email').value.trim();

    if (!name || !contact) {
        alert('Заполните имя и контакт');
        return;
    }

    fetch('http://155.212.223.179:5000/submit_order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            contact: contact,
            services: cart
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка сети');
        }
        return response.json();
    })
    .then(data => {
        alert('Заказ отправлен! Спасибо! Скоро свяжусь 😊');
        Telegram.WebApp.close();
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Ошибка отправки заказа. Попробуйте позже или напишите мне напрямую.');
    });
}

console.log("Script loaded!");
Telegram.WebApp.ready();
Telegram.WebApp.expand();



