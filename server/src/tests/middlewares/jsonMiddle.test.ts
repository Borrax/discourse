
import { describe, it, expect } from '@jest/globals'
import supertest from 'supertest'
import { app } from '../../server'

describe('Testing the json handling middleware', () => {
  const request = supertest(app)

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
