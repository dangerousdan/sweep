import { Fragment } from 'react/jsx-runtime'

type OverlayProps = {
  status: 0 | 1 | 2 | 3
  restart: () => void
  result?: { position: number; duration: number }
}

const messageMap = {
  1: 'You Win',
  2: 'You Lose',
  3: 'Error',
}

export default function Overlay({ status, restart, result }: OverlayProps) {
  if (!status) return null

  const message = messageMap[status]

  return (
    <div className="absolute z-20 w-full h-full flex flex-col gap-8 items-center justify-center bg-white/80">
      {message}

      {result && (
        <Fragment>
          <div>Completed in {result.duration / 1000}s</div>
          <div>You are position #{result.position} in the leaderboard</div>
        </Fragment>
      )}

      <button
        className="bg-sky-200 border disabled:bg-slate-200 border-sky-400 hover:bg-sky-300 transition-colors cursor-pointer disabled:cursor-default rounded p-2"
        onClick={restart}
      >
        Restart
      </button>
    </div>
  )
}
