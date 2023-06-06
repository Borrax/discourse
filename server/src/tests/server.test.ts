import { describe, it, expect, jest } from '@jest/globals'
import { app } from '../server'
import supertest from 'supertest'

const request = supertest.agent(app)

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
  it('should return status 400 when bad json is sent', async () => {
    const badJsonStr = `{
      "test": testing
      "subject": "bad json"
    }`

    jest.spyOn(console, 'error').mockImplementation(() => {})

    const resp = await request.post('/test/json')
      .send(badJsonStr)
      .set('content-type', 'application/json')

    expect(resp.status).toBe(400)
  })

  it('should display an error in the console when an invalid json is provided', async () => {
    const badJsonStr = `{
      "test": testing
      "subject": "bad json"
    }`

    // surpressing the displaying of the console error for
    // his test
    jest.spyOn(console, 'error').mockImplementation(() => {})

    await request.post('/test/json')
      .send(badJsonStr)
      .set('content-type', 'application/json')

    expect(console.error).toHaveBeenCalled()
  })

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
