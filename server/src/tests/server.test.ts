import { describe, it, expect } from '@jest/globals'
import supertest from 'supertest'
import { app } from '../server'

const request = supertest(app)

describe('Testing GET to /', () => {
  it('should return status 200', async () => {
    const resp = await request.get('/')
    expect(resp.status).toBe(200)
  })

  it('should return an html file', async () => {
    const resp = await request.get('/')
    const contentType = resp.headers['content-type']
    expect(contentType).toContain('text/html')
  })
})

describe('Testing server\'s ability to handle json', () => {
  it('should return the same json that it has received', async () => {
    const testObj = {
      test: 'test',
      arr: ['item1', 2],
      empty: '',
      num: 4
    }

    const resp = await request.post('/test/json')
      .send(testObj)
      .set('content-type', 'application/json')
      .set('Accept', 'application/json')

    const contentType = resp.headers['content-type']
    expect(contentType).toContain('application/json')
    expect(resp.body).toEqual(testObj)
  })
})
