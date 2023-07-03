import type { Response } from 'supertest'

import supertest from 'supertest'
import { describe, it, expect } from '@jest/globals'
import { app } from '../../server'
import { genRandomString } from '../testUtils/randomStrings'
import { genRandomInt } from '../testUtils/randomNumber'
import { cookieConfig } from '../../configs/cookieConfig'
import { isErrorResponseObj } from '../../../../shared/serverResponseMethods'

interface Cookie {
  name: string
  value: string
}

describe('Testing the cookie parser middleware', () => {
  const testRoute = '/test/cookieParser'
  const cookieAllowedChars = cookieConfig.allowedChars

  const request = async (cookies: Cookie[]): Promise<Response> => {
    let cookieHeaderVal = ''
    for (let i = 0; i < cookies.length - 1; i++) {
      const c = cookies[i]
      cookieHeaderVal += `${c.name}=${c.value}; `
    }

    const lastCookie = cookies[cookies.length - 1]
    cookieHeaderVal += `${lastCookie.name}=${lastCookie.value}`

    return await supertest(app).get(testRoute)
      .set('Cookie', cookieHeaderVal)
  }

  it('should process the one cookie passed', async () => {
    const cookie: Cookie = {
      name: 'cookie1',
      value: 'cookieValue1231231'
    }

    const resp = await request([cookie])

    const respCookies = resp.body.load.cookies

    expect(respCookies).toBeDefined()
    expect(respCookies[cookie.name]).toBeDefined()
    expect(respCookies[cookie.name]).toBe(cookie.value)
  })

  it('should process multiple cookies', async () => {
    const cookies: Cookie[] = []

    for (let i = 0; i < 10; i++) {
      const nameLen = genRandomInt(1, 16)
      const valueLen = genRandomInt(1, 32)
      const c: Cookie = {
        name: genRandomString(nameLen, cookieAllowedChars.name),
        value: genRandomString(valueLen, cookieAllowedChars.value)
      }

      cookies.push(c)
    }

    const resp = await request(cookies)

    const respCookies = resp.body.load.cookies

    expect(respCookies).toBeDefined()

    for (let i = 0; i < cookies.length; i++) {
      const currCookie = cookies[i]
      expect(respCookies[currCookie.name]).toBe(currCookie.value)
    }
  })

  it('should return an error message when the cookie header is too big',
    async () => {
      const veryLongString = genRandomString(4097)

      const cookie: Cookie = {
        name: 'testCookie',
        value: veryLongString
      }
      const resp = await request([cookie])

      expect(resp.status).toBe(400)
      expect(isErrorResponseObj(resp.body)).toBe(true)
    })
})
