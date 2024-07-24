process.env["NTBA_FIX_350"] = 1;
const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const app = express();

const axios = require("axios");
require("dotenv").config();

const fs = require("fs");
const path = require("path");

// Replace with your actual bot token

const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });
const gameImagePath = path.join(__dirname, "images", "sticker.png");
const gameImage = fs.readFileSync(gameImagePath);

// Handle /start command
bot.onText(/\/start/, async (msg, match) => {
  const chatId = msg.chat.id;
  bot
    .sendPhoto(chatId, gameImage, {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            {
              text: "Play Jumping Game",
              url: `https://donkeyhop.onrender.com?chatId=${chatId}`,
            },
          ],
        ],
      }),
    })
    .then(() => {});
});
bot.onText(/\/sendMessage/, async (msg, match) => {
  console.log(match);
});
// Handle errors
bot.on("polling_error", (error) => {
  console.log(error);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(4000, () => {
  console.log(`Example app listening on port 4000`);
});
