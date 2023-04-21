import mongoose from 'mongoose'

const Schema = mongoose.Schema

const gameSchema = new Schema({
  name: String,
  tasty: Boolean,
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
}, {
  timestamps: true,
})

const Game = mongoose.model('Game', gameSchema)

export {
  Game
}