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
