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
