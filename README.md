# Minesweeper

This is a more complete version of minesweeper. A continuation from the coding test.

It is available at https://sweep.dd.sbs

## Setup

Install deps - `pnpm i`
Start dev server on port 3000 - `pnpm dev` (note: requires redis)
Build - `pnpm build`
Run server benchmarks -`pnpm bench`

## Server requests

This solutions assumes that is it not safe to expose the mine positions to the client.
Therefore, it has 3 server endpoints to manage this.

- `/new` will create a new game
- `/check` will check if a square contains a mine, or return the number of adjacent mines
- `/confirm` will check the final set of mines, confirm whether the user wins or not, and adds them to the leaderboard if so.

## Expandable routes

As per the original minesweeper game, if a user clicks on square with no adjacent mines, then adjacent squares which contain no mines are also exposed.

In the interest of performance, it's best to calculate this in a single request, rather than recursing. For this reason, we have some weird types.

If there is a mine or adjacent squares, we return a `number`. If there are multiple squares, we return a `Record<number, number>` - the two numbers in the record representing the square and the adjacent mines.

This is so that the server returns minimal data. The union of types is handled by the client.

## Performance

As mentioned in the tech test, performance is crucial, especially on the server. The server functions to handle each route have 3 alternative versions, each with different approaches.

Benchmarks for each versions can be seen with `pnpm bench`. The intention is that these versions and benchmarks can be a playground for other developers to try and `golf` a better solution in the critical areas.

Note: types vary slightly between approaches, so they are not drop-in replacements.

If securing the mine locations to avoid cheating is not a requirement, then we can greatly reduce server load even more.

# Server

The server is a minimal koa server. Fastify is another similar alternative, but I personally prefer koa for its smaller bundle sizes.

The app is running on a custom node docker image on a k3s server somewhere in Germany. The assets are tree-shaken during build.
The total assets are around 1.02Mb (when zipped).

# Other considerations

There are loads of things to be improved.

- tailwind is fast, but quickly gets ugly and bloats the html. Any modular CSS tool will be better.
- a shared library would be beneficial.
- things in the wrong place. server functions expect a width & height, whereas the client uses preset easy, medium, hard modes
- poor naming and general missed bits - I've turned this around pretty quickly, I took time to get types working nicely, but there's obvious omissions. eg. turborepo, prettier, still using the default tsconfig / eslint, more tests, ts-paths, error handling, a client router etc.
