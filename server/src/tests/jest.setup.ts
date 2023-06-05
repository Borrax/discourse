
import type { IncomingMessage, Server, ServerResponse } from 'http'
import { beforeAll, afterAll } from '@jest/globals'
import { app } from '../server'
import { initializeDb } from '../db/db'
import mongoose from 'mongoose'

let server: Server<typeof IncomingMessage, typeof ServerResponse>

beforeAll(async () => {
  await new Promise((res, _rej) => {
    initializeDb(() => { res(null) })
  })
  server = app.listen(3000, () => {
    console.log('Server listening for tests')
  })
})

afterAll(async () => {
  await mongoose.connection.close().then(() => {
    console.log('Disconnected from the DB')
  })
    .catch(err => { console.error(err) })
  await new Promise((res) => {
    server.close(() => { 
      console.log('Server closed')
      res(null)
    }) 
  })
})
