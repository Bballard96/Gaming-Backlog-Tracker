import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content:{type: String, required: true}
}, {
  timestamps: true
})

const gameSchema = new Schema({
  title: {
    type: String, required: true
  },
  platform: {type: String,},
  hoursPlayed: { type: Number, min: 0 },
  esrbRating: {type: String, enum: ['E', 'T', 'M', 'AO']},
  genre: {type: String, enum: ['Action', 'Platform', 'Shooter', 'Fighting', 'Survival', 'MMO', 'Horror', 'Visual Novel', 'Puzzle', 'RPG', 'Sim', 'Racing', 'Adventure', 'Sports', 'Card', 'Battle Royale', 'Dance']},
  completed: {type: Boolean},
  comments: [commentSchema],
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
})

const Game = mongoose.model('Game', gameSchema)

export {
  Game
}