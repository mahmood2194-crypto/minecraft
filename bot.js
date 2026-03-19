const bedrock = require('bedrock-protocol');

function createBot() {
    console.log("--- 🚀 Connecting to Aternos Bedrock (re_qzl) ---");

    const client = bedrock.createClient({
        host: 're_qzl.aternos.me',   // Your Server Address
        port: 56528,                 // Your Port
        username: 'AternosKeeper',   // Bot Name
        offline: true                // For Cracked servers
    });

    client.on('spawn', () => {
        console.log("✅ SUCCESS: Bot is ONLINE and protecting the server!");
    });

    client.on('disconnect', (packet) => {
        console.log("❌ DISCONNECTED: " + packet.reason);
        console.log("--- Retrying in 10 seconds... ---");
        setTimeout(createBot, 10000);
    });

    client.on('error', (err) => {
        console.log("⚠️ ERROR: " + err.message);
    });
}

createBot();
