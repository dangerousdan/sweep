import { useCallback, useEffect } from 'react'
import {
  checkSquareRequest,
  confirmWinRequest,
  startGameRequest,
} from '../utils/api'
import useGameSquares from './use-game-squares'
import useGameStatus from './use-game-status'

type UseStartGameProps = {
  config: Config
  name: string
}

export default function useMinesweeper({
  config: { width, height, numMines },
  name,
}: UseStartGameProps) {
  const { gameId, setGameId, status, successHandler, errorHandler, result } =
    useGameStatus()

  const { squares, initialiseSquares, toggleFlag, updateSquareFromRequest } =
    useGameSquares()

  const restart = useCallback(() => {
    startGameRequest({ width, height, numMines }).then((gameId) => {
      setGameId(gameId)
      initialiseSquares(width * height)
    })
  }, [width, height, numMines, initialiseSquares, setGameId])

  // start the game
  useEffect(() => {
    restart()
  }, [restart])

  // guess a square
  const guess = useCallback(
    (square: number) => () => {
      // dont guess flagged squares
      if (squares[square] === -3) {
        return
      }

      checkSquareRequest({ gameId, square })
        .then((numberOrRecord) => {
          updateSquareFromRequest(square, numberOrRecord)
        })
        .catch(errorHandler)
    },
    [gameId, squares, updateSquareFromRequest, errorHandler]
  )

  // check for win (and enter leaderboard) when no mines left
  useEffect(() => {
    if (status !== 0) {
      return
    }

    const minePositions = squares
      .map((o, i) => (o === -2 || o === -3 ? i : null))
      .filter((o) => o !== null)

    if (minePositions.length !== numMines) {
      return
    }

    confirmWinRequest({ name, gameId, minePositions })
      .then(successHandler)
      .catch(errorHandler)
  }, [squares, numMines, gameId, status, name, successHandler, errorHandler])

  return { restart, status, squares, guess, toggleFlag, result }
}
