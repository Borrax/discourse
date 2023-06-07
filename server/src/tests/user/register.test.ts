import type { UserRegData } from '../../UserSharedTypes'
import { describe, it, expect } from '@jest/globals'
import supertest from 'supertest'
import { apiPaths } from '../../../../shared/apiPaths'
import { isErrorResponseObj } from '../../../../shared/serverResponseMethods'

const registerPath = apiPaths.user.register

const existingUser: UserRegData = {
  username: 'existing_username',
  password: 'some_password'
}

const request = supertest.agent(globalThis.TEST_SERVER)

describe('Testing the user registration API at ' + registerPath, () => {
  it('should return a status 400 when the user already exists', async () => {
    const resp = await request.post(registerPath)
      .send(existingUser)
    expect(resp.status).toBe(400)
  })

  it('should return an error response object when the username exists', async () => {
    const resp = await request.post(registerPath)
      .send(existingUser)
    expect(isErrorResponseObj(resp.body)).toBe(true)
  })

  it('should contain an error message string when the user already exists', async () => {
    const resp = await request.post(registerPath)
      .send(existingUser)

    expect(resp.body.err).toBeDefined()
    expect(typeof resp.body.err).toBe('string')
    expect(resp.body.err.length).toBeGreaterThan(0)
  })

  it(`should include words 'registered' or 'exists' in 
error message string when the user already exists`, async () => {
    const resp = await request.post(registerPath)
      .send(existingUser)
    const regex = /(exists)|(registered)/g

    expect(regex.test(resp.body.err)).toBe(true)
  })
})
