import type { UserLoginData } from '../../../../shared/types/UserSharedTypes'
import supertest from 'supertest'
import { describe, it, expect } from '@jest/globals'
import { apiPaths } from '../../../../shared/apiPaths'
import { app } from '../../server'
import { isErrorResponseObj } from '../../serverResponseMethods'

const request = supertest(app)

const nonExistingUser: UserLoginData = {
  username: 'someUser',
  password: 'somePass'
}

describe('Testing the user login at ' + apiPaths.user.login, () => {
  describe('Testing when user doesn\'t exist', () => {
    it('should return status 400 when the user doesn\'t exist', async () => {
      const resp = await request.post(apiPaths.user.login)
        .send(nonExistingUser)

      expect(resp.status).toBe(400)
    })
  })

  it('should return an error response object', async () => {
    const resp = await request.post(apiPaths.user.login)
      .send(nonExistingUser)

    expect(isErrorResponseObj(resp.body)).toBe(true)
  })

  it('should contain the words \'exists\' or \'registered\' in the error' + 'message', async () => {
    const regex = /(exists)|(registered)/ig
    const resp = await request.post(apiPaths.user.login)
      .send(nonExistingUser)

    expect(regex.test(resp.body.err)).toBe(true)
  })
})

describe('Testing when invalid input is provided', () => {
  it('should return status 400', async () => {
    const invalidReqPayload = {}
    const resp = await request.post(apiPaths.user.login)
      .send(invalidReqPayload)

    expect(resp.status).toBe(400)
  })
})
