const bedrock = require('bedrock-protocol');

function createBot() {
    console.log("--- 🚀 Connecting to Aternos (Anti-AFK Movement Mode) ---");

    const client = bedrock.createClient({
        host: 're_qzl.aternos.me',
        port: 56528, // تأكد دائماً أن هذا الرقم مطابق لموقع أترنوس حالياً
        username: 'AternosKeeper',
        offline: true,
        connectTimeout: 60000 // وقت انتظار أطول لتجنب الـ Timeout
    });

    client.on('spawn', () => {
        console.log("✅ SUCCESS: Bot is ONLINE and moving!");

        // Anti-AFK Logic: Move every 5 minutes
        setInterval(() => {
            if (client.status === 'active') {
                console.log("🏃 Bot is performing the 5-step movement walk...");
                
                // حركة للأمام (5 خطوات تقريباً)
                client.write('player_auth_input', {
                    pitch: 0, yaw: 0, position: { x: 0, y: 0, z: 0 },
                    move_vector: { x: 1, z: 0 }, head_yaw: 0, input_data: { forward: true },
                    input_mode: 'mouse', play_mode: 'screen', interaction_model: 'touch'
                });

                // توقف ثم عودة للخلف بعد ثانيتين
                setTimeout(() => {
                    client.write('player_auth_input', {
                        pitch: 0, yaw: 0, position: { x: 0, y: 0, z: 0 },
                        move_vector: { x: -1, z: 0 }, head_yaw: 0, input_data: { backward: true },
                        input_mode: 'mouse', play_mode: 'screen', interaction_model: 'touch'
                    });
                    console.log("↩️ Bot returned to original position.");
                }, 2000); 
            }
        }, 300000); // تكرار كل 300,000 مللي ثانية (أي 5 دقائق)
    });

    client.on('disconnect', (packet) => {
        console.log("❌ DISCONNECTED: " + (packet.reason || "Server Closed"));
        console.log("--- Reconnecting in 20 seconds... ---");
        setTimeout(createBot, 20000);
    });

    client.on('error', (err) => {
        console.log("⚠️ ERROR: " + err.message);
        if (err.message.includes('timeout')) {
            console.log("👉 Tip: Check if Aternos Server is ONLINE and Port is correct.");
        }
    });
}

createBot();
