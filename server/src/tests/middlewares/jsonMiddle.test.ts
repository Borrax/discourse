
import supertest from 'supertest'
import { describe, it, expect } from '@jest/globals'
import { app } from '../../server'

describe('Testing the json handling middleware', () => {
  const request = supertest(app)

  it('should return the same json that it has received', async () => {
    const testObj = {
      test: 'test',
      arr: ['item1', 2],
      empty: '',
      num: 4,
      isTrue: true
    }

    const resp = await request.post('/test/json')
      .send(testObj)

    expect(resp.type).toBe('application/json')
    expect(resp.body).toEqual(testObj)
  })
})
