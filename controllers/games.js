// import { Game } from "../models/game.js";

import { Game } from "../models/game.js";



function index(req, res) {
  Game.find({})
  .populate('owner')
  .then(games => {
    console.log(games);
    res.render('games/index', {
      games,
      title: "🎮"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  // req.body.tasty = !!req.body.tasty
  Game.create(req.body)
  .then(game => {
    res.redirect('/games')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Game.findById(req.params.gameId)
  .populate('owner')
  .then(taco => {
    res.render('games/show', {
      game,
      title: "🎮 show"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}



export {
  index,
  create,
  show
}