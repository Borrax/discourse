import type { Response } from 'supertest'
import type { UserRegData } from '../../types/UserSharedTypes'

import supertest from 'supertest'
import { describe, it, expect, test } from '@jest/globals'
import { apiPaths } from '../../../../shared/apiPaths'
import { isErrorResponseObj, isSuccessResponseObj } from '../../../../shared/serverResponseMethods'
import { app } from '../../server'
import { User } from '../../models/user'
import { allowedUserRegLengths } from '../../../../shared/userRegDataValidator'
import { getExistingUserRegData, getNonExistingUserRegData } from '../testUtils/usersUtils'

describe('Testing the user registration API at ' + apiPaths.user.register, () => {
  const request = supertest(app)

  const { MIN_USERNAME_LEN, MAX_USERNAME_LEN, MIN_PASSWORD_LEN, MAX_PASSWORD_LEN } = allowedUserRegLengths

  const existingUser = getExistingUserRegData()
  const validUser = getNonExistingUserRegData()

  const registerRequest = async (payload: UserRegData): Promise<Response> => {
    return await request.post(apiPaths.user.register)
      .send(payload).catch(err => {
        throw new Error('Error trying to send register request to the server\n', err)
      })
  }

  const removeUserFromDb = async (username: string): Promise<void> => {
    await User.deleteOne({ username }).catch(err => {
      console.error('Error deleting the user while running the tests')
      console.error(err)
    })
  }

  describe('Testing when a valid user is provided', () => {
    it('should return status 200', async () => {
      const resp = await registerRequest(validUser)

      expect(resp.status).toBe(200)
      await removeUserFromDb(validUser.username)
    })

    it('should return a success server response object', async () => {
      const resp = await registerRequest(validUser)

      expect(resp.body).toBeDefined()
      expect(isSuccessResponseObj(resp.body))
        .toBe(true)

      await removeUserFromDb(validUser.username)
    })

    it('should be tecorded to the DB', async () => {
      await registerRequest(validUser)

      const user = await User.findOne({ username: validUser.username })

      expect(user).toBeDefined()
      expect(user?.username).toBe(validUser.username)

      await removeUserFromDb(validUser.username)
    })

    it('the success server response\'s load should have the correct properties', async () => {
      const resp = await registerRequest(validUser)

      expect(resp.body).toBeDefined()
      expect(resp.body.load.username).toBeDefined()
      expect(typeof resp.body.load.username).toBe('string')

      await removeUserFromDb(validUser.username)
    })

    it('should have the correct success information', async () => {
      const resp = await registerRequest(validUser)

      expect(resp.body.load.username).toBe(validUser.username)

      await removeUserFromDb(validUser.username)
    })
  })

  describe('Testing when user already exists', () => {
    it('should return a status 400', async () => {
      const resp = await registerRequest(existingUser)
      expect(resp.status).toBe(400)
    })

    it('should return an error response object', async () => {
      const resp = await registerRequest(existingUser)
      expect(isErrorResponseObj(resp.body)).toBe(true)
    })

    it('should contain an error message string', async () => {
      const resp = await registerRequest(existingUser)

      expect(resp.body.err).toBeDefined()
      expect(typeof resp.body.err).toBe('string')
      expect(resp.body.err.length).toBeGreaterThan(0)
    })

    it('should include words \'registered\' or \'exists\' in the error message string', async () => {
      const resp = await registerRequest(existingUser)
      const regex = /(exists)|(registered)/g

      expect(regex.test(resp.body.err)).toBe(true)
    })
  })

  describe('Testing invalid input data', () => {
    it('should return status 400', async () => {
      const invalidUser = { username: 'invalidUser' }
      const resp = await registerRequest(invalidUser as any)

      const userInDb = await User.findOne({
        username: invalidUser.username
      })

      expect(userInDb).toBe(null)
      expect(resp.status).toBe(400)
    })

    describe('should return an error response', () => {
      test('when no username property', async () => {
        const invalidUser = { password: 'somePass' }

        const resp = await registerRequest(invalidUser as any)

        expect(resp.status).toBe(400)
        expect(resp.body).toBeDefined()
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })

      test('when no password property', async () => {
        const invalidUser = { username: 'someUsername' }

        const resp = await registerRequest(invalidUser as any)

        const userInDb = await User.findOne({
          username: invalidUser.username
        })

        expect(userInDb).toBe(null)
        expect(resp.status).toBe(400)
        expect(resp.body).toBeDefined()
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })

      test('when an empty object', async () => {
        const invalidUser = {}

        const resp = await registerRequest(invalidUser as any)

        expect(resp.status).toBe(400)
        expect(resp.body).toBeDefined()
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })

      test('when username is an empty str', async () => {
        const invalidUser = {
          username: '',
          password: 'somePass'
        }

        const resp = await registerRequest(invalidUser)

        const userInDb = await User.findOne({
          username: invalidUser.username
        })

        expect(userInDb).toBe(null)
        expect(resp.status).toBe(400)
        expect(resp.body).toBeDefined()
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })

      test(`when username is below ${MIN_USERNAME_LEN} chars`, async () => {
        const invalidUser = {
          password: 'somePass',
          username: 'so'
        }

        const resp = await registerRequest(invalidUser)

        const userInDb = await User.findOne({
          username: invalidUser.username
        })

        expect(userInDb).toBe(null)
        expect(resp.status).toBe(400)
        expect(resp.body).toBeDefined()
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })

      test(`when username is above ${MAX_USERNAME_LEN} chars`, async () => {
        const invalidUser = {
          password: 'somePass',
          username: 'someUsernameLongerThan20Chars'
        }

        const resp = await registerRequest(invalidUser)

        const userInDb = await User.findOne({
          username: invalidUser.username
        })

        expect(userInDb).toBe(null)
        expect(resp.status).toBe(400)
        expect(resp.body).toBeDefined()
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })

      test('when username contains spaces', async () => {
        const invalidUser = {
          password: 'somePassword',
          username: 'some Username'
        }

        const resp = await registerRequest(invalidUser)

        const userInDb = await User.findOne({
          username: invalidUser.username
        })

        expect(userInDb).toBe(null)
        expect(resp.status).toBe(400)
        expect(resp.body).toBeDefined()
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })

      test('when password is an empty str', async () => {
        const invalidUser = {
          password: '',
          username: 'someUsername'
        }

        const resp = await registerRequest(invalidUser)

        const userInDb = await User.findOne({
          username: invalidUser.username
        })

        expect(userInDb).toBe(null)
        expect(resp.status).toBe(400)
        expect(resp.body).toBeDefined()
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })

      test(`when password is below ${MIN_PASSWORD_LEN} chars`, async () => {
        const invalidUser = {
          password: 'someP',
          username: 'someUsername'
        }

        const resp = await registerRequest(invalidUser)

        const userInDb = await User.findOne({
          username: invalidUser.username
        })

        expect(userInDb).toBe(null)
        expect(resp.status).toBe(400)
        expect(resp.body).toBeDefined()
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })

      test(`when password is longer than ${MAX_PASSWORD_LEN} chars`, async () => {
        const invalidUser = {
          password: 'somePasswordThatIsReallyReallyLong',
          username: 'someUsername'
        }

        const resp = await registerRequest(invalidUser)

        const userInDb = await User.findOne({
          username: invalidUser.username
        })

        expect(userInDb).toBe(null)
        expect(resp.status).toBe(400)
        expect(resp.body).toBeDefined()
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })

      test('when password contains spaces', async () => {
        const invalidUser = {
          password: 'some Password',
          username: 'someUsername'
        }

        const resp = await registerRequest(invalidUser)

        const userInDb = await User.findOne({
          username: invalidUser.username
        })

        expect(userInDb).toBe(null)
        expect(resp.status).toBe(400)
        expect(resp.body).toBeDefined()
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })
    })
  })
})
