import Overlay from './overlay'
import Square from './square'
import { useMemo } from 'react'
import Header from './header'
import useMinesweeper from '../hooks/use-minesweeper'
import useFitToScreen from '../hooks/use-fit-to-screen'

type GameProps = {
  config: Config
  name: string
}

export default function Game({ config, name }: GameProps) {
  const { maxWidth } = useFitToScreen()

  const { restart, status, squares, guess, toggleFlag, result } =
    useMinesweeper({
      config,
      name,
    })

  const remaining = useMemo(
    () => squares.filter((o) => o == -3).length,
    [squares]
  )

  return (
    <div
      className="flex flex-col items-center w-full gap-4"
      style={{ maxWidth }}
    >
      <Header status={status} remaining={remaining} total={config.numMines} />

      <div
        className="grid gap-1 w-full relative text-slate-500"
        style={{
          gridTemplateColumns: `repeat(${config.width}, 1fr)`,
        }}
      >
        <Overlay status={status} restart={restart} result={result} />

        {squares.map((state, index) => (
          <Square
            key={index}
            state={state}
            onClick={guess(index)}
            onRightClick={toggleFlag(index)}
          />
        ))}
      </div>
    </div>
  )
}
