const mineflayer = require('mineflayer');
const http = require('http');

// --- 1. سيرفر ويب صغير لإرضاء منصة Render ---
http.createServer((req, res) => {
  res.write("Bot is running!");
  res.end();
}).listen(process.env.PORT || 8080);

// --- 2. إعدادات البوت ---
const botArgs = {
  host: 're_qzl-7VTL.aternos.me', // ضع رابط سيرفرك هنا
  port: 27872,                    // البورت الافتراضي
  username: 'botalbot',         // اسم البوت
  version: '1.21.11'               // إصدار ماين كرافت الخاص بك
};

let bot;

function createBot() {
  bot = mineflayer.createBot(botArgs);

  bot.on('spawn', () => {
    console.log('✅ البوت دخل السيرفر بنجاح!');
    startAntiAFK();
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message === 'ping') bot.chat('pong!');
  });

  // إعادة الاتصال التلقائي في حال الخروج
  bot.on('end', () => {
    console.log('⚠️ فصل البوت، جارِ إعادة الاتصال خلال 10 ثوانٍ...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => console.log('❌ خطأ:', err));
}

// --- 3. نظام الحركة التلقائية (Anti-AFK) ---
function startAntiAFK() {
  setInterval(() => {
    if (!bot.entity) return;
    
    const actions = ['forward', 'back', 'left', 'right', 'jump'];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    
    bot.setControlState(randomAction, true);
    setTimeout(() => {
      bot.setControlState(randomAction, false);
    }, 1000); // يتحرك لمدة ثانية واحدة
  }, 40000); // يكرر العملية كل 40 ثانية
}

createBot();
