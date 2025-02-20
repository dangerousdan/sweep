/// <reference types="vite/client" />

type Difficulty = 'easy' | 'medium' | 'hard'
type Config = {
  width: number
  height: number
  numMines: number
}

type AppState = 'setup' | 'game' | 'leaderboard'

/**
 * in play, win, lose, error
 */
type GameStatus = 0 | 1 | 2 | 3
