import supertest from 'supertest'
import { describe, it, expect } from '@jest/globals'
import { app } from '../../server'

type Cookie = {
  name: string
  value: string
}

describe('Testing the cookie parser middleware', () => {
  const testRoute = '/test/cookieParser'

  const request = async (cookies: Cookie[]) => {
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
      value: 'cookie_value_'
    }

    const resp = await request([cookie])

    const respCookies = resp.body.load.cookies

    expect(respCookies).toBeDefined()
    expect(respCookies[cookie.name]).toBeDefined()
    expect(respCookies[cookie.name]).toBe(cookie.value)
  })
})
