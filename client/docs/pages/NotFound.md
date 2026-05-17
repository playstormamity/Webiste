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
