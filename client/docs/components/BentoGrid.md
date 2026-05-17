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
