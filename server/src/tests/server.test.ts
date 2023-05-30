import { describe, it } from 'node:test'
import supertest from 'supertest'
import assert from 'node:assert'
import { app } from '../server'

describe('Express server testing', () => {
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

  describe('Testing server\'s ability to handle json', () => {
    it('should return status 400 when bad json is sent', async () => {
      const badJsonStr = `{
        "test": testing
        "subject": "bad json"
      }`

      const resp = await supertest(app).post('/test/json')
        .send(badJsonStr)
        .set('content-type', 'application/json')

      assert.strictEqual(resp.status, 400)
    })

    it('should return the same json that it has received', async () => {
      const testObj = {
        test: 'test',
        arr: ['item1', 2],
        empty: '',
        num: 4
      }

      const resp = await supertest(app).post('/test/json')
        .send(testObj)
        .set('content-type', 'application/json')

      const contentType = resp.headers['content-type']
      assert.strictEqual(resp.status, 200)
      assert.ok(contentType.includes('application/json'))
      assert.deepStrictEqual(resp.body, testObj)
    })
  })
})
