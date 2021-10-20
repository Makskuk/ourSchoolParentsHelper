'use strict';

const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');

// read config file
const botId = JSON.parse(fs.readFileSync('bot-cfg.json'));

// start bot
const bot = new TelegramBot(botId.token, {polling: true});

const HELP = 'help';
const START = 'start';

bot.on('message', (msg) => {
	if (!msg.text.startsWith('/')) {
        bot.sendMessage(msg.chat.id, "message from "+msg.from.first_name+": "+msg.text);
        return;
    }
});

bot.onText(/\/help/, (msg) => {
	bot.sendMessage(msg.chat.id, "print help");
})

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Hello, "+msg.from.first_name+"!");
})
