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
