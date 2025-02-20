import clsx from 'clsx'
import { MouseEventHandler } from 'react'

type SquareProps = {
  onClick: () => void
  onRightClick: MouseEventHandler<HTMLDivElement>
  state: number
}

export default function Square({ onClick, onRightClick, state }: SquareProps) {
  return (
    <div className="h-0 pb-[100%] relative">
      <div
        onClick={onClick}
        onContextMenu={onRightClick}
        className={clsx(
          'absolute h-full w-full rounded flex items-center justify-center cursor-pointer transition-colors',
          {
            'bg-sky-200': [-2, -3].includes(state),
            'bg-red-200': state === -1,
            'bg-sky-100': state >= 0,
          }
        )}
      >
        {state == -3 ? '🚩' : state > 0 && state}
      </div>
    </div>
  )
}
