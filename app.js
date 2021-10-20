'use strict';

const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const sqlite3 = require('sqlite3');

var app = {
    cfg: null,
    db:  null,
    bot: null,
};

exports.init = function(cfgFile, callback) {
    app.cfg = JSON.parse(fs.readFileSync(cfgFile));

    if(!callback)
        callback = console.log;

    if (!app.cfg.db || !app.cfg.db.length) {
        callback("No DB specified in config file");
        return;
    } else {
        app.db = new sqlite3.Database(app.cfg.db, function(err) {
            if (!!err) {
                callback(err.message);
            }
            console.log("connected to SQLite3 DB "+app.cfg.db);
        });
    }

    if (!app.cfg.token || !app.cfg.token.length) {
        callback("No telegram token specified in config file");
        return;
    } else {
        app.bot = new TelegramBot(app.cfg.token, {polling: true});
        console.log("Telegram bot started");
    }

    callback(null);
}

exports.close = function() {
    if (!!app.db) {
        app.db.close(function(err){
            if(!!err)
                console.log(err.message);
            else
                console.log("DB closed");
            process.exit();
        });
    }
}

exports.bot = () => app.bot;
exports.db  = () => app.db;
exports.cfg = () => app.cfg;