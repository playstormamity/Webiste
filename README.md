<div align="center">
  
  # ⚡ PlayStorm Esports Platform
  **The Official eSports Club of Amity University, Noida**
  
  <p align="center">
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" /></a>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" /></a>
    <a href="https://discord.com/"><img src="https://img.shields.io/badge/Discord_Webhooks-5865F2?style=for-the-badge&logo=discord&logoColor=white" /></a>
  </p>

  *A high-performance, dark-mode-first web platform powering massive inter-college gaming tournaments, dynamic rosters, and live community engagement.*
</div>

---

## 🚀 The Core Engine

PlayStorm is built to be **fast, highly visual, and fully automated**. We ditched standard database setups to create a lightweight, high-performance infrastructure that connects directly with our community tools.

### 🔥 Key Features
*   **Dynamic Discord Registration Webhooks**: Fully automated registration portals (`/s3`) that directly feed deeply structured embeds (with Riot IDs and BGMI UIDs) straight into designated Discord admin channels.
*   **Interactive 3D Cosmic Nebular Grid**: A high-performance `<canvas>` background layer drawing dynamic multi-frequency sine wave wireframes, cursor attraction gravity distortion, and particle stardust swarms. Throttles grid density dynamically on mobile to save CPU/GPU cycles and battery life.
*   **Stale-While-Revalidate Caching**: Pre-fetches Google Sheets roster databases and Instagram feeds on server startup. Delivers cached payloads instantly (under 10ms!) in background threads with dynamic TTL-based refreshes, eliminating loading delays for visitors.
*   **Webkit Rendering & Composition Fixes**: Handled browser composition bugs where nested/overlapping `backdrop-blur` filters under hardware-accelerated parent transitions caused player cards to render as solid black blocks in Brave and Safari. Replaced with highly premium, solid translucent dark glassmorphism backings (`bg-black/75`).
*   **Real-Time Admin Telemetry Dashboard**: Access a looksmaxed system terminal at `/admin` (Tier 1 Secure auth displaying:
    *   *Hardware Metrics*: Live average CPU load (flushing with M1 Pro core configurations) and host OS uptime.
    *   *Backend Diagnostics*: Node.js process RSS memory footprint, JavaScript heap usage, runtime details, and process PID.
    *   *Client Web App Metrics*: Dynamic client browser memory heap usage (`performance.memory.usedJSHeapSize`), interactive `requestAnimationFrame` canvas FPS counters (running at a fluid 60fps/120fps), initial page load speed, and screen sizes.
    *   *API Cache Control Console*: Functional Cache refresh buttons (`Force Sync Roster`, `Force Sync Insta`) to trigger immediate, live API database refreshes on command.
    *   *Secure Webhook Verification Matrix*: Confirms integrations of hidden Discord webhook channels configured inside `.env`.
*   **Dynamic Navbar & Navigation Isolation**: When logged in as admin, the layout dynamically clears standard public links and restructures the header and mobile navigation to show only the administrative cockpit links (`Dashboard`, `Lineups`, `Leaderboard`, `Register`, `Pro Arena`, `Logout`) with no public clutter.

---

## 🛠 Tech Stack Overview

### Frontend (`/client`)
*   **React 18 + Vite**: Lightning-fast HMR and optimized production builds.
*   **TailwindCSS**: Pure utility-first styling focusing on deep purples, neon pinks, and custom spacing.
*   **Framer Motion**: Micro-animations, page transitions, and hover states.
*   **Lucide React**: Clean, minimal SVG iconography.

### Backend (`/server`)
*   **Node.js & Express**: A lightweight relay API server bridging the frontend to third-party services.
*   **Instagram Proxy API**: Custom data scraping endpoints to power the live social showcase.
*   **Webhook Dispatcher**: Handles JSON structuring for Discord integration.

---

## ⚡ Getting Started (Local Dev)

The repository is structured as a monorepo containing both the React frontend and the Node.js backend. 

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18+) and npm installed.

### 2. Environment Variables
Create a `.env` file in the root directory and add your backend credentials (for Discord & Google Sheets):
```env
# Discord Webhook URLs for Game Registrations
DISCORD_WEBHOOK_VALORANT="https://discord.com/api/webhooks/.../..."
DISCORD_WEBHOOK_BGMI="https://discord.com/api/webhooks/.../..."
DISCORD_WEBHOOK_CLASH_ROYALE="https://discord.com/api/webhooks/.../..."
DISCORD_WEBHOOK_TEKKEN="https://discord.com/api/webhooks/.../..."
DISCORD_WEBHOOK_FC26="https://discord.com/api/webhooks/.../..."

# Roster Database
GOOGLE_SHEET_CSV_URL="https://docs.google.com/spreadsheets/d/..."
```

### 3. Install & Run
We use `concurrently` to boot up the entire stack with a single command!

```bash
# Install dependencies for both root and client
npm install

# Start both the Express Backend (Port 3000) and Vite Frontend (Port 5173)
npm run dev
```

---

## 📁 Repository Architecture

```text
📦 playstorm-website
 ┣ 📂 client                  # Frontend (Vite + React)
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 assets              # 128x128 game avatars, tournament posters
 ┃ ┃ ┣ 📂 components          # Layouts, Navbar, InstagramShowcase
 ┃ ┃ ┗ 📂 pages               # Home, Events, Roster, Season3
 ┃ ┣ 📜 index.css             # Tailwind directives & global animations
 ┃ ┗ 📜 vite.config.js        # Vite config with API reverse proxy
 ┣ 📜 index.js                # Express Backend Entry Point
 ┣ 📜 package.json            # Root scripts (npm run dev)
 ┗ 📜 .env                    # Webhook URLs and Sheet configurations
```

---

<div align="center">
  <p><i>"Competitive. Inclusive. Future-Ready."</i></p>
  <b>Developed for the <a href="https://instagram.com/playstorm.amity">PlayStorm Esports Community</a>.</b>
</div>
