import { Router } from 'express'
import * as gamesCtrl from '../controllers/games.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, gamesCtrl.index)

router.get('/new', isLoggedIn, gamesCtrl.new)

router.get('/:gameId', isLoggedIn, gamesCtrl.show)

router.get('/:gameId/edit', isLoggedIn, gamesCtrl.edit)

router.post('/', isLoggedIn, gamesCtrl.create)

router.post('/:gameId/comments', isLoggedIn, gamesCtrl.createComment)

router.delete('/:gameId', isLoggedIn, gamesCtrl.delete)

router.delete('/:gameId/comments/:commentId', isLoggedIn, gamesCtrl.deleteComment)

router.put('/:gameId', isLoggedIn, gamesCtrl.update)

export {
  router
}
