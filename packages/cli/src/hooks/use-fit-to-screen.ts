import { useEffect, useState } from 'react'

export default function useFitToScreen() {
  const [maxWidth, setMaxWidth] = useState(1000)

  useEffect(() => {
    const resize = () => {
      setMaxWidth(Math.min(window.innerWidth, window.innerHeight) * 0.8)
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return { maxWidth }
}
