import { describe, it, expect } from '@jest/globals'
import supertest from 'supertest'
import { app } from '../server'

const request = supertest(app)

describe('Testing GET to /', () => {
  it('should return status 200', async () => {
    const resp = await request.get('/')
    expect(resp.status).toBe(200)
  })

  it('should return an html file', async () => {
    const resp = await request.get('/')
    const contentType = resp.headers['content-type']
    expect(contentType).toContain('text/html')
  })
})
