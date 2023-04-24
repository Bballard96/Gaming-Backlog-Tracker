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
  hoursPlayed: { type: Number, min: 1, max: 9999},
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