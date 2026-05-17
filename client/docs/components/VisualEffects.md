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
