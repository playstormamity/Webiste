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
