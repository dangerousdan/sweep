import { bench, describe } from 'vitest'
import * as v1 from './alt/minesweeperV1'
import * as v2 from './alt/minesweeperV2'
import * as v3 from './alt/minesweeperV3'

describe('minesweeper', () => {
  const games: Record<string, number[]> = {
    easy: [10, 10, 10],
    medium: [16, 16, 40],
    hard: [30, 16, 99],
  }

  for (let difficulty in games) {
    const [width, height, numMines] = games[difficulty]

    describe(`generate mines:${difficulty}`, () => {
      bench(`setup:v1:${difficulty}`, () => {
        v1.generateMines({ width, height, numMines, seed: 0 })
      })

      bench(`setup:v2:${difficulty}`, () => {
        v2.generateMines({ width, height, numMines, seed: 0 })
      })

      bench(`setup:v3:${difficulty}`, () => {
        v3.generateMines({ width, height, numMines, seed: 0 })
      })
    })

    describe(`check:${difficulty}`, () => {
      const minesV1 = v1.generateMines({ width, height, numMines, seed: 0 })
      const minesV2 = v2.generateMines({ width, height, numMines, seed: 0 })
      const minesV3 = v3.generateMines({ width, height, numMines, seed: 0 })

      bench(`check:v1:${difficulty}`, () => {
        for (let i = 0; i < width * height; i++) {
          v1.checkSquare(minesV1, i, width, height)
        }
      })
      bench(`check:v2:${difficulty}`, () => {
        for (let i = 0; i < width * height; i++) {
          v2.checkSquare(minesV2, i, width, height)
        }
      })

      bench(`check:v3:${difficulty}`, () => {
        for (let i = 0; i < width; i++) {
          for (let j = 0; j < height; j++) {
            v3.checkSquare(minesV3, i, j, width)
          }
        }
      })
    })

    describe(`check-win:${difficulty}`, () => {
      const items = v1.generateMines({ width, height, numMines, seed: 0 })
      const minePositions = items
        .map((o, i) => (o === -1 ? i : null))
        .filter((o) => o !== null)

      bench(`check-win:v1:${difficulty}`, () => {
        for (let i = 0; i < width * height; i++) {
          v1.checkWin(items, minePositions)
        }
      })

      bench(`check-win:v2:${difficulty}`, () => {
        for (let i = 0; i < width * height; i++) {
          v2.checkWin(items, minePositions)
        }
      })

      bench(`check-win:v3:${difficulty}`, () => {
        for (let i = 0; i < width * height; i++) {
          v2.checkWin(items, minePositions)
        }
      })
    })
  }
})
