import { Router } from 'express'
import * as gamesCtrl from '../controllers/games.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', gamesCtrl.index)

router.get('/new', gamesCtrl.new)

router.get('/:gameId', gamesCtrl.show)

router.get('/:gameId/edit', gamesCtrl.edit)

router.post('/', isLoggedIn, gamesCtrl.create)

router.post('/:gameId/comments', gamesCtrl.createReview)

router.delete('/:gameId', gamesCtrl.delete)

router.put('/:gameId', gamesCtrl.update)

export {
  router
}
