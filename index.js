'use strict';

const app = require("./app.js");

// read config file
app.init('bot-cfg.json', function(err){
    if (!!err) {
        console.log(err);
        return -1;
    }

    app.bot().onText(/\/help/, (msg) => {
    	app.bot().sendMessage(msg.chat.id, "print help");
    })

    app.bot().onText(/\/start/, (msg) => {
        app.bot().sendMessage(msg.chat.id, "Hello, "+msg.from.first_name+"!");
    })
});

app.bot().on('message', (msg) => {
	if (!msg.text.startsWith('/')) {
        app.bot().sendMessage(msg.chat.id, "message from "+msg.from.first_name+": "+msg.text);
        return;
    }
});


process.on('SIGINT', app.close);
process.on('SIGTERM', app.close);