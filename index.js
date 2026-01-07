require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();

// --- 1. WEBHOOK CONFIGURATION (Hidden from Public) ---
// These pull from your .env file so users never see them
const WEBHOOK_MAP = {
    // Regular tournaments
    'valorant': process.env.WEBHOOK_VALORANT,
    'bgmi': process.env.WEBHOOK_BGMI,
    'amongus': process.env.WEBHOOK_AMONGUS,
    'codm': process.env.WEBHOOK_CODM,
    'minecraft': process.env.WEBHOOK_MINECRAFT,
    'clashroyale': process.env.WEBHOOK_CLASHROYALE,
    'tekken': process.env.WEBHOOK_TEKKEN,
    'roblox': process.env.WEBHOOK_ROBLOX,

    // Lineups registration (competitive trials)
    'lineups_bgmi': process.env.WEBHOOK_LINEUPS_BGMI,
    'lineups_valorant': process.env.WEBHOOK_LINEUPS_VALORANT,
    'lineups_dota2': process.env.WEBHOOK_LINEUPS_DOTA2,
    'lineups_mlbb': process.env.WEBHOOK_LINEUPS_MLBB,
    'lineups_freefire_max': process.env.WEBHOOK_LINEUPS_FREEFIRE_MAX,
    'lineups_cs2': process.env.WEBHOOK_LINEUPS_CS2,
    'lineups_codm': process.env.WEBHOOK_LINEUPS_CODM,
    
    // Pro Arena event (separate webhooks)
    'proarena_valorant': process.env.WEBHOOK_PROARENA_VALORANT,
    'proarena_bgmi': process.env.WEBHOOK_PROARENA_BGMI,
    'proarena_zone': process.env.WEBHOOK_PROARENA_ZONE
};

// --- 2. SERVER CONFIG ---
app.use(express.json());
// Serve the built React files
app.use(express.static(path.join(__dirname, 'client/dist')));

// --- 4. SECURE DISCORD PROXY ROUTE ---
app.post('/api/register-discord', async (req, res) => {
    const { game, payload } = req.body;

    // Security Check: Does the game exist in our map?
    const targetWebhook = WEBHOOK_MAP[game];

    if (!targetWebhook) {
        console.error(`❌ Error: No webhook found for game "${game}"`);
        return res.status(400).json({ error: "Invalid game or webhook configuration missing in .env" });
    }

    try {
        console.log(`✅ Sending ${game} registration to Discord...`);
        
        // Send to Discord
        const response = await fetch(targetWebhook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log(`✅ Successfully sent ${game} registration to Discord`);
            res.json({ success: true });
        } else {
            const errText = await response.text();
            console.error("❌ Discord API Error:", errText);
            res.status(500).json({ error: "Discord rejected the request" });
        }
    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// --- 3. REACT ROUTER SUPPORT ---
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

// --- START SERVER ---
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`🚀 PlayStorm Server running on port ${PORT}`);
});