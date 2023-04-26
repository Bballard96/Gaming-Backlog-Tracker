
import 'dotenv/config.js'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import createError from 'http-errors'
import session from 'express-session'
import logger from 'morgan'
import methodOverride from 'method-override'
import passport from 'passport'

import { passDataToView } from './middleware/middleware.js'


import './config/database.js'


import'./config/passport.js'

import { router as indexRouter } from './routes/index.js'
import { router as authRouter } from './routes/auth.js'
import { router as gamesRouter } from './routes/games.js'


const app = express()


app.set('view engine', 'ejs')


app.use(methodOverride('_method'))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  express.static(
    path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')
  )
)

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'lax',
    },
  })
)


app.use(passport.initialize())
app.use(passport.session())

app.use(passDataToView)

app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/games', gamesRouter)


app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error', {
    title: `🎊 ${err.status || 500} Error`,
    user: req.user ? req.user : null,
    googleClientID: process.env.GOOGLE_CLIENT_ID,
  })
})

export { 
  app 
}
