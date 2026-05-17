# PlayStorm Esports Club - Full Documentation

## Table of Contents
### Components
- [BentoGrid Component](#bentogrid-component)
- [ConfettiButton Component](#confettibutton-component)
- [FloatingParticles Component](#floatingparticles-component)
- [Layout Component](#layout-component)
- [LoadingScreen Component](#loadingscreen-component)
- [MusicPlayer Component](#musicplayer-component)
- [ScrollToTop Component](#scrolltotop-component)
- [VisualEffects Components](#visualeffects-components)
### Pages
- [About Page](#about-page)
- [Contact Page](#contact-page)
- [Events Page](#events-page)
- [Home Page](#home-page)
- [Leaderboard Page](#leaderboard-page)
- [Lineups Page](#lineups-page)
- [NotFound Page (404)](#notfound-page-(404))
- [Pro Arena Page](#pro-arena-page)
- [Register Page](#register-page)
- [Roster Page](#roster-page)

---

## Components
# BentoGrid Component

The `BentoGrid` and `BentoCard` components provide a flexible, modern grid layout system inspired by "Bento" design. It uses CSS Grid to create asymmetric layouts that are visually appealing and trendy.

## Sub-components

### `BentoGrid`
The container for the bento layout.

**Props:**
- `children`: React nodes to be displayed inside the grid.
- `className` (string, optional): Additional CSS classes for styling.

### `BentoCard`
A single cell within the `BentoGrid`.

**Props:**
- `children`: Content of the card.
- `className` (string, optional): Additional CSS classes.
- `span` (string, default: `"md:col-span-2"`): Tailwind class for grid column spanning.
- `to` (string, optional): If provided, the card becomes a link to the specified path.
- `highlight` (boolean, default: `false`): If true, adds a purple border and shadow.
- `...props`: Additional HTML or React Router Link attributes.

## Pre-configured Sizes
Convenience components that wrap `BentoCard` with specific spans:
- `BentoSmall`: Spans 2 columns on medium screens.
- `BentoMedium`: Spans 3 columns on medium screens.
- `BentoLarge`: Spans 4 columns on medium screens.
- `BentoFull`: Spans 6 columns (full width) on medium screens.

## Usage
```jsx
import BentoGrid, { BentoMedium, BentoLarge } from './components/BentoGrid'

function MyComponent() {
  return (
    <BentoGrid>
      <BentoLarge highlight to="/events">
        <h3>Featured Event</h3>
      </BentoLarge>
      <BentoMedium>
        <h3>Small Detail</h3>
      </BentoMedium>
    </BentoGrid>
  )
}
```

## Dependencies
- `framer-motion`: For entrance animations.
- `react-router-dom`: For link functionality.

---

# ConfettiButton Component

The `ConfettiButton` adds a fun, interactive "Gen Z" vibe by bursting confetti particles when clicked.

## Props
- `children`: The content to be displayed inside the button (e.g., text, icons).
- `onClick` (function, optional): Callback function executed when the button is clicked.
- `className` (string, optional): CSS classes for the button element.
- `...props`: Additional HTML button attributes.

## Features
- **Dynamic Particles**: Generates 20 particles of various colors on each click.
- **Custom Animations**: Particles follow a calculated trajectory with physics-like behavior using CSS keyframes.
- **Automatic Cleanup**: Removes confetti particles from the state after 1 second to prevent memory leaks.

## Usage
```jsx
import ConfettiButton from './components/ConfettiButton'

function RegisterButton() {
  return (
    <ConfettiButton 
      className="bg-purple-600 px-6 py-2 rounded-full"
      onClick={() => console.log('Registered!')}
    >
      Join Now!
    </ConfettiButton>
  )
}
```

## Internal Implementation
Uses a local `confetti` state to track active particles. Each particle has properties like `x`, `y`, `color`, `angle`, and `velocity`. The `confetti-fall` animation uses these properties via CSS variables (`--angle`, `--velocity`).

---

# FloatingParticles Component

The `FloatingParticles` component provides a subtle, atmospheric background effect with floating glowing dots that move upwards.

## Props
This component does not accept any props.

## Features
- **Deterministic Randomness**: Generates 20 particles with randomized sizes, durations, delays, and starting positions.
- **Smooth Animation**: Particles float upwards, fade out, and drift slightly horizontally using `framer-motion`.
- **Performance Optimized**: Uses `pointer-events-none` to ensure it doesn't interfere with user interactions.

## Usage
Usually placed inside a relative container to provide a background effect.

```jsx
import FloatingParticles from './components/FloatingParticles'

function HeroSection() {
  return (
    <div className="relative h-screen bg-black">
      <FloatingParticles />
      <h1 className="relative z-10 text-white">PlayStorm</h1>
    </div>
  )
}
```

## Dependencies
- `framer-motion`: Handles the infinite floating animation.

---

# Layout Component

The `Layout` component is the primary wrapper for the entire application. It provides the navigation bar, global background effects, and footer.

## Props
- `children`: The main content of the page to be rendered within the layout.

## Features
- **Responsive Navigation**: Includes a sticky header with a logo and links. Automatically switches to a hamburger menu on mobile devices.
- **Dynamic Active Links**: Highlights the current route in the navigation bar using `NavLink`.
- **Global Background**: Features persistent background "blobs" (purple and pink gradients) that give the site its signature look.
- **Mobile Menu**: Smoothly animated mobile menu using `AnimatePresence`.
- **Footer**: Contains copyright information and the club's motto.

## Internal Logic
- **Route Tracking**: Uses `useLocation` to automatically close the mobile menu when the user navigates to a new page.
- **State Management**: Uses `useState` to toggle the mobile menu visibility.

## Navigation Links
Standard routes included in the layout:
- Home (`/`)
- About (`/about`)
- Roster (`/roster`)
- Lineups (`/lineups`)
- Events (`/events`)
- Leaderboard (`/leaderboard`)
- Contact (`/contact`)

## Dependencies
- `lucide-react`: Icons (`Menu`, `X`).
- `framer-motion`: Header animations.
- `react-router-dom`: Navigation and route matching.

---

# LoadingScreen Component

The `LoadingScreen` is a high-fidelity, immersive entrance screen displayed while the application or specific pages are loading.

## Props
This component does not accept any props.

## Features
- **Premium Aesthetics**: Features a dark, multi-layered background with animated glowing blobs and a glassmorphism logo container.
- **Logo Animation**: The PlayStorm logo scales and rotates gently within a glowing, bordered box.
- **Dynamic Text**: The "PLAYSTORM" title has a moving gradient effect.
- **Progress Bar**: An animated loading bar that loops to indicate active background processing.
- **Full-Screen Coverage**: Uses `fixed inset-0` and a high z-index to cover all other content.

## Animation Details
Uses `framer-motion` for complex keyframe animations:
- Background blobs shift position and scale.
- The progress bar width and background position animate simultaneously.
- The entire screen fades out smoothly when unmounted (using `exit` prop, designed for use with `AnimatePresence`).

## Usage
Typically rendered conditionally in the root `App.jsx` based on a loading state.

## Dependencies
- `framer-motion`: For all visual effects and the exit transition.

---

# MusicPlayer Component

The `MusicPlayer` provides an ambient audio experience for the website. It's a discreet, floating control that manages background music.

## Features
- **Autoplay Handling**: Includes logic to bypass browser autoplay restrictions by attempting to play immediately and falling back to playing on the first user click.
- **Floating Controls**: A minimalistic play/pause button located at the bottom-left of the screen.
- **Looped Playback**: Automatically loops the assigned track.
- **Volume Management**: Preset to a comfortable 25% volume to be non-intrusive.

## Internal State
- `isPlaying`: Boolean tracking whether audio is currently playing.
- `audioRef`: A React ref pointing to the HTML `<audio>` element.

## Usage
Add to the main `App.jsx` or `Layout.jsx` to ensure music persists across page navigations.

```jsx
import MusicPlayer from './components/MusicPlayer'

function App() {
  return (
    <>
      <MusicPlayer />
      {/* ... rest of the app */}
    </>
  )
}
```

## Dependencies
- `lucide-react` (via custom SVG icons): Play and Pause icons.
- `react`: `useState`, `useEffect`, `useRef`.

---

# ScrollToTop Component

The `ScrollToTop` component is a utility that ensures the window scrolls back to the top whenever the user navigates to a new route.

## Props
This component does not accept any props.

## Features
- **Automatic Trigger**: Uses `useEffect` hooked into the `pathname` from `react-router-dom`.
- **Invisible**: Returns `null`, so it doesn't render anything in the DOM.

## Usage
Should be placed inside the `BrowserRouter` component, usually at the top level of `App.jsx`.

```jsx
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Routes here */}
    </BrowserRouter>
  )
}
```

## Dependencies
- `react-router-dom`: Uses `useLocation` to detect route changes.

---

# VisualEffects Components

The `VisualEffects.jsx` file contains several utility components designed to enhance the visual appeal and interactivity of the website.

## Components

### `CursorTrackerBackground`
Creates a subtle radial gradient background that follows the user's mouse cursor.

- **Implementation**: Uses `requestAnimationFrame` for high-performance cursor tracking with easing.
- **Visuals**: A two-layered radial gradient that provides a soft "glow" under the cursor.

### `ParticleBackground`
A high-performance HTML5 Canvas-based background with floating particles.

- **Implementation**: Renders particles directly to a canvas. Handles window resizing automatically.
- **Visuals**: Numerous small, purple-tinted dots moving at random speeds, creating a "space" or "digital" feel.

### `GlitchText`
A text wrapper that adds a chromatic aberration "glitch" effect on hover.

- **Props**:
    - `text` (string): The text to display.
    - `className` (string, optional): Additional CSS classes.
- **Visuals**: Red and blue clones of the text appear and pulsate behind the main text when the user hovers.

### `TiltCard`
A wrapper that adds a 3D parallax tilt effect to its children.

- **Props**:
    - `children`: The content to be placed inside the card.
    - `className` (string, optional): Additional CSS classes.
- **Visuals**: The card tilts towards the cursor position, and its contents shift slightly on the Z-axis (`translateZ`) for a depth effect.
- **Implementation**: Powered by `framer-motion`'s `useMotionValue` and `useSpring` for smooth motion.

## Dependencies
- `framer-motion`: For `GlitchText` animations and `TiltCard` physics.
- `react`: `useEffect`, `useRef`.

---

## Pages
# About Page

The `About` page provides detailed information about PlayStorm Esports Club, its history, values, and the team behind it.

## Route
`/about`

## Features
- **Club Overview**: Describes the club's origin at Amity University Noida and its growth into a premier esports organization.
- **Core Values**: Highlights the principles of excellence, community, and innovation.
- **Legacy Section**: Showcases the club's past achievements and impact on the campus gaming culture.
- **Stats Counter**: Animated numbers showing member counts, event history, and tournament wins.

## Components Used
- `Layout`: Provides the global structure.
- `BentoGrid`: Used for organizing "Our Story" and "Mission" sections.
- `VisualEffects` (TiltCard): Used for highlighting key milestones.

## Content Structure
- **Our Story**: Narrates the evolution of the club.
- **Mission & Vision**: Outlines the long-term goals for student empowerment through gaming.
- **Why Join Us?**: Lists the benefits of becoming a member.

---

# Contact Page

The `Contact` page provides multiple ways for students, partners, and sponsors to get in touch with the PlayStorm Esports Club.

## Route
`/contact`

## Features
- **Inquiry Form**: A functional contact form for general queries, partnership proposals, or recruitment questions.
- **Social Links**: Direct links to Discord, Instagram, YouTube, and LinkedIn.
- **Quick Info**: Displays the official club email and campus location.
- **Interactive Map**: A stylized representation of the club's location on the Amity campus.

## Components Used
- `Layout`: Provides the global structure.
- `VisualEffects` (GlitchText): Used for section headers.
- `BentoGrid`: For organizing the contact information and form sections.

## Internal Logic
- **Form Submission**: Uses `useState` to track form data and submission status (Success/Error).
- **Social Pills**: Custom components for high-visibility social media links.
- **Lucide Icons**: Uses `Mail`, `MapPin`, `CalendarDays`, etc.

---

# Events Page

The `Events` page is the hub for all competitive and community activities hosted by PlayStorm. It displays upcoming, ongoing, and past events.

## Route
`/events`

## Features
- **Event Filter**: Allows users to filter events by status (Upcoming, Ongoing, Past) or type (Tournament, Workshop, Social).
- **Event Cards**: Detailed cards for each event featuring:
    - Game title and event name.
    - Date and time.
    - Prize pool information.
    - Registration status.
- **Registration Integration**: Direct links to registration forms for upcoming events.
- **Archive**: A searchable archive of previous tournaments and their winners.

## Components Used
- `Layout`: Provides the global structure.
- `BentoGrid`: For a dynamic layout of featured events.
- `ConfettiButton`: Used for event registration buttons.
- `VisualEffects` (GlitchText): Used for event titles to add a competitive feel.

## Data Source
Event data is typically managed via a local data file (`client/src/data/events.js`) or fetched from the backend API.

---

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

---

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

---

# Lineups Page

The `Lineups` page showcases the official competitive rosters of PlayStorm across various esports titles.

## Route
`/lineups`

## Features
- **Team Breakdown**: Segregated sections for different games (Valorant, BGMI, E-Sports, etc.).
- **Player Cards**: Detailed information for each player, including their role (IGL, Duelist, etc.) and social media links.
- **Coach/Staff Recognition**: Sections for the coaching staff and team managers.
- **Past Lineups**: A historical record of previous successful rosters.

## Components Used
- `Layout`: Provides the global structure.
- `BentoGrid`: Used to organize the various team sections.
- `VisualEffects` (TiltCard): Used for player cards to add depth and interactivity.

## Visual Design
Each team section often has a slightly different accent color corresponding to the game or team identity.

---

# NotFound Page (404)

The `NotFound` page is displayed whenever a user navigates to a route that doesn't exist.

## Route
Fallback for any undefined path.

## Features
- **Thematic Branding**: Uses the "Lost in the Storm?" heading to keep with the club's branding.
- **Clear Action**: Provides a prominent "Return Home" button.
- **Animated 404**: The "404" text features a vibrant gradient and scale animation.

## Components Used
- `Layout`: Provides the global structure.
- `framer-motion`: For entrance and hover animations.
- `lucide-react`: Home icon.

## Logic
Connected via a catch-all route (`path="*"`) in the main application routing.

---

# Pro Arena Page

The `Pro Arena` page provides details about PlayStorm's physical or virtual high-performance gaming environment.

## Route
`/pro-arena` (or as linked in navigation)

## Features
- **Facility Tour**: Information about the hardware and facilities available to club members.
- **Booking System**: Integration for booking practice slots or tournament participation.
- **Elite Status**: Details on how to qualify for "Pro Arena" access.
- **Hardware Specs**: List of PCs, consoles, and peripherals available.

## Components Used
- `Layout`: Provides the global structure.
- `BentoGrid`: For a "feature-rich" display of facility highlights.
- `VisualEffects` (GlitchText): For high-energy section headers.

## Visual Style
Industrial and high-tech aesthetic, emphasizing performance and "pro" level gaming.

---

# Register Page

The `Register` page is the primary entry point for new members to join the PlayStorm Esports Club.

## Route
`/register`

## Features
- **Multi-step Form**: A streamlined registration process for collecting student details, game interests, and social handles.
- **Validation**: Real-time validation for Amity email addresses and other required fields.
- **Success State**: Immersive success screen with confetti and a welcome message.
- **Integration**: Connects to the backend to store member data in the database.

## Components Used
- `Layout`: Provides the global structure.
- `ConfettiButton`: Used for the final "Submit" button to celebrate registration.
- `LoadingScreen`: May be triggered during the form submission process.

## Data Collected
- Full Name
- Enrollment Number
- Amity Email
- Discord ID
- Primary & Secondary Games
- Social Media Handles

---

# Roster Page

The `Roster` page displays the full list of active members and contributors to the PlayStorm Esports Club.

## Route
`/roster`

## Features
- **Search & Filter**: Find members by name, game, or role within the club.
- **Member Profiles**: Compact cards showing member stats, join date, and achievements.
- **Top Contributors**: Highlighted section for core team members and frequent event organizers.

## Components Used
- `Layout`: Provides the global structure.
- `BentoGrid`: Used to display the member list in a dense, readable format.
- `VisualEffects` (TiltCard): Used for highlighting "Legendary" or top-ranked members.

## Visual Design
Uses a grid-heavy layout to accommodate a large number of members while maintaining a premium, organized look.

---

