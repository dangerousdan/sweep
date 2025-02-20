import Game from './components/game'
import Button from './components/button'
import Leaderboard from './components/leaderboard'
import SetupGame from './components/setup-game'
import useSetupGame from './hooks/use-setup-game'

export default function App() {
  const { name, setName, difficulty, setDifficulty, state, setState, config } =
    useSetupGame()

  return (
    <div className="p-8 flex flex-col gap-8 items-center justify-stretch">
      <div className="flex items-center relative w-full">
        {state !== 'setup' && (
          <Button
            className="absolute left-0 w-24!"
            onClick={() => setState('setup')}
            text="Back"
          />
        )}

        <h1 className="text-2xl text-center w-full">Minesweeper</h1>
      </div>

      {state == 'setup' && (
        <SetupGame
          name={name}
          setName={setName}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          gotoGame={() => setState('game')}
          gotoLeaderboard={() => setState('leaderboard')}
        />
      )}

      {state == 'game' && <Game config={config} name={name} />}
      {state == 'leaderboard' && <Leaderboard />}
    </div>
  )
}
