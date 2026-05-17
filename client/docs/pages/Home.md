# Home Page

The `Home` page is the landing page of the PlayStorm Esports Club website. It introduces the club, its mission, and highlights key areas of interest using a Bento-style layout.

## Route
`/` (Root)

## Features
- **Hero Section**: Features a large, animated "PLAYSTORM" title with a "Gen Z" aesthetic, including floating particles and glowing background blobs.
- **Club Mission**: A concise statement about the club's goals (Competitive, Inclusive, Future-ready).
- **Interactive Bento Grid**: A visually dense grid containing:
    - Featured events and registrations.
    - Information about the Pro Arena.
    - Highlights of the club's achievements.
    - Social media links and community statistics.
- **Call to Action**: High-visibility buttons for registration and joining the Discord server.

## Components Used
- `Layout`: Provides the global structure.
- `BentoGrid`, `BentoCard`, `BentoLarge`, `BentoMedium`: For the main layout grid.
- `FloatingParticles`: For background atmosphere.
- `VisualEffects` (GlitchText, TiltCard): For interactive text and card effects.
- `ConfettiButton`: Used for the primary "Register" button.

## Visual Design
The page utilizes a "Night mode" theme with deep blacks, vibrant purples, and pinks. It relies heavily on `framer-motion` for entrance animations and interactive feedback.
