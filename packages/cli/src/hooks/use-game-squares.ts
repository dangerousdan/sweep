import { MouseEventHandler, useCallback, useState } from 'react'

export default function useGameSquares() {
  // -3: flagged, -2: unknown, -1: mine, 0: empty, 1-8: number of mines
  const [squares, setSquares] = useState<number[]>([])

  const initialiseSquares = useCallback((length: number) => {
    setSquares(Array.from({ length }).fill(-2) as number[])
  }, [])

  const toggleFlag = useCallback(
    (index: number): MouseEventHandler<HTMLDivElement> =>
      (e) => {
        e.preventDefault()
        setSquares((prev) => {
          const lastValue = prev[index]
          const items = [...prev]
          items.splice(index, 1, lastValue === -3 ? -2 : -3)
          return items
        })
      },
    [setSquares]
  )

  const updateSquareFromRequest = useCallback(
    (index: number, response: number | Record<number, number>) => {
      setSquares((prev) => {
        const items = [...prev]

        if (typeof response === 'number') {
          items.splice(index, 1, response)
        } else {
          Object.entries(response).forEach(([key, value]) => {
            items.splice(Number(key), 1, value)
          })
        }
        return items
      })
    },
    []
  )

  return {
    squares,
    initialiseSquares,
    toggleFlag,
    updateSquareFromRequest,
  }
}
