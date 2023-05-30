import { describe, it } from 'node:test'
import supertest from 'supertest'
import assert from 'node:assert'
import { app } from '../server'

describe('Express server', () => {
  describe('Testing GET to /', () => {
    it('should return status 200', async () => {
      const resp = await supertest(app).get('/')
      assert.equal(resp.status, 200)
    })

    it('should return an html file', async () => {
      const resp = await supertest(app).get('/')
      const contentType = resp.headers['content-type']
      assert.ok(contentType.includes('text/html'))
    })
  })
})
