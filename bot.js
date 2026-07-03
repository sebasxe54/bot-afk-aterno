const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// CONFIGURACIÓN YA COMPLETA CON TUS DATOS
const CONFIG = {
  host: 'sebas54fsff-kfu1.aternos.me',
  port: 56465,
  username: 'BotAFK1',
  version: false // Detecta versión automáticamente
};

// Función para conectar y reconectar si se cae
function iniciarBot() {
  const bot = mineflayer.createBot(CONFIG);

  bot.on('spawn', () => {
    console.log('✅ Bot conectado exitosamente');
    // Mantiene actividad para no ser expulsado
    setInterval(() => {
      bot.look(bot.entity.yaw + (Math.random() * 0.4 - 0.2), 0);
      if (Math.random() > 0.6) bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 200);
    }, 25000);
  });

  bot.on('end', () => {
    console.log('🔄 Desconectado, volviendo a intentar en 8 segundos...');
    setTimeout(iniciarBot, 8000);
  });

  bot.on('error', err => console.log('❌ Error:', err.message));
}

iniciarBot();

// Mantiene el servicio activo en Render
app.get('/', (req, res) => res.send('✅ Bot AFK funcionando 24/7'));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('🌐 Servidor listo'));
