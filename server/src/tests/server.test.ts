import supertest from 'supertest'
import { describe, it, expect } from '@jest/globals'
import { app } from '../server'

describe('Testing GET to /', () => {
  const request = supertest(app)

  it('should return status 200', async () => {
    const resp = await request.get('/')
    expect(resp.status).toBe(200)
  })

  it('should return an html file', async () => {
    const resp = await request.get('/')

    expect(resp.type).toBe('text/html')
    expect(resp.text).toContain('<html')
    expect(resp.text).toContain('</html>')
  })
})
