import { Router } from 'express'
import multer from 'multer'
import * as gamesCtrl from '../controllers/games.js'
import { isLoggedIn } from '../middleware/middleware.js'

const upload = multer({ dest: 'uploads/' });
// const fs = require('fs')

const router = Router()

router.get('/', isLoggedIn, gamesCtrl.index)

router.get('/new', isLoggedIn, gamesCtrl.new)

router.get('/:gameId', isLoggedIn, gamesCtrl.show)

router.get('/:gameId/edit', isLoggedIn, gamesCtrl.edit)

router.post('/', isLoggedIn, gamesCtrl.create)


// NEW CODE BELOW FOR PICTURE UPLOADS

// router.post('/upload', upload.single('image'), (req, res) => {
// const tempPath = req.file.path
// const targetPath = 'uploads/' + req.file.originalname

// fs.rename(tempPath, targetPath, err => {
//   if (err) throw err;
//   res.send('File uploaded!')
// })
// })

router.post('/:gameId/comments', isLoggedIn, gamesCtrl.createComment)

router.delete('/:gameId', isLoggedIn, gamesCtrl.delete)

router.delete('/:gameId/comments/:commentId', isLoggedIn, gamesCtrl.deleteComment)

router.put('/:gameId', isLoggedIn, gamesCtrl.update)

export {
  router
}
