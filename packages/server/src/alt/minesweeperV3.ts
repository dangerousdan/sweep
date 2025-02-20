import { getPseudoRandomNumber } from '../utils/rand'
import { Config } from './minesweeperV1'

/**
 * Generates a 2d array of mines
 */
export const generateMines = (config: Config): number[][] => {
  const mines = Array.from({ length: config.width }, () =>
    Array(config.height).fill(0)
  )

  let x, y: number
  for (let i = 0; i < config.numMines * 2; i = i + 2) {
    let mod = 0

    do {
      x = getPseudoRandomNumber(config.seed + i + mod, config.width)
      y = getPseudoRandomNumber(config.seed + i + mod + 1, config.height)
      mod++
    } while (mines[x][y] === -1)

    mines[x][y] = -1

    const adjacentNumbers = getAdjacent(x, y, config.width)

    adjacentNumbers.forEach(([x, y]) => {
      if (mines?.[x]?.[y] !== undefined && mines[x][y] !== -1) {
        mines[x][y]++
      }
    })
  }

  return mines
}

const getAdjacent = (x: number, y: number, width: number) => {
  const xx = [x - 1, x, x + 1].filter((o) => o >= 0 && o < width)
  const yy = [y - 1, y, y + 1].filter((o) => o >= 0 && o < width)
  return xx.map((x) => yy.map((y) => [x, y])).flat()
}

export const checkSquare = (
  mines: number[][],
  x: number,
  y: number,
  width: number
): number | number[][] => {
  const result = mines[x][y]

  if (result !== 0) {
    return result
  }

  // adjacent squares
  const key = `${x},${y}`
  const result2 = new Map<string, number>()
  result2.set(key, 0)
  const squaresToCheck = getAdjacent(x, y, width)
  const guesses = [key, ...squaresToCheck.map((o) => o.join(','))]

  while (squaresToCheck.length) {
    const [x, y] = squaresToCheck.pop()!

    const numAdjacent = mines?.[x]?.[y]
    if (numAdjacent === undefined) {
      continue
    }

    result2.set(`${x},${y}`, numAdjacent)

    if (numAdjacent === 0) {
      getAdjacent(x, y, width).forEach(([x, y]) => {
        if (!guesses.includes(`${x},${y}`)) {
          guesses.push(`${x},${y}`)
          squaresToCheck.push([x, y])
        }
      })
    }
  }

  return Array.from(result2.entries()).map(([key, value]) => [
    ...key.split(',').map(Number),
    value,
  ])
}

/**
 * Requires numbers to be pre-sorted by the client
 */
export function checkWin(mines: number[], userMines: number[]) {
  const actualMines = mines
    .map((o) => o === -1)
    .map((o, i) => o && i)
    .filter(Boolean)

  return JSON.stringify(userMines) === JSON.stringify(actualMines)
}
