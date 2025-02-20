const endpoint = import.meta.env.DEV ? 'http://localhost:3000' : ''

export const startGameRequest = async ({ width, height, numMines }: Config) => {
  return fetch(`${endpoint}/new`, {
    method: 'post',
    body: JSON.stringify({ width, height, numMines }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.text())
}

type CheckSquareRequest = { gameId?: string; square: number }
type CheckSquareResponse = Promise<number | Record<number, number>>

export const checkSquareRequest = async ({
  gameId,
  square,
}: CheckSquareRequest): CheckSquareResponse => {
  if (!gameId) {
    throw new Error('3')
  }

  return fetch(`${endpoint}/check`, {
    method: 'post',
    body: JSON.stringify({ gameId, square }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (res.status === 400) {
      // @TODO better errors
      throw new Error('2')
    }
    if (res.status > 400) {
      throw new Error('3')
    }
    return res.json()
  })
}

export const confirmWinRequest = async ({
  name,
  gameId,
  minePositions,
}: {
  name: string
  gameId?: string
  minePositions: number[]
}) => {
  if (!gameId) {
    throw new Error('3')
  }
  return fetch(`${endpoint}/confirm`, {
    method: 'post',
    body: JSON.stringify({ name, gameId, minePositions }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (res.status === 400) {
      // @TODO better errors
      throw new Error('2')
    }
    if (res.status > 400) {
      throw new Error('3')
    }
    return res.json()
  })
}

export const getLeaderBoardByType = async (type: string) => {
  return fetch(`${endpoint}/leaderboard?type=${type}`, {
    method: 'get',
  }).then((res) => res.json())
}
