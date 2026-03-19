const bedrock = require('bedrock-protocol');

function createBot() {
    console.log("--- 🚀 Connecting with Anti-AFK Mode ---");

    const client = bedrock.createClient({
        host: 're_qzl.aternos.me',
        port: 56528,
        username: 'AternosKeeper',
        offline: true
    });

    client.on('spawn', () => {
        console.log("✅ SUCCESS: Bot is ONLINE!");
        
        // Anti-AFK Loop: Jump or move every 30 seconds
        setInterval(() => {
            if (client.status === 'active') {
                console.log("🤖 Anti-AFK: Performing a small jump...");
                // Note: Bedrock protocol commands for movement vary, 
                // but staying active in the protocol usually prevents the kick.
                client.write('player_auth_input', {
                    pitch: 0, yaw: 0, position: { x: 0, y: 0, z: 0 },
                    move_vector: { x: 0, z: 0 }, head_yaw: 0, input_data: { jump_down: true },
                    input_mode: 'mouse', play_mode: 'screen', interaction_model: 'touch'
                });
            }
        }, 30000); // Every 30 seconds
    });

    client.on('disconnect', (packet) => {
        console.log("❌ DISCONNECTED: " + (packet.reason || "Server Closed"));
        console.log("--- Reconnecting in 20 seconds... ---");
        setTimeout(createBot, 20000);
    });

    client.on('error', (err) => {
        console.log("⚠️ ERROR: " + err.message);
    });
}

createBot();
