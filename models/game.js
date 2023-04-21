import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String,
  rating: {type: Number, min: 1, max: 5, default: 1}
})

const gameSchema = new Schema({
  Title: {
    type: String, required: true
  },
  hoursPlayed: { type: Number, min: 1, max: 9999},
  completed: {type: Boolean},
  comments: [commentSchema],
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
//   owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
// }, {
//   timestamps: true,
})

const Game = mongoose.model('Game', gameSchema)

export {
  Game
}