import { describe, expect, test } from 'vitest'
import { checkSquare, checkWin, generateMines } from './minesweeper'

describe('minesweeper', () => {
  const games: Record<string, number[]> = {
    easy: [10, 10, 10],
    medium: [16, 16, 40],
    hard: [30, 16, 99],
  }

  for (let difficulty in games) {
    const [width, height, numMines] = games[difficulty]

    test(`generate mines:${difficulty}`, () => {
      const items = generateMines({ width, height, numMines, seed: 0 })
      const minesCount = items.filter((o) => o == -1).length

      expect(items.length).toBe(width * height)
      expect(minesCount).toBe(numMines)
    })
  }

  test(`check-square:easy`, () => {
    const indexes = [0, 1, 99]
    const responses = [-1, 1, { 88: 2, 89: 1, 98: 1, 99: 0 }]

    const [width, height, numMines] = games['easy']
    const items = generateMines({ width, height, numMines, seed: 0 })

    for (let i in indexes) {
      const index = indexes[i]
      const expected = responses[i]
      const actual = checkSquare(items, index, width, height)
      expect(expected).toEqual(actual)
    }
  })

  test('check-win:easy', () => {
    const [width, height, numMines] = games['easy']
    const items = generateMines({ width, height, numMines, seed: 0 })
    const minePositions = items
      .map((o, i) => (o === -1 ? i : null))
      .filter((o) => o !== null)

    const success = checkWin(items, minePositions)
    expect(success).toBe(true)

    minePositions[0]++
    const fail = checkWin(items, minePositions)
    expect(fail).toBe(false)
  })
})
