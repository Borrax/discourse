import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    index: true
  },
  password: String,
  appearAs: String,
  registeredAt: {
    type: Date,
    default: Date.now
  }
})

export const User = model('User', userSchema)
