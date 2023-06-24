
import supertest from 'supertest'
import { describe, it, expect, jest } from '@jest/globals'
import { app } from '../../server'

describe('Testing the error handler middleware', () => {
  const request = supertest(app)

  it('should return status 400 when bad json is sent', async () => {
    const badJsonStr = `{
      "test": testing
      "subject": "bad json"
    }`

    // surpressing the displaying of the console error for
    const spy = jest.spyOn(console, 'error')
      .mockImplementation(() => {})

    const resp = await request.post('/test/json')
      .send(badJsonStr)
      .set('content-type', 'application/json')

    expect(resp.status).toBe(400)
    spy.mockRestore()
  })

  it('should display an error in the console when an invalid json is provided', async () => {
    const badJsonStr = `{
      "test": testing
      "subject": "bad json"
    }`

    const spy = jest.spyOn(console, 'error')
      .mockImplementation(() => {})

    await request.post('/test/json')
      .send(badJsonStr)
      .set('content-type', 'application/json')

    expect(console.error).toHaveBeenCalled()
    spy.mockRestore()
  })
})
