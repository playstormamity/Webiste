# Leaderboard Page

The `Leaderboard` page tracks the performance and rankings of individual players and teams within the PlayStorm community.

## Route
`/leaderboard`

## Features
- **Global Ranking**: A top-tier ranking of all registered club members based on tournament performance and participation.
- **Game-Specific Boards**: Tabs to switch between rankings for different games (e.g., Valorant, BGMI, Chess).
- **Player Stats**: Individual profile highlights showing win rates, rank progress, and recent achievements.
- **Season Tracking**: Information about the current competitive season and when it resets.

## Components Used
- `Layout`: Provides the global structure.
- `VisualEffects` (TiltCard): Used for the top 3 player highlights to give them a "premium" feel.
- `BentoGrid`: Used for displaying overall community stats.

## Data Source
Rankings are dynamically updated based on tournament results stored in the database.
