function submitOrder() {
    const name = document.getElementById('name').value.trim();
    const contact = document.getElementById('email').value.trim();

    if (!name || !contact) {
        alert('Заполните имя и контакт');
        return;
    }

    fetch('https://milanabh.beget.tech/submit_order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            contact: contact,
            services: cart  // это массив объектов {name, price}
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Сеть ответила ошибкой');
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


