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
      <div className="flex justify-center relative w-full">
        {state !== 'setup' && (
          <Button
            className="absolute top-0 -left-4 sm:left-0 w-12! sm:w-16! text-sm p-1!"
            onClick={() => setState('setup')}
            text="Back"
          />
        )}

        <h1 className="text-xl sm:text-2xl text-center w-full">Minesweeper</h1>
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
