import { useEffect, useState } from 'react'
import { getLeaderBoardByType } from '../utils/api'
import Button from './button'
import clsx from 'clsx'

type LeaderboardPosition = {
  name: string
  duration: number
}

const useLeaderboard = () => {
  const [type, setType] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [positions, setPositions] = useState<LeaderboardPosition[]>([])

  useEffect(() => {
    getLeaderBoardByType(type).then((positions) => {
      setPositions(positions)
    })
  }, [type])

  return { type, setType, positions }
}

export default function Leaderboard() {
  const { positions, type, setType } = useLeaderboard()

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-center w-full text-2xl pb-4">Leaderboard - {type}</h1>

      <div className="flex gap-4 pb-4">
        <Button
          onClick={() => setType('easy')}
          text="Easy"
          className={clsx({
            'bg-slate-300': type !== 'easy',
          })}
        />
        <Button
          onClick={() => setType('medium')}
          text="Medium"
          className={clsx({
            'bg-slate-300': type !== 'medium',
          })}
        />
        <Button
          onClick={() => setType('hard')}
          text="Hard"
          className={clsx({
            'bg-slate-300': type !== 'hard',
          })}
        />
      </div>

      <div className="grid grid-cols-3 w-full gap-2 text-gray-500 font-bold">
        <div>Position</div>
        <div>Name</div>
        <div>Duration</div>

        {positions.map((position, i) => (
          <div key={i} className="contents text-gray-800 font-normal">
            <div>{i + 1}</div>
            <div>{position.name}</div>
            <div>{position.duration / 1000}s</div>
          </div>
        ))}
      </div>
    </div>
  )
}
