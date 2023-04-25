import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String,
}, {
  timestamps: true
})


const gameSchema = new Schema({
  title: {
    type: String, required: true
  },
  hoursPlayed: { type: Number, min: 0, max: 9999},
  esrbRating: {type: String, enum: ['E', 'T', 'M', 'AO']},
  genre: {type: String, enum: ['Action', 'Platform', 'Shooter', 'Fighting', 'Survival', 'MMO', 'Horror', 'Visual Novel', 'Puzzle', 'RPG', 'Sim', 'Racing', 'Adventure', 'Sports', 'Card', 'Battle Royale']},
  completed: {type: Boolean},
  // comments: {type: String },
  comments: [commentSchema],
  // rating: {type: Number, min: 1, max: 5, default: 5}
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
// }, {
//   timestamps: true,
})


const Game = mongoose.model('Game', gameSchema)

export {
  Game
}