const bedrock = require('bedrock-protocol');

function createBot() {
    console.log("--- 🚀 AUTO-DETECT MODE: Connecting to Aternos ---");

    const client = bedrock.createClient({
        host: 're_qzl.aternos.me',
        port: 56528, 
        username: 'AternosBot_247',
        offline: true,
        // حذفنا سطر الـ version تماماً ليتم اكتشافه تلقائياً
        skipPing: true,
        connectTimeout: 60000
    });

    client.on('spawn', () => {
        console.log("✅ SUCCESS: Bot is ONLINE via Auto-Detect!");
        
        // نظام الحركة لمنع الطرد (AFK)
        setInterval(() => {
            if (client.status === 'active') {
                console.log("🏃 Bot is moving to stay active...");
                client.write('player_auth_input', {
                    pitch: 0, yaw: 0, position: { x: 0, y: 0, z: 0 },
                    move_vector: { x: 0.1, z: 0.1 }, head_yaw: 0, input_data: { forward: true },
                    input_mode: 'mouse', play_mode: 'screen', interaction_model: 'touch'
                });
            }
        }, 60000); // حركة بسيطة كل دقيقة
    });

    client.on('disconnect', (packet) => {
        console.log("❌ DISCONNECTED: " + (packet.reason || "Check Aternos Console"));
        setTimeout(createBot, 15000); 
    });

    client.on('error', (err) => {
        console.log("⚠️ ERROR: " + err.message);
    });
}

createBot();
