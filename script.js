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
    }

    document.getElementById('payment-form').style.display = 'none';
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

    let message = `🛒 Новый заказ!\n\nИмя: ${name}\nКонтакт: ${contact}\n\nУслуги:\n`;
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} — ${item.price}\n`;
    });

    const botUsername = "Sirius_Yarko_Shop_Bot";  // проверь свой username бота без @

    Telegram.WebApp.openTelegramLink(`https://t.me/${botUsername}?text=${encodeURIComponent(message)}`);
    Telegram.WebApp.close();
}

Telegram.WebApp.ready();
Telegram.WebApp.expand();
