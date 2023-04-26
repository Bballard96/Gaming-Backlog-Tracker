import { Game } from "../models/game.js";

function newGame(req, res) {
  res.render('games/new', {
    title: 'Create Game'
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  req.body.completed = !!req.body.completed
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
  const profileID = req.user.profile._id 
  Game.find({ owner: profileID})
  .then(games => {
    res.render('games/index', {
      games: games,
      title: "All Games"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function newIndex(req, res) {
  const profileID = req.user.profile.id 
  Game.find({ owner: profileID})
  Game.find({})
  .then(games => {
    res.render('games/completed', {
      games: games,
      title: "All Games"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Game.findById(req.params.gameId)
  .then(game => {
    res.render('games/show', {
      game: game,
      title: "Game Details"
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
  req.body.completed = !!req.body.completed
  Game.findByIdAndUpdate(req.params.gameId, req.body, {new: true})
  .then(game => {
    res.redirect(`/games/${game._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}

function createComment(req, res) {
  Game.findById(req.params.gameId)
  .then(game => {
    game.comments.push(req.body)
    game.save()
    .then(()=> {
      res.redirect(`/games/${game._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/games/${game._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteComment(req, res) {
  Game.findById(req.params.gameId)
  .then(game => {
    game.comments.remove(req.params.commentId)
    game.save()
    .then(() => {
      res.redirect(`/games/${game._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/games')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
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
  createComment,
  deleteComment,
  newIndex
}