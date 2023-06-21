import type { UserLoginData } from '../../../../shared/types/UserSharedTypes'
import type { Response } from 'supertest'

import supertest from 'supertest'
import { describe, it, expect, test } from '@jest/globals'
import { apiPaths } from '../../../../shared/apiPaths'
import { app } from '../../server'
import { isErrorResponseObj, isSuccessResponseObj } from '../../../../shared/serverResponseMethods'
import { isJWT } from '../../utils/jwtUtils'
import { allowedUserRegLengths, regDataValidationRegex } from '../../../../shared/userConstraintsShared'
import { genRandomStrWBadChars, genRandomString } from '../testUtils/randomStrings'
import { getExistingUserLoginData, getNonExistentUserLoginData } from '../testUtils/usersUtils'

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

  const nonExistingUser = getNonExistentUserLoginData()
  const existingUser = getExistingUserLoginData()

  const {
    MIN_USERNAME_LEN, MAX_USERNAME_LEN,
    MIN_PASSWORD_LEN, MAX_PASSWORD_LEN
  } = allowedUserRegLengths

  const { USERNAME_REGEX, PASSWORD_REGEX } = regDataValidationRegex

  const loginRequest = async (payload: UserLoginData): Promise<Response> => {
    return await request.post(apiPaths.user.login).send(payload)
  }

  describe('When the user doesn\'t exist', () => {
    it('should return status 400', async () => {
      const resp = await loginRequest(nonExistingUser)

      expect(resp.status).toBe(400)
    })

    it('should return an error response object', async () => {
      const resp = await loginRequest(nonExistingUser)

      expect(isErrorResponseObj(resp.body)).toBe(true)
    })

    it(`should contain the words 'credentials' or 
  'password' and 'username' in the error message`, async () => {
      const regex = /(credentials)|((?=.*\bpassword\b)(.*\busername\b).*)/ig
      const resp = await loginRequest(nonExistingUser)

      expect(regex.test(resp.body.err)).toBe(true)
    })
  })

  describe('When invalid input is provided', () => {
    it('should return status 400', async () => {
      const invalidReqPayload = {}
      const resp = await loginRequest(invalidReqPayload as any)

      expect(resp.status).toBe(400)
    })

    describe('should return an error response', () => {
      test('when no username is provided', async () => {
        const invalidReqPayload = { password: 'somePass' }
        const resp = await loginRequest(invalidReqPayload as any)

        expect(resp.status).toBe(400)
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })

      test('when no password is provided', async () => {
        const invalidReqPayload = { username: existingUser.username }
        const resp = await loginRequest(invalidReqPayload as any)

        expect(resp.status).toBe(400)
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })

      test('when username is an empty string', async () => {
        const invalidReqPayload = {
          username: '',
          password: existingUser.password
        }

        const resp = await loginRequest(invalidReqPayload)

        expect(resp.status).toBe(400)
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })

      test(`when username is shorter than ${MIN_USERNAME_LEN} chars`, async () => {
        const invalidReqPayload = {
          username: existingUser.username.substring(0, MIN_USERNAME_LEN),
          password: 'someRandomPassword'
        }

        const resp = await loginRequest(invalidReqPayload)

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

        const resp = await loginRequest(invalidReqPayload)

        expect(resp.status).toBe(400)
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })

      test('when the username has forbidden chars', async () => {
        const badUsername = genRandomStrWBadChars(10, PASSWORD_REGEX)

        const invalidUser = {
          username: badUsername,
          password: existingUser.password
        }

        const resp = await loginRequest(invalidUser)

        expect(resp.status).toBe(400)
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })

      test('when the password is an empty string', async () => {
        const invalidReqPayload = {
          username: existingUser.username,
          password: ''
        }

        const resp = await loginRequest(invalidReqPayload)

        expect(resp.status).toBe(400)
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })

      test(`when password is shorter than ${MIN_PASSWORD_LEN} chars`, async () => {
        const invalidReqPayload = {
          username: existingUser.username,
          password: existingUser.password.substring(0, MIN_PASSWORD_LEN)
        }

        const resp = await loginRequest(invalidReqPayload)

        expect(resp.status).toBe(400)
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })

      test(`when password is longer than ${MAX_PASSWORD_LEN} chars`, async () => {
        const longPass = existingUser.password + genRandomString(MAX_PASSWORD_LEN, PASSWORD_REGEX)

        const invalidReqPayload = {
          username: existingUser.username,
          password: longPass
        }

        const resp = await loginRequest(invalidReqPayload)

        expect(resp.status).toBe(400)
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })

      test('when the password has forbidden chars', async () => {
        const badPass = genRandomStrWBadChars(10, PASSWORD_REGEX)

        const invalidUser = {
          username: existingUser.username,
          password: badPass
        }

        const resp = await loginRequest(invalidUser)

        expect(resp.status).toBe(400)
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })

      test('when wrong password is provided', async () => {
        const invalidReqPayload = {
          username: existingUser.username,
          password: 'someRandomPassword'
        }

        const resp = await loginRequest(invalidReqPayload)

        expect(resp.status).toBe(400)
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })
    })
  })

  describe('When the correct login credentials are provided', () => {
    it('should return status 200', async () => {
      const resp = await loginRequest(existingUser)

      expect(resp.status).toBe(200)
    })

    it('should return a success response object', async () => {
      const resp = await loginRequest(existingUser)

      expect(isSuccessResponseObj(resp.body)).toBe(true)
    })

    it('should contain a jwt', async () => {
      const resp = await loginRequest(existingUser)

      expect(typeof resp.body.load.token).toBe('string')
      expect(isJWT(resp.body.load.token)).toBe(true)
    })

    it('should set a cookie', async () => {
      const resp = await loginRequest(existingUser)

      expect(resp.header['set-cookie']).toBeDefined()
    })

    it('should have a cookie called \'token\'', async () => {
      const resp = await loginRequest(existingUser)

      const cookieValue = extractCookieValue(resp, 'token')
      expect(typeof cookieValue).toBe('string')
    })

    it('the value of the token cookie should be a JWT', async () => {
      const resp = await loginRequest(existingUser)

      const cookieValue = extractCookieValue(resp, 'token')
      expect(isJWT(cookieValue)).toBe(true)
    })
  })
})
