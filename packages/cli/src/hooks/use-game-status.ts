import { useCallback, useEffect, useState } from 'react'

type Result = {
  position: number
  duration: number
}

export default function useGameStatus() {
  const [gameId, setGameId] = useState<string>()
  const [status, setStatus] = useState<GameStatus>(0)
  const [result, setResult] = useState<Result>()

  useEffect(() => {
    setStatus(0)
    setResult(undefined)
  }, [gameId])

  const successHandler = useCallback((result: Result) => {
    setResult(result)
    setStatus(1)
  }, [])

  const errorHandler = useCallback((err: unknown) => {
    if (err instanceof Error && err.message === '2') {
      return setStatus(2)
    }
    setStatus(3)
  }, [])

  return { gameId, setGameId, status, result, successHandler, errorHandler }
}
