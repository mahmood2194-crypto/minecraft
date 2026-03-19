const bedrock = require('bedrock-protocol');

function createBot() {
    console.log("--- 🚀 BASIC MODE: Connecting to Aternos ---");

    const client = bedrock.createClient({
        host: 're_qzl.aternos.me',
        port: 56528, 
        username: 'AternosKeeper',
        offline: true,
        // These settings fixed the "Outdated Client" and "Timeout" before
        skipPing: true,
        connectTimeout: 60000
    });

    client.on('spawn', () => {
        console.log("✅ SUCCESS: Bot is ONLINE!");
        
        // Simple Jump every 60 seconds to prevent AFK kick
        setInterval(() => {
            if (client.status === 'active') {
                console.log("🤖 Anti-AFK: Jumping...");
                client.write('player_auth_input', {
                    pitch: 0, yaw: 0, position: { x: 0, y: 0, z: 0 },
                    move_vector: { x: 0, z: 0 }, head_yaw: 0, 
                    input_data: { jump_down: true }, 
                    input_mode: 'mouse', play_mode: 'screen', interaction_model: 'touch'
                });
            }
        }, 60000); 
    });

    client.on('disconnect', (packet) => {
        console.log("❌ DISCONNECTED: " + (packet.reason || "Timeout"));
        // Wait 15 seconds before retrying
        setTimeout(createBot, 15000); 
    });

    client.on('error', (err) => {
        console.log("⚠️ ERROR: " + err.message);
    });
}

createBot();
