require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();

// --- 1. WEBHOOK CONFIGURATION (Hidden from Public) ---
// These pull from your .env file so users never see them
const WEBHOOK_MAP = {
    // Contact form webhook
    'contact': process.env.WEBHOOK_CONTACT,

    // Season 3 tournament webhooks
    's3_valorant': process.env.WEBHOOK_S3_VALORANT,
    's3_bgmi': process.env.WEBHOOK_S3_BGMI,
    's3_clashroyale': process.env.WEBHOOK_S3_CLASHROYALE,
    's3_tekken': process.env.WEBHOOK_S3_TEKKEN,
    's3_fc26': process.env.WEBHOOK_S3_FC26
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

// --- 5. LIVE GOOGLE SHEETS ROSTER ROUTE ---
let cachedRoster = null;
let lastFetchTime = 0;
const CACHE_TTL = 5000; // Cache for 5 seconds to prevent rate limiting

app.get('/api/roster', async (req, res) => {
    const now = Date.now();
    if (cachedRoster && (now - lastFetchTime < CACHE_TTL)) {
        return res.json(cachedRoster);
    }

    try {
        const sheetUrl = "https://docs.google.com/spreadsheets/d/1rcY8nvPUIB3w-6A_Oa39UNWwei6Gi5R8kfh8hBKQC8Y/export?format=csv&gid=551249902";
        const response = await fetch(sheetUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch Google Sheet");
        }
        const csvText = await response.text();

        const lines = csvText.split('\n').map(l => l.trim()).filter(Boolean);
        const members = [];
        let currentSection = "General";

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.includes('PLAYSTORM ESPORTS CLUB') || line.includes('Total Member(s)')) continue;
            if (line.startsWith('Discord ID,')) continue; // Header row

            const parts = line.split(',');
            if (parts[0] && !parts[1] && !parts[2]) {
                currentSection = parts[0].replace(/,/g, '').trim();
                continue;
            }

            if (parts.length >= 8 && parts[0] && parts[1]) {
                let photoUrl = null;
                const driveMatch = line.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/);
                const directMatch = line.match(/(https?:\/\/(?:cdn\.discordapp\.com|media\.discordapp\.net)[^\s,]+|https?:\/\/[^\s,]+\.(?:png|jpg|jpeg|webp|gif))/i);

                if (driveMatch && driveMatch[1]) {
                    const fileId = driveMatch[1];
                    photoUrl = `https://lh3.googleusercontent.com/d/${fileId}=w500`;
                } else if (directMatch && directMatch[1]) {
                    photoUrl = directMatch[1].trim();
                }

                members.push({
                    discordId: parts[0]?.trim(),
                    fullName: parts[1]?.trim(),
                    phone: parts[2]?.trim(),
                    deptCode: parts[3]?.trim(),
                    enrollment: parts[4]?.trim(),
                    email: parts[5]?.trim(),
                    dob: parts[6]?.trim(),
                    role: parts[7]?.trim(),
                    status: parts[8]?.trim(),
                    lastUpdated: parts[9]?.trim(),
                    photoUrl: photoUrl,
                    section: currentSection
                });
            }
        }

        cachedRoster = { success: true, members, lastFetched: now };
        lastFetchTime = now;
        res.json(cachedRoster);
    } catch (error) {
        console.error("❌ Error fetching live roster:", error);
        if (cachedRoster) {
            return res.json(cachedRoster);
        }
        res.status(500).json({ error: "Failed to fetch live roster data" });
    }
});

// --- 6. LIVE INSTAGRAM FEED & STATS ROUTE ---
let cachedInsta = null;
let lastInstaFetchTime = 0;
const INSTA_CACHE_TTL = 60000; // Cache for 60 seconds

app.get('/api/instagram', async (req, res) => {
    const now = Date.now();
    if (cachedInsta && (now - lastInstaFetchTime < INSTA_CACHE_TTL)) {
        return res.json(cachedInsta);
    }

    const baselineReels = [
        {
            id: "reel_1",
            title: "1st time at Amity University… and we turned it into a battleground. 🎮🔥",
            tag: "Pinned • BGMI",
            isPinned: true,
            views: "18.5K",
            likes: "1,240",
            comments: "94",
            linkUrl: "https://www.instagram.com/p/DVSxy1mgfrs/",
            thumbnailUrl: "https://scontent-cdg4-2.cdninstagram.com/v/t51.71878-15/641243296_2031604577385739_6630750860363136602_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-cdg4-2.cdninstagram.com&_nc_cat=107&_nc_oc=Q6cZ2gGS_JPJraNk6zXATyrJJ0jzUxvyrhq1y7o3qRnP9JJgl75OqMzkePuF_MYiKvE4d_U&_nc_ohc=7pOtOOn-VYgQ7kNvwFds0oF&_nc_gid=7GSj2C4ab2ozt0gPWSv-4A&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af7fvKHi4WZNkB5EarY3RY25J2CMC_3cfkvYKjRP6AXsGQ&oe=6A0F720D&_nc_sid=10d13b",
            instaShortcode: "DVSxy1mgfrs"
        },
        {
            id: "reel_2",
            title: "Hehe 😛 non gamers ko bhi gamer bana dege 🤙🏻",
            tag: "👑 Most Viewed • Viral",
            isPinned: false,
            views: "35.4K",
            likes: "1,240",
            comments: "41",
            linkUrl: "https://www.instagram.com/p/DWOuSkYCUVo/",
            thumbnailUrl: "https://scontent-cdg4-2.cdninstagram.com/v/t51.71878-15/656005972_2130352561065097_2109240251605278924_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-cdg4-2.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gH284QLa4G6oZGa5VS7IF3w4ADCSchbdYrhkE6_a9RSi6a5IFj5VNvcBS-9W1cNwjo&_nc_ohc=BWQ2oZWhfIMQ7kNvwHsUc3o&_nc_gid=GLeKiJM4QYkboscXWHPIEw&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af6w94My3tctDSed_THntcJ2hyCdXtPhk75b2WL28rY1eg&oe=6A0F64C6&_nc_sid=10d13b",
            instaShortcode: "DWOuSkYCUVo"
        },
        {
            id: "reel_3",
            title: "The only crazy event at amity 🔥",
            tag: "Trending • POV",
            isPinned: false,
            views: "14.2K",
            likes: "1,240",
            comments: "84",
            linkUrl: "https://www.instagram.com/p/DVS-ZrMAQ_u/",
            thumbnailUrl: "https://scontent-cdg4-1.cdninstagram.com/v/t51.71878-15/639746797_3870868599885278_566304567590951049_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-cdg4-1.cdninstagram.com&_nc_cat=102&_nc_oc=Q6cZ2gGWRwXzwK6mmPtQOcXbgFRu7OreV1n5JX7EjUMhC8jBL_Zdq2zRYkGsHdQS3RY2muU&_nc_ohc=N6y8BGQj14sQ7kNvwFwapnN&_nc_gid=jiRH0Nc2vSJ3vGyO5yopQg&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af4HvhSdug_IOScSmU-mCUH3T8fUMjRjG6F1f7m8-XPMAA&oe=6A0F5106&_nc_sid=10d13b",
            instaShortcode: "DVS-ZrMAQ_u"
        }
    ];

    try {
        // console.log("🔄 Fetching 100% LIVE Instagram data for @playstorm.amity...");
        let liveData = null;

        // Strategy 1: Fetch live embed metadata for the 3 target reels via public CORS proxy
        // console.log("🔄 Fetching 100% LIVE Instagram embed data for 3 target reels...");
        const targetShortcodes = ["DVSxy1mgfrs", "DWOuSkYCUVo", "DVS-ZrMAQ_u"];
        const reels = await Promise.all(targetShortcodes.map(async (code, idx) => {
            const baseReel = baselineReels[idx];
            try {
                const proxyUrl = `https://api.codetabs.com/v1/proxy/?quest=https://www.instagram.com/p/${code}/embed/captioned/`;
                const response = await fetch(proxyUrl, {
                    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
                });
                if (response.ok) {
                    const htmlText = await response.text();

                    let caption = baseReel.title;
                    const captionMatch = htmlText.match(/<div class="Caption"[^>]*>([\s\S]*?)<\/div>/i);
                    if (captionMatch) {
                        caption = captionMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
                    } else {
                        const ogDescMatch = htmlText.match(/property="og:description" content="([^"]+)"/i);
                        if (ogDescMatch) caption = ogDescMatch[1];
                    }

                    let thumbnail = baseReel.thumbnailUrl;
                    const imgMatch = htmlText.match(/<img[^>]+class="EmbeddedMediaImage[^>]+src="([^"]+)"/i);
                    if (imgMatch) {
                        thumbnail = imgMatch[1].replace(/&amp;/g, '&');
                    } else {
                        const ogImgMatch = htmlText.match(/property="og:image" content="([^"]+)"/i);
                        if (ogImgMatch) thumbnail = ogImgMatch[1].replace(/&amp;/g, '&');
                    }

                    let likes = baseReel.likes;
                    const likesMatch = htmlText.match(/<span class="SocialProof[^>]*>([\s\S]*?)<\/span>/i) || htmlText.match(/([\d,]+)\s+likes/i);
                    if (likesMatch) {
                        likes = likesMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').replace(/likes?/i, '').trim() || baseReel.likes;
                    }

                    let comments = baseReel.comments;
                    const commMatch = htmlText.match(/View all ([\d,]+) comments/i) || htmlText.match(/([\d,]+)\s+comments/i);
                    if (commMatch) {
                        comments = commMatch[1] || baseReel.comments;
                    }

                    return {
                        id: baseReel.id,
                        title: caption,
                        tag: baseReel.tag,
                        isPinned: baseReel.isPinned,
                        views: baseReel.views,
                        likes: likes,
                        comments: comments,
                        linkUrl: baseReel.linkUrl,
                        thumbnailUrl: thumbnail,
                        instaShortcode: code
                    };
                }
            } catch (e) {
                console.log(`Embed fetch failed for ${code}:`, e.message);
            }
            return baseReel;
        }));

        // Strategy 2: Fetch live profile metadata via CodeTabs proxy
        // console.log("🔄 Fetching live profile HTML scraping...");
        const htmlProxy = 'https://api.codetabs.com/v1/proxy/?quest=https://www.instagram.com/playstorm.amity/';
        const htmlRes = await fetch(htmlProxy, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });

        let followers = 999, following = 16, posts = 113, avatarUrl = null;
        if (htmlRes.ok) {
            const htmlText = await htmlRes.text();
            const metaMatch = htmlText.match(/content="([^"]+Followers,[^"]+Following,[^"]+Posts[^"]*)"/i);
            if (metaMatch && metaMatch[1]) {
                const parts = metaMatch[1].split(',');
                followers = parts[0]?.replace(/[^0-9KM.]/g, '') || followers;
                following = parts[1]?.replace(/[^0-9KM.]/g, '') || following;
                posts = parts[2]?.replace(/[^0-9KM.]/g, '') || posts;
            }

            const ogImageMatch = htmlText.match(/property="og:image"\ content="([^"]+)"/i);
            avatarUrl = ogImageMatch ? ogImageMatch[1] : null;
        }

        liveData = {
            success: true,
            live: true,
            profile: {
                username: "playstorm.amity",
                name: "Official eSports Club of Amity University, Noida",
                posts: posts,
                followers: followers,
                following: following,
                verified: true,
                avatarUrl: avatarUrl
            },
            reels: reels,
            lastFetched: now
        };

        if (liveData) {
            // console.log("✅ Successfully fetched 100% LIVE Instagram data!");
            cachedInsta = liveData;
            lastInstaFetchTime = now;
            return res.json(cachedInsta);
        }

        throw new Error("All live scraping strategies failed");
    } catch (error) {
        console.error("❌ Error fetching live Instagram data, using fallback:", error.message);
        if (cachedInsta) {
            return res.json(cachedInsta);
        }
        const fallbackData = {
            success: true,
            live: false,
            profile: {
                username: "playstorm.amity",
                name: "Official eSports Club of Amity University, Noida",
                posts: 113,
                followers: 999,
                following: 16,
                verified: true,
                avatarUrl: null
            },
            reels: baselineReels,
            lastFetched: now
        };
        res.json(fallbackData);
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