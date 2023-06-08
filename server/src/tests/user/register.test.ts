import type { UserRegData } from '../../UserSharedTypes'
import { describe, it, expect, test } from '@jest/globals'
import supertest from 'supertest'
import { apiPaths } from '../../../../shared/apiPaths'
import { isErrorResponseObj, isSuccessResponseObj } from '../../../../shared/serverResponseMethods'
import { app } from '../../server'
import { User } from '../../models/user'

const registerPath = apiPaths.user.register

const existingUser: UserRegData = {
  username: 'existing_username',
  password: 'some_password'
}

const validUser: UserRegData = {
  username: 'testUsername',
  password: 'testPassword'
}

const removeUserFromDb = async (username: string): Promise<void> => {
  await User.deleteOne({ username }).catch(err => {
    console.error('Error deleting the user while running the tests')
    console.error(err)
  })
}

const request = supertest(app)

describe('Testing the user registration API at ' + registerPath, () => {
  describe('Testing when a valid user is provided', () => {
    it('should return status 200', async () => {
      const resp = await request.post(registerPath).send(validUser)

      expect(resp.status).toBe(200)
      await removeUserFromDb(validUser.username)
    })

    it('should return a success server response object', async () => {
      const resp = await request.post(registerPath).send(validUser)

      expect(resp.body).toBeDefined()
      expect(isSuccessResponseObj(resp.body))
        .toBe(true)

      await removeUserFromDb(validUser.username)
    })

    it('the success server response\'s load should have the correct properties', async () => {
      const resp = await request.post(registerPath).send(validUser)

      expect(resp.body).toBeDefined()
      expect(resp.body.load.username).toBeDefined()
      expect(typeof resp.body.load.username).toBe('string')

      await removeUserFromDb(validUser.username)
    })

    it('should have the correct success information', async () => {
      const resp = await request.post(registerPath).send(validUser)

      expect(resp.body.load.username).toBe(validUser.username)

      await removeUserFromDb(validUser.username)
    })
  })

  describe('Testing when user already exists', () => {
    it('should return a status 400', async () => {
      const resp = await request.post(registerPath)
        .send(existingUser)
      expect(resp.status).toBe(400)
    })

    it('should return an error response object', async () => {
      const resp = await request.post(registerPath)
        .send(existingUser)
      expect(isErrorResponseObj(resp.body)).toBe(true)
    })

    it('should contain an error message string', async () => {
      const resp = await request.post(registerPath)
        .send(existingUser)

      expect(resp.body.err).toBeDefined()
      expect(typeof resp.body.err).toBe('string')
      expect(resp.body.err.length).toBeGreaterThan(0)
    })

    it('should include words \'registered\' or \'exists\' in the error message string', async () => {
      const resp = await request.post(registerPath)
        .send(existingUser)
      const regex = /(exists)|(registered)/g

      expect(regex.test(resp.body.err)).toBe(true)
    })
  })

  describe('Testing invalid input data', () => {
    it('should return status 400', async () => {
      const invalidUser = { username: 'invalidUser' }
      const resp = await request.post(registerPath)
        .send(invalidUser)

      expect(resp.status).toBe(400)
    })

    describe('should return an error response', () => {
      test('when no username property', async () => {
        const invalidUser = { password: 'somePass' }

        const resp = await request.post(registerPath)
          .send(invalidUser)

        expect(resp.status).toBe(400)
        expect(resp.body).toBeDefined()
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })

      test('when no password property', async () => {
        const invalidUser = { username: 'someUsername' }

        const resp = await request.post(registerPath)
          .send(invalidUser)

        expect(resp.status).toBe(400)
        expect(resp.body).toBeDefined()
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })

      test('when an empty object', async () => {
        const invalidUser = {}

        const resp = await request.post(registerPath)
          .send(invalidUser)

        expect(resp.status).toBe(400)
        expect(resp.body).toBeDefined()
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })

      test('when username is an empty str', async () => {
        const invalidUser = {
          username: '',
          password: 'somePass'
        }

        const resp = await request.post(registerPath)
          .send(invalidUser)

        expect(resp.status).toBe(400)
        expect(resp.body).toBeDefined()
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })

      test('when username is below 3 chars', async () => {
        const invalidUser = {
          passwrod: 'somePass',
          username: 'so'
        }

        const resp = await request.post(registerPath)
          .send(invalidUser)

        expect(resp.status).toBe(400)
        expect(resp.body).toBeDefined()
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })

      test('when username is above 20 chars', async () => {
        const invalidUser = {
          passwrod: 'somePass',
          username: 'someUsernameLongerThan20Chars'
        }

        const resp = await request.post(registerPath)
          .send(invalidUser)

        expect(resp.status).toBe(400)
        expect(resp.body).toBeDefined()
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })

      test('when password is an empty str', async () => {
        const invalidUser = {
          passwrod: '',
          username: 'someUsername'
        }

        const resp = await request.post(registerPath)
          .send(invalidUser)

        expect(resp.status).toBe(400)
        expect(resp.body).toBeDefined()
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })


      test('when password is below 6 chars', async () => {
        const invalidUser = {
          passwrod: 'someP',
          username: 'someUsername'
        }

        const resp = await request.post(registerPath)
          .send(invalidUser)

        expect(resp.status).toBe(400)
        expect(resp.body).toBeDefined()
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })

      test('when password is longer than 30 chars', async () => {
        const invalidUser = {
          passwrod: 'somePasswordThatIsReallyReallyLong',
          username: 'someUsername'
        }

        const resp = await request.post(registerPath)
          .send(invalidUser)

        expect(resp.status).toBe(400)
        expect(resp.body).toBeDefined()
        expect(isErrorResponseObj(resp.body)).toBe(true)
      })
    })
  })
})
