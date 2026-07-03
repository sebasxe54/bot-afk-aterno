const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

const CONFIG = {
  host: 'sebas54fsff-kfu1.aternos.me:56465',
  port: 12345,
  username: 'BotAFK1',
  version: '1.21.11'
};

const bot = mineflayer.createBot(CONFIG);

bot.on('spawn', () => {
  console.log('Conectado');
  setInterval(() => {
    bot.look(bot.entity.yaw + 0.3, 0);
    if (Math.random() > 0.7) bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 250);
  }, 22000);
});

bot.on('end', () => setTimeout(() => process.exit(1), 6000));
bot.on('error', err => console.log(err.message));

app.get('/', (req, res) => res.send('Bot activo'));
const PORT = process.env.PORT || 8080;
app.listen(PORT);