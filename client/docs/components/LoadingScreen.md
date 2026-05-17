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
