import Koa from 'koa'
import Router from '@koa/router'
import {
  checkCell,
  confirmWin,
  generateNewGame,
  getLeaderboard,
} from './routes'
import bodyParser from '@koa/bodyparser'
import compress from 'koa-compress'
import serve from 'koa-static'

const router = new Router()
export const app = new Koa()

router.post('/new', generateNewGame)
router.post('/check', checkCell)
router.post('/confirm', confirmWin)
router.get('/leaderboard', getLeaderboard)

app
  .use(compress())
  .use(serve('./public', { maxAge: 1000 }))
  .use(async (ctx, next) => {
    ctx.res.setHeader('Access-Control-Allow-Origin', '*')
    ctx.res.setHeader('Access-Control-Allow-Headers', '*')
    await next()
  })
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

// esserve specific
export const server = async ({ port }: { port: number }) => app.listen(port)

if (!process.env.ESSERVE) {
  server({ port: 3000 })
}
