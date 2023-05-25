import type { Document } from 'mongoose'
import { Schema, model } from 'mongoose'

type UserModel = Document & {
  username: string
  password: string
  registeredAt: Date
}

const userSchema = new Schema<UserModel>({
  username: {
    type: String,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  registeredAt: {
    type: Date,
    default: Date.now
  }
})

export const User = model('User', userSchema)
