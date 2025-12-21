import telebot

TOKEN = '8130399116:AAEB9Fd8cvUEK61rtpWa-18bB0cHFOjIEgw'
ADMIN_ID = 123234345

bot = telebot.TeleBot(TOKEN)

@bot.message_handler(content_types=['web_app_data'])
def handle_web_app_data(message):
    order_text = message.web_app_data.data
    bot.send_message(ADMIN_ID, f"🎉 Новый заказ!\n\n{order_text}")

@bot.message_handler(commands=['start'])
def start(message):
    bot.send_message(message.chat.id, "Бот для магазина готов! Откройте Mini App.")

print("Бот запущен!")
bot.infinity_polling()