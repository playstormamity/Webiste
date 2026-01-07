import { useState, useEffect, useRef } from 'react'
// Make sure your mp3 is in src/assets/playboi_carti.mp3
import vibeSong from '../assets/playboi_carti.mp3'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      // 1. Set Volume to 50%
      audioRef.current.volume = 0.25;

      // 2. Browser Autoplay Logic
      const attemptPlay = () => {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
              // Remove the listener once it starts playing successfully
              document.removeEventListener('click', attemptPlay)
            })
            .catch((error) => {
              console.log("Autoplay blocked. Waiting for user interaction.")
              setIsPlaying(false)
            })
        }
      }

      // Try playing immediately
      attemptPlay()

      // Also try playing on the VERY FIRST click anywhere on the site (fallback)
      document.addEventListener('click', attemptPlay)

      return () => {
        document.removeEventListener('click', attemptPlay)
      }
    }
  }, [])

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const PlayIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" className="fill-white">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  )

  const PauseIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" className="fill-white">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  )

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <audio ref={audioRef} src={vibeSong} loop />

      <button
        onClick={togglePlay}
        className="flex items-center justify-center text-white transition hover:scale-110"
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  )
}