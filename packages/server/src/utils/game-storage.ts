import { v4 as uuidv4 } from 'uuid'
import { get, set } from './storage'

export type Game = {
  start: number
  mines: number[]
  width: number
  height: number
}

export async function addGame({ mines, width, height }: Omit<Game, 'start'>) {
  const gameId = uuidv4()
  const game: Game = {
    start: Date.now(),
    mines,
    width,
    height,
  }

  await set<Game>('game', gameId, game, {
    EX: Number(process.env.REDIS_GAME_TTL || 60 * 60),
  })

  return gameId
}

export async function getGame(gameId: string) {
  return get<Game>('game', gameId)
}
