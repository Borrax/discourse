
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
  server = app.listen(8000, () => {
    console.log('Server listening for tests')
  })
})

afterAll(() => {
  server.close()
  mongoose.connection.close().then(() => {})
    .catch(err => { console.error(err) })
})
