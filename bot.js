const bedrock = require('bedrock-protocol');

function createBot() {
    console.log("--- 🚀 RELAXED MODE: Connecting to Aternos ---");

    const client = bedrock.createClient({
        host: 're_qzl.aternos.me',
        port: 56528, 
        username: 'AternosKeeper',
        offline: true,
        // No version specified = Auto-detect (Safest)
        skipPing: true,
        connectTimeout: 90000 
    });

    client.on('spawn', () => {
        console.log("✅ SUCCESS: Bot is ONLINE!");
        
        // Simple Jump every 2 minutes (Slow and safe)
        setInterval(() => {
            if (client.status === 'active') {
                console.log("🤖 Anti-AFK: Keeping active...");
                client.write('player_auth_input', {
                    pitch: 0, yaw: 0, position: { x: 0, y: 0, z: 0 },
                    move_vector: { x: 0, z: 0 }, head_yaw: 0, 
                    input_data: { jump_down: true }, 
                    input_mode: 'mouse', play_mode: 'screen', interaction_model: 'touch'
                });
            }
        }, 120000); // 2 minutes delay
    });

    client.on('disconnect', (packet) => {
        console.log("❌ DISCONNECTED: " + (packet.reason || "Timeout"));
        // Wait longer before retrying (Important to avoid IP ban)
        setTimeout(createBot, 30000); 
    });

    client.on('error', (err) => {
        console.log("⚠️ ERROR: " + err.message);
    });
}

createBot();
