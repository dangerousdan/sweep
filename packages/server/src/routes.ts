import type { Context } from 'koa'
import { checkSquare, checkWin, generateMines } from './minesweeper'
import { addGame, getGame } from './utils/game-storage'
import {
  addtoLeaderboard,
  getLeaderboardByType,
} from './utils/leaderboard-storage'
import getGameType from './utils/get-game-type'

export async function generateNewGame(ctx: Context) {
  const width = Number(ctx.request.body.width || 10)
  const height = Number(ctx.request.body.height || 10)
  const numMines = Number(ctx.request.body.numMines || 10)
  const seed = Math.random() * 100000
  const mines = generateMines({ width, height, numMines, seed })
  const gameId = await addGame({ mines, width, height })
  ctx.body = gameId
}

export async function checkCell(ctx: Context) {
  const gameId = ctx.request.body.gameId
  const square = Number(ctx.request.body.square)

  if (
    !gameId ||
    square === undefined ||
    typeof gameId !== 'string' ||
    typeof square !== 'number'
  ) {
    ctx.status = 404
    return
  }

  const game = await getGame(gameId)

  if (!game) {
    ctx.status = 404
    return
  }

  const result = checkSquare(game.mines, square, game.width, game.height)

  if (result == -1) {
    ctx.status = 400
    return
  }
  ctx.body = result
}

export async function confirmWin(ctx: Context) {
  const gameId = ctx.request.body.gameId
  const minePositions = ctx.request.body.minePositions
  const name = ctx.request.body.name

  if (!gameId || !minePositions || typeof gameId !== 'string') {
    ctx.status = 404
    return
  }

  const game = await getGame(gameId)
  const didWin = checkWin(game.mines, minePositions)

  if (!didWin) {
    ctx.status = 400
    return
  }

  const gameType = getGameType(game)
  const duration = Date.now() - game.start
  let position = -1

  if (gameType) {
    position = await addtoLeaderboard({
      type: gameType,
      name,
      duration,
    })
  }

  ctx.body = {
    position,
    duration,
  }
}

export async function getLeaderboard(ctx: Context) {
  const type = Array.isArray(ctx.query.type)
    ? ctx.query.type[0]
    : ctx.query.type || 'easy'

  const entries = await getLeaderboardByType(type)

  ctx.body = entries.slice(0, 20)
}
