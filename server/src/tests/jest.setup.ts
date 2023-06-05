
import type { IncomingMessage, Server, ServerResponse } from 'http'
import { beforeAll, afterAll } from '@jest/globals'
import supertest from 'supertest'
import { app } from '../server'
import { initializeDb } from '../db/db'
import mongoose from 'mongoose'

let server: Server<typeof IncomingMessage, typeof ServerResponse>
/**
* @var The superterst agent instance that uses the initialized
* server and through which all the api requests pass through 
*/
export let request: supertest.SuperAgentTest

beforeAll(async () => {
  await new Promise((res, _rej) => {
    initializeDb(() => { res(null) })
  })
  server = app.listen(8000, () => {
    console.log('Server listening for tests')
  })

  request = supertest.agent(server)
})

afterAll(() => {
  server.close()
  mongoose.connection.close().then(() => {})
    .catch(err => { console.error(err) })
})
