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

const request = supertest.agent(globalThis.__SERVER__)

describe('Testing the user registration API at ' + registerPath, () => {
  it('should return an error response when the username exists', async () => {
    const resp = await request.post(registerPath)
      .send(existingUser)

    expect(isErrorResponseObj(resp.body)).toBe(true)
  })
})
