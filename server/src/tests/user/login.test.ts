import type{ UserLoginData } from '../../../../shared/types/UserSharedTypes'
import supertest from 'supertest'
import { describe, it, expect } from '@jest/globals'
import { apiPaths } from '../../../../shared/apiPaths'
import { app } from '../../server'

const request = supertest(app)

describe('Testing the user login at ' + apiPaths.user.login , () => {
  describe('Testing invalid requests', () => {
    it('should return status 400 when the user doesn\'t exist', async () => {
      const nonExistingUser: UserLoginData = {
        username: 'someUser',
        password: 'somePass'
      }

      const resp = await request.post(apiPaths.user.login)
        .send(nonExistingUser)

      expect(resp.status).toBe(400)
    })
  })
})
