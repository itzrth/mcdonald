const mineflayer = require('mineflayer');
const express = require('express');  // <--- This was missing
const app = express();

app.get('/', (req, res) => {
  res.send('Bot is alive ✅');
});

app.listen(3000, () => {
  console.log('🌐 Web server running on port 3000');
});

function createBot() {
  const bot = mineflayer.createBot({
    host: 'Donutsmp.net', // Server IP
    username: 'roheith.mc@outlook.com', // Microsoft account email
    auth: 'microsoft'
  });

  bot.on('spawn', () => {
    console.log('✅ Bot spawned on premium account!');

    // Wait to ensure we're in the game before sending commands
    setTimeout(() => {
      bot.chat('/afk');
      console.log('📢 Sent /afk');
    }, 2000);

    // After AFK command, wait more and then send "7"
    setTimeout(() => {
      bot.chat('7');
      console.log('📢 Sent 7');
    }, 4000);
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message === 'hello bot') {
      bot.chat(`Hello ${username}`);
    }
  });

  bot.on('kicked', (reason) => {
    console.log('❌ Kicked:', reason);
    reconnect();
  });

  bot.on('end', () => {
    console.log('⚠️ Bot disconnected');
    reconnect();
  });

  bot.on('error', (err) => {
    console.log('⚠️ Error:', err);
  });
}

function reconnect() {
  console.log('🔄 Reconnecting in 5 seconds...');
  setTimeout(() => {
    createBot();
  }, 5000);
}

// Start first bot instance
createBot();
