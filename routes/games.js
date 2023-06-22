import { Router } from 'express'
import multer from 'multer'
import * as gamesCtrl from '../controllers/games.js'
import { isLoggedIn } from '../middleware/middleware.js'

const upload = multer({ dest: 'uploads/' });

const router = Router()

router.get('/', isLoggedIn, gamesCtrl.index)

router.get('/new', isLoggedIn, gamesCtrl.new)

router.get('/:gameId', isLoggedIn, gamesCtrl.show)

router.get('/:gameId/edit', isLoggedIn, gamesCtrl.edit)

router.post('/', isLoggedIn, gamesCtrl.create)


// NEW CODE BELOW FOR PICTURE UPLOADS

router.post('/upload', upload.single('image'), (req,res) => {
  console.log(req.file)
  res.send('File uploaded!')
})

router.post('/:gameId/comments', isLoggedIn, gamesCtrl.createComment)

router.delete('/:gameId', isLoggedIn, gamesCtrl.delete)

router.delete('/:gameId/comments/:commentId', isLoggedIn, gamesCtrl.deleteComment)

router.put('/:gameId', isLoggedIn, gamesCtrl.update)

export {
  router
}
