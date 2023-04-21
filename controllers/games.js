// import { Game } from "../models/game.js";

import { Game } from "../models/game.js";


function newGame(req, res) {
  res.render('games/new', {
    title: 'Create Game'
  })
}

function create(req, res) {
  // req.body.owner = req.user.profile._id
  // req.body.completed = !!req.body.completed
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Game.create(req.body)
  .then(game => {
    res.redirect(`/games/`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games/new')
  })
}

function index(req, res) {
  Game.find({})
  .populate('owner')
  .then(games => {
    console.log(games);
    res.render('games/index', {
      games: games,
      title: "🎮 All Games"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Game.findById(req.params.gameId)
  .populate('owner')
  .then(game => {
    res.render('games/show', {
      game: game,
      title: "Game Detail"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}

function deleteGame(req, res) {
  Game.findByIdAndDelete(req.params.gameId)
  .then(game => {
    res.redirect('/games')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}

function edit(req, res) {
  Game.findById(req.params.gameId)
  .then(game => {
    res.render('games/edit', {
      game: game,
      title: 'Edit Game'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}

function update(req, res) {
  Game.findByIdAndUpdate(req.params.gameId, req.body, {new: true})
  .then(game => {
    res.redirect(`/games/${game._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}

function createReview(req, res) {
  Game.findById(req.params.gameId)
  .then(game => {
    game.comments.push(req.body)
    game.save()
    .then(()=> {
      res.redirect(`/games/${game._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}














export {
  newGame as new,
  index,
  create,
  deleteGame as delete,
  show,
  edit,
  update,
  createReview,
}