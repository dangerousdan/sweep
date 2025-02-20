import { useEffect, useState } from 'react'

const difficultyMap: Record<Difficulty, Config> = {
  easy: { width: 10, height: 10, numMines: 10 },
  medium: { width: 16, height: 16, numMines: 40 },
  hard: { width: 30, height: 16, numMines: 99 },
} as const

export default function useSetupGame() {
  const [state, setState] = useState<AppState>('setup')
  const [name, setName] = useState('')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [config, setConfig] = useState(difficultyMap['easy'])

  useEffect(() => {
    setConfig(difficultyMap[difficulty])
  }, [difficulty])

  return {
    name,
    setName,
    difficulty,
    setDifficulty,
    state,
    setState,
    config,
  }
}
