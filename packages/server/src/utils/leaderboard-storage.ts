import { del, list, set } from './storage'

type LeaderboardEntry = {
  type: string
  name: string
  duration: number
}

const deleteEntriesAfter = Number(
  process.env.REDIS_LEADERBOARD_DELETE_AFTER || 50
)
const deleteEntriesWhen = Number(
  process.env.REDIS_LEADERBOARD_DELETE_WHEN || 500
)

export async function addtoLeaderboard(entry: LeaderboardEntry) {
  const sanitisedName = entry.name.toUpperCase().replace(/[^A-Z0-9]/g, '')
  const key = `${entry.type}:${sanitisedName}:${entry.duration}`

  await set('leaderboard', key, entry, {
    EX: 60 * 60 * 365, // 365 days
  })

  const items = await getLeaderboardByType(entry.type)
  items.push(entry)

  const position = items
    .toSorted((a, b) => a.duration - b.duration)
    .findIndex(
      (item) => item.name === entry.name && item.duration === entry.duration
    )

  if (items.length > deleteEntriesWhen) {
    // no await
    purgeLeaderboard(items.slice(deleteEntriesAfter))
  }

  return position
}

export async function getLeaderboardByType(
  type: string
): Promise<LeaderboardEntry[]> {
  const key = `leaderboard:${type}`
  const entries = await list(key)

  return entries
    .map((entry) => {
      const [name, duration] = entry.split(':')
      return {
        type,
        name,
        duration: Number(duration),
      }
    })
    .sort((a, b) => a.duration - b.duration)
}

export async function purgeLeaderboard(items: LeaderboardEntry[]) {
  if (!items.length) {
    return
  }
  const keys = items.map((item) => {
    return `${item.type}:${item.name}:${item.duration}`
  })

  await del('leaderboard', keys)
}
