let cart = [];

function addToCart(serviceName, price) {
    cart.push({ name: serviceName, price: price });
    updateCart();
}

function updateCart() {
    const count = cart.length;
    document.getElementById('cart-count').textContent = count;
    document.getElementById('cart-count').style.display = count > 0 ? 'flex' : 'none';
    
    const checkoutBtn = document.getElementById('checkout-button');
    checkoutBtn.style.display = count > 0 ? 'block' : 'none';
}

function checkout() {
    if (cart.length === 0) return;
    
    let message = "🛒 Привет! Хочу заказать услуги:\n\n";
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n   Цена: ${item.price}\n\n`;
    });
    message += `Всего услуг: ${cart.length}\n\nЖду связи!`;

    const botUsername = "Sirius_Yarko_Shop_Bot";

    Telegram.WebApp.openTelegramLink(`https:\/\/t.me/${botUsername}?text=${encodeURIComponent(message)}`);
    Telegram.WebApp.close();
}

Telegram.WebApp.ready();
Telegram.WebApp.expand();



