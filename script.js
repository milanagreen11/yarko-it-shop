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
    
    let message = "🛒 Новый заказ в IT-магазине!\n\n";
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n   Цена: ${item.price}\n\n`;
    });
    message += `Всего услуг: ${cart.length}`;
    
    Telegram.WebApp.sendData(message);
    Telegram.WebApp.close();
}
