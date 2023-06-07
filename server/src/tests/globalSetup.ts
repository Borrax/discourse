import type { Server } from 'http'
import mongoose from 'mongoose'
import { app } from '../server'
import { initializeDb } from '../db/db'
const PORT = 8000

export default async (): Promise<void> => {
  await new Promise((resolve, _reject) => {
    initializeDb(() => { resolve(null) })
  })

  const server = await new Promise<Server>((resolve, _reject) => {
    const s = app.listen(PORT, () => {
      console.log('Server listening on port ', PORT)
      resolve(s)
    })
  })

  globalThis.TEST_SERVER = server
  globalThis.TEST_DB = mongoose.connection
}
