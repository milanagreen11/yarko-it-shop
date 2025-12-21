import telebot

TOKEN = '8130399116:AAEB9Fd8cvUEK61rtpWa-18bB0cHFOjIEgw'
ADMIN_ID = 52390006573

bot = telebot.TeleBot(TOKEN)

@bot.message_handler(content_types=['web_app_data'])
def handle_web_app_data(message):
    order_text = message.web_app_data.data
    bot.send_message(ADMIN_ID, f"🎉 Новый заказ от клиента!\n\n{order_text}\n\nID клиента: {message.chat.id}")

@bot.message_handler(commands=['start'])
def start(message):
    bot.send_message(message.chat.id, "Добро пожаловать! Нажмите кнопку внизу, чтобы открыть магазин IT-услуг 🛒")

@bot.message_handler(text=['Тест'])
def test(message):
    bot.send_message(message.chat.id, "Питон в порядке!")

print("Бот запущен и ждёт заказы!")
bot.infinity_polling()

