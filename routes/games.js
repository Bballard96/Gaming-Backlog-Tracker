import { Router } from 'express'
import * as gamesCtrl from '../controllers/games.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', gamesCtrl.index)

// new index page
router.get('/', gamesCtrl.newIndex)    

router.get('/new', gamesCtrl.new)

router.get('/:gameId', gamesCtrl.show)

router.get('/:gameId/edit', isLoggedIn, gamesCtrl.edit)

// had an isLoggedIn here in middle
router.post('/', isLoggedIn, gamesCtrl.create)

router.post('/:gameId/comments', gamesCtrl.createComment)

router.delete('/:gameId', gamesCtrl.delete)

router.delete('/:gameId/comments/:commentId', gamesCtrl.deleteComment)

router.put('/:gameId', isLoggedIn, gamesCtrl.update)

export {
  router
}
