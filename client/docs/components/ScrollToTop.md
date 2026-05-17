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
