import type { UserLoginData } from '../../../../shared/types/UserSharedTypes'
import type { Response } from 'supertest'

import supertest from 'supertest'
import { describe, it, expect, test } from '@jest/globals'
import { apiPaths } from '../../../../shared/apiPaths'
import { app } from '../../server'
import { isErrorResponseObj, isSuccessResponseObj } from '../../../../shared/serverResponseMethods'
import { isJWT } from '../../utils/jwtUtils'
import { allowedUserRegLengths, regDataValidationRegex } from '../../../../shared/userRegDataValidator'
import { genRandomString } from '../testUtils'

const nonExistingUser: UserLoginData = {
  username: 'someUser',
  password: 'somePass'
}

const existingUser: UserLoginData = {
  username: 'existing_username',
  password: 'some_password'
}

const extractCookieValue = (resp: Response, cookieName: string): string | null => {
  const tokenRegex = new RegExp(`${cookieName}=(.*?);`)
  let extractedValue = null

  for (const c of resp.headers['set-cookie']) {
    const matched = c.match(tokenRegex)

    if (typeof matched[0] === 'string') {
      extractedValue = matched[1]
      break
    }
  }

  return extractedValue
}

describe('Testing the user login at ' + apiPaths.user.login, () => {
  const request = supertest(app)

  const {
    MIN_USERNAME_LEN, MAX_USERNAME_LEN
  } = allowedUserRegLengths

  const { USERNAME_REGEX } = regDataValidationRegex

  describe('When user doesn\'t exist', () => {
    it('should return status 400', async () => {
      const resp = await request.post(apiPaths.user.login)
        .send(nonExistingUser)

      expect(resp.status).toBe(400)
    })

    it('should return an error response object', async () => {
      const resp = await request.post(apiPaths.user.login)
        .send(nonExistingUser)

      expect(isErrorResponseObj(resp.body)).toBe(true)
    })

    it(`should contain the words 'credentidals' or 
  'password' and 'username' in the error message`, async () => {
      const regex = /(credentials)|((?=.*\bpassword\b)(.*\busername\b).*)/ig
      const resp = await request.post(apiPaths.user.login)
        .send(nonExistingUser)

      expect(regex.test(resp.body.err)).toBe(true)
    })
  })

  describe('When invalid input is provided', () => {
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

      test(`when username is shorter than ${MIN_USERNAME_LEN} chars`, async () => {
        const invalidReqPayload = {
          username: existingUser.username.substring(0, MIN_USERNAME_LEN),
          password: 'someRandomPassword'
        }

        const resp = await request.post(apiPaths.user.login)
          .send(invalidReqPayload)

        expect(resp.status).toBe(400)
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })

      test(`when username is longer than ${MAX_USERNAME_LEN} chars`, async () => {
        const longUsername = existingUser.username +
          genRandomString(MAX_USERNAME_LEN, USERNAME_REGEX)

        const invalidReqPayload = {
          username: longUsername,
          password: 'someRandomPassword'
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
  })

  describe('When the correct login credentials are provided', () => {
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

      expect(typeof resp.body.load.token).toBe('string')
      expect(isJWT(resp.body.load.token)).toBe(true)
    })

    it('should set a cookie', async () => {
      const resp = await request.post(apiPaths.user.login)
        .send(existingUser)

      expect(resp.header['set-cookie']).toBeDefined()
    })

    it('should have a cookie called \'token\'', async () => {
      const resp = await request.post(apiPaths.user.login)
        .send(existingUser)

      const cookieValue = extractCookieValue(resp, 'token')
      expect(typeof cookieValue).toBe('string')
    })

    it('the value of the token cookie should be a JWT', async () => {
      const resp = await request.post(apiPaths.user.login)
        .send(existingUser)

      const cookieValue = extractCookieValue(resp, 'token')
      expect(isJWT(cookieValue)).toBe(true)
    })
  })
})
