import type { UserLoginData } from '../../../../shared/types/UserSharedTypes'
import supertest from 'supertest'
import { describe, it, expect, test } from '@jest/globals'
import { apiPaths } from '../../../../shared/apiPaths'
import { app } from '../../server'
import { isErrorResponseObj, isSuccessResponseObj } from '../../../../shared/serverResponseMethods'

const request = supertest(app)

const nonExistingUser: UserLoginData = {
  username: 'someUser',
  password: 'somePass'
}

const existingUser: UserLoginData = {
  username: 'existing_username',
  password: 'some_password'
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

  describe('should return error response', () => {
    test('when no username is provided', async () => {
      const invalidReqPayload = { password: 'somePass' }
      const resp = await request.post(apiPaths.user.login)
        .send(invalidReqPayload)

      expect(resp.status).toBe(400)
      expect(isErrorResponseObj(resp.body)).toBe(true)
    })

    test('when no password is provided', async () => {
      const invalidReqPayload = { username: existingUser.username }
      const resp = await request.post(apiPaths.user.login)
        .send(invalidReqPayload)

      expect(resp.status).toBe(400)
      expect(isErrorResponseObj(resp.body)).toBe(true)
    })

    test('when username is an empty string', async () => {
      const invalidReqPayload = {
        username: '',
        password: existingUser.password
      }

      const resp = await request.post(apiPaths.user.login)
        .send(invalidReqPayload)

      expect(resp.status).toBe(400)
      expect(isErrorResponseObj(resp.body)).toBe(true)
    })

    test('when the password is an empty string', async () => {
      const invalidReqPayload = {
        username: existingUser.username,
        password: ''
      }

      const resp = await request.post(apiPaths.user.login)
        .send(invalidReqPayload)

      expect(resp.status).toBe(400)
      expect(isErrorResponseObj(resp.body)).toBe(true)
    })

    test('when wrong password is provided', async () => {
      const invalidReqPayload = {
        username: existingUser.username,
        password: 'someRandomPassword'
      }

      const resp = await request.post(apiPaths.user.login)
        .send(invalidReqPayload)

      expect(resp.status).toBe(400)
      expect(isErrorResponseObj(resp.body)).toBe(true)
    })
  })

  describe('Testing when the correct login credentials are provided', () => {
    it('should return status 200', async () => {
      const resp = await request.post(apiPaths.user.login)
        .send(existingUser)

      expect(resp.status).toBe(200)
    })

    it('should return a success response object', async () => {
      const resp = await request.post(apiPaths.user.login)
        .send(existingUser)

      expect(isSuccessResponseObj(resp.body)).toBe(true)
    })

    it('should contain a jwt', async () => {
      const resp = await request.post(apiPaths.user.login)
        .send(existingUser)

      expect(typeof resp.body.token).toBe('string')
    })
  })
})
