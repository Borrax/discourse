import { describe, test, expect } from '@jest/globals'
import { isJWT } from '../../utils/isJWT'

describe('Testing the isJWT utils method', () => {
  describe('should return false', () => {
    test('when the input is not a string', () => {
      expect(isJWT((5 as any))).toBe(false)
      expect(isJWT([] as any)).toBe(false)
      expect(isJWT({} as any)).toBe(false)
      expect(isJWT(2.2 as any)).toBe(false)
    })

    test('when the input is undefined or null', () => {
      expect(isJWT(null as any)).toBe(false)
      expect(isJWT(undefined as any)).toBe(false)
    })

    test('when it\'s an empty string', () => {
      expect(isJWT('')).toBe(false)
    })

    test('when it\'s a wrong format string', () => {
      expect(isJWT('testingString')).toBe(false)
      expect(isJWT('t')).toBe(false)
      expect(isJWT('test.test-test')).toBe(false)
      expect(isJWT('test..test.test')).toBe(false)
      expect(isJWT('test.test.test.test1123')).toBe(false)
      expect(isJWT('test-test-test')).toBe(false)
      expect(isJWT('tedsat:testdasdad.test')).toBe(false)
    })
  })

  describe('should return true', () => {
    const jwt1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJvcGVuYW1lIiwic3ViIjoiMTIzNDU2Nzg5MCIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjMwMDAiLCJpYXQiOjE2MzAyMzEwOTIsImV4cCI6MTYzMDIzMjA5MiwibmJmIjoxNjMwMjMxMDkyLCJqdGkiOiJhY2Nlc3MifQ.IIeCzX6kMbB19eQWmzxMcGJXZXgtRDhAKVOrQfFKCxM'
    const jwt2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzAyMzIwMzMsInN1YiI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2MzAyMzE4MzN9.8g6VZr02iEhKx_jI3bsO5TTyM3VXkM-R1BG0L0TqR0o'
    const jwt3 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.RG9lVGVzdCBQYXlsb2Fk'

    test('when a correct JWT is provided', () => {
      expect(isJWT(jwt1)).toBe(true)
      expect(isJWT(jwt2)).toBe(true)
      expect(isJWT(jwt3)).toBe(true)
    })
  })
})
