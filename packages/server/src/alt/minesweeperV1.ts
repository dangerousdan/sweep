import { isDeepEqual } from '../utils/deep-equal'
import { getPseudoRandomNumber } from '../utils/rand'

export type Config = {
  width: number
  height: number
  numMines: number
  seed: number
}

/**
 * Generates an array of mines, where a mine = -1
 * and the number of adjacent mines otherwise
 */
export const generateMines = (config: Config) => {
  const mines = Array.from({
    length: config.width * config.height,
  }).fill(0) as number[]

  let pos: number
  for (let i = 0; i < config.numMines; i++) {
    let mod = 0

    do {
      pos = getPseudoRandomNumber(
        config.seed + i + mod,
        config.width * config.height
      )

      mod++
    } while (mines[pos] === -1)

    mines[pos] = -1

    const adjacentNumbers = getAdjacent(pos, config.width, config.height)

    adjacentNumbers.forEach((adj) => {
      if (mines[adj] !== -1) {
        mines[adj]++
      }
    })
  }

  return mines
}

export const getAdjacent = (i: number, width: number, height: number) => {
  const canGoLeft = i % width !== 0
  const canGoRight = i % width !== width - 1
  const canGoUp = i >= width
  const canGoDown = i < width * (height - 1)

  return [
    canGoLeft && i - 1,
    canGoRight && i + 1,
    canGoUp && i - width,
    canGoDown && i + width,
    canGoLeft && canGoUp && i - width - 1,
    canGoRight && canGoUp && i - width + 1,
    canGoLeft && canGoDown && i + width - 1,
    canGoRight && canGoDown && i + width + 1,
  ].filter((o) => o !== false) as number[]
}

export const checkSquare = (
  mines: number[],
  square: number,
  width: number,
  height: number
): number | Record<number, number> => {
  const result = mines[square]

  if (result !== 0) {
    return result
  }

  // adjacent squares
  const result2 = { [square]: 0 }
  const squaresToCheck = getAdjacent(square, width, height)
  const guesses = [square, ...squaresToCheck]

  while (squaresToCheck.length) {
    const sq = squaresToCheck.pop()!

    const numAdjacent = mines[sq]
    result2[sq] = numAdjacent

    if (numAdjacent === 0) {
      getAdjacent(sq, width, height).forEach((i) => {
        if (!guesses.includes(i)) {
          guesses.push(i)
          squaresToCheck.push(i)
        }
      })
    }
  }

  return result2
}

/**
 * Requires numbers to be pre-sorted by the client
 */
export function checkWin(minePositions: number[], userMines: number[]) {
  const actualMines = minePositions
    .map((o) => o === -1)
    .map((o, i) => o && i)
    .filter((o) => o !== false)

  return isDeepEqual(userMines, actualMines)
}
