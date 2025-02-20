import Button from './button'

type SetupGameProps = {
  name: string
  setName: (name: string) => void
  difficulty: Difficulty
  setDifficulty: (difficulty: Difficulty) => void
  gotoGame: () => void
  gotoLeaderboard: () => void
}

export default function SetupGame(props: SetupGameProps) {
  return (
    <div className="bg-gray-100 p-8 rounded flex flex-col gap-4 items-center w-128">
      <input
        className="w-full p-2 mb-2 border border-gray-300 rounded bg-white"
        value={props.name}
        onChange={(e) => props.setName(e.target.value)}
        placeholder="Name"
      />

      <label className="flex gap-8 items-center w-full">
        Difficulty
        <select
          className="border p-2 rounded bg-white w-full"
          value={props.difficulty}
          onChange={(e) => props.setDifficulty(e.target.value as Difficulty)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>

      <Button onClick={props.gotoGame} disabled={!props.name} text="Start" />
      <div>or</div>
      <Button onClick={props.gotoLeaderboard} text="View Leaderboard" />
    </div>
  )
}
