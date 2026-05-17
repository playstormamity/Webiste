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
