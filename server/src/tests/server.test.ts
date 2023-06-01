import { describe, it, expect } from '@jest/globals'
import supertest from 'supertest'
import { app } from '../server'

describe('Express server testing', () => {
  describe('Testing GET to /', () => {
    it('should return status 200', async () => {
      const resp = await supertest(app).get('/')
      expect(resp.status).toBe(200)
    })

    it('should return an html file', async () => {
      const resp = await supertest(app).get('/')
      const contentType = resp.headers['content-type']
      expect(contentType).toContain('text/html')
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

      expect(resp.status).toBe(400)
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
        .set('Accept', 'application/json')

      const contentType = resp.headers['content-type']
      expect(contentType).toContain('application/json')
      expect(resp.body).toEqual(testObj)
    })
  })
})
