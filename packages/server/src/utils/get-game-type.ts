import type { Game } from './game-storage'

type GameType = 'easy' | 'medium' | 'hard'

export default function getGameType(game: Game): GameType | undefined {
  if (game.width >= 30 && game.height >= 16) {
    return 'hard'
  }
  if (game.width >= 16 && game.height >= 16) {
    return 'medium'
  }
  if (game.width >= 10 && game.height >= 10) {
    return 'easy'
  }
}
