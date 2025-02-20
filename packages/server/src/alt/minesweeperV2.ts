import { getPseudoRandomNumber } from '../utils/rand'
import { Config, getAdjacent } from './minesweeperV1'

/**
 * Alternative approach
 *
 * Instead of generating all adjacted squares, it only generates the mine positions
 * uses sets to compare and calculate adjacent squares on check
 */
export const generateMines = (config: Config) => {
  const mines = new Set<number>()
  let i = 0

  while (mines.size < config.numMines) {
    const pos = getPseudoRandomNumber(
      config.seed + i,
      config.width * config.height
    )
    i++
    if (mines.has(pos)) {
      continue
    }
    mines.add(pos)
  }
  return mines
}

export const checkSquare = (
  mines: Set<number>,
  square: number,
  width: number,
  height: number
): number | Record<number, number> => {
  const result = mines.has(square)

  if (result) {
    return -1
  }

  // calculate initial adjacent
  const a = getAdjacent(square, width, height)
  const squaresToCheck = new Set(a)
  const adjacentMinePositions = mines.intersection(squaresToCheck)

  if (adjacentMinePositions.size) {
    return adjacentMinePositions.size
  }

  // adjacent squares
  const result2 = { [square]: 0 }
  const guesses = [square, ...a]

  do {
    squaresToCheck.forEach((sq) => {
      squaresToCheck.delete(sq)
      const adjacentSquares = new Set(getAdjacent(sq, width, height))
      const adjacentMinePositions = mines.intersection(adjacentSquares)
      result2[sq] = adjacentMinePositions.size

      if (adjacentMinePositions.size === 0) {
        adjacentSquares.forEach((i) => {
          if (!guesses.includes(i)) {
            guesses.push(i)
            squaresToCheck.add(i)
          }
        })
      }
    })
  } while (squaresToCheck.size)

  return result2
}

/**
 * Requires numbers to be pre-sorted by the client
 */
export function checkWin(mines: number[], userMines: number[]) {
  const actualMines = new Set(
    mines
      .map((o) => o === -1)
      .map((o, i) => o && i)
      .filter(Boolean)
  )

  const userMinesSet = new Set(userMines)

  return (
    actualMines.size === userMinesSet.size &&
    actualMines.intersection(userMinesSet).size === 0
  )
}
