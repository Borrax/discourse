import mongoose from 'mongoose'
import { initializeDb } from '../db/db'
import { beforeAll, afterAll } from '@jest/globals'

beforeAll(async () => {
  await new Promise((resolve, _reject) => {
    initializeDb(() => {
      resolve(null)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
