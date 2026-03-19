const bedrock = require('bedrock-protocol');

function createBot() {
    console.log("--- 🚀 Force Connecting to Aternos (Skip Ping Mode) ---");

    const client = bedrock.createClient({
        host: 're_qzl.aternos.me',
        port: 56528, 
        username: 'AternosKeeper',
        offline: true,
        // هذه الإعدادات تحل مشكلة الـ Timeout في ريندر:
        connectTimeout: 90000, 
        skipPing: true, // تخطي اختبار البينج للدخول السريع
        version: '1.20.1' // إصدار بروتوكول مستقر
    });

    client.on('spawn', () => {
        console.log("✅ SUCCESS: Bot is ONLINE and moving!");

        // Anti-AFK Logic: Move every 2 minutes
        setInterval(() => {
            if (client.status === 'active') {
                console.log("🏃 Bot is performing Anti-AFK movement...");
                
                // حركة للأمام
                client.write('player_auth_input', {
                    pitch: 0, yaw: 0, position: { x: 0, y: 0, z: 0 },
                    move_vector: { x: 1, z: 0 }, head_yaw: 0, input_data: { forward: true },
                    input_mode: 'mouse', play_mode: 'screen', interaction_model: 'touch'
                });

                // العودة للخلف بعد ثانيتين
                setTimeout(() => {
                    client.write('player_auth_input', {
                        pitch: 0, yaw: 0, position: { x: 0, y: 0, z: 0 },
                        move_vector: { x: -1, z: 0 }, head_yaw: 0, input_data: { backward: true },
                        input_mode: 'mouse', play_mode: 'screen', interaction_model: 'touch'
                    });
                }, 2000); 
            }
        }, 120000); // كل دقيقتين لضمان عدم الطرد
    });

    client.on('disconnect', (packet) => {
        console.log("❌ DISCONNECTED: " + (packet.reason || "Server Closed"));
        setTimeout(createBot, 15000); // إعادة محاولة بعد 15 ثانية
    });

    client.on('error', (err) => {
        console.log("⚠️ CONNECTION ERROR: " + err.message);
    });
}

createBot();
