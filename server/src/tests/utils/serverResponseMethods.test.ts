import { describe, test, expect, it, jest } from '@jest/globals'
import { createErrorResponseObj, createSuccessResponseObj } from '../../utils/serverResponseMethods'
import { isErrorResponseObj, isSuccessResponseObj } from '../../../../shared/serverResponseMethods'

const originalConsoleError = console.error

describe('Testing the server response methods', () => {
  describe('The error response obj creator', () => {
    const errorMsg = 'test error'

    it('error message should be null when input message is undefined', () => {
      // disable the error message
      const mockFn = jest.fn()
      console.error = mockFn

      const resp = createErrorResponseObj(undefined as any)
      expect(isErrorResponseObj(resp)).toBe(true)
      expect(resp.err).toBe(null)

      console.error = originalConsoleError
    })

    it('should use the error logger when input is undefined', () => {
      const mockFn = jest.fn()
      console.error = mockFn

      createErrorResponseObj(undefined as any)
      expect(mockFn.mock.calls[0][0]).toMatch(/error logger/i)

      console.error = originalConsoleError
    })

    it('should return null when non-string and non-null msg is provided', () => {
      // disable the error message
      const mockFn = jest.fn()
      console.error = mockFn

      let resp = createErrorResponseObj(5 as any)
      expect(isErrorResponseObj(resp)).toBe(true)
      expect(resp.err).toBe(null)

      resp = createErrorResponseObj(5.2 as any)
      expect(isErrorResponseObj(resp)).toBe(true)
      expect(resp.err).toBe(null)

      resp = createErrorResponseObj([] as any)
      expect(isErrorResponseObj(resp)).toBe(true)
      expect(resp.err).toBe(null)

      resp = createErrorResponseObj({} as any)
      expect(isErrorResponseObj(resp)).toBe(true)
      expect(resp.err).toBe(null)

      resp = createErrorResponseObj(true as any)
      expect(isErrorResponseObj(resp)).toBe(true)
      expect(resp.err).toBe(null)

      console.error = originalConsoleError
    })

    it('should log an error by the error logger when input is not a string', () => {
      const mockFn = jest.fn()
      console.error = mockFn

      createErrorResponseObj(5 as any)
      expect(mockFn.mock.calls[0][0]).toMatch(/error logger/i)
      createErrorResponseObj(5.2 as any)
      expect(mockFn.mock.calls[0][0]).toMatch(/error logger/i)
      createErrorResponseObj([] as any)
      expect(mockFn.mock.calls[0][0]).toMatch(/error logger/i)
      createErrorResponseObj({} as any)
      expect(mockFn.mock.calls[0][0]).toMatch(/error logger/i)
      createErrorResponseObj(true as any)
      expect(mockFn.mock.calls[0][0]).toMatch(/error logger/i)

      console.error = originalConsoleError
    })

    test('to return an error response object when the input is null', () => {
      const resp = createErrorResponseObj(null)
      expect(isErrorResponseObj(resp)).toBe(true)
    })

    test('to return an error response obj when the string is empty', () => {
      const respObj = createErrorResponseObj('')
      expect(isErrorResponseObj(respObj)).toBe(true)
    })

    test('to return error response obj when a non-empty string is passed', () => {
      const respObj = createErrorResponseObj(errorMsg)
      expect(isErrorResponseObj(respObj)).toBe(true)
    })
  })

  describe('Testing the success response obj creator', () => {
    it('should return a success object when null is provided', () => {
      const resp = createSuccessResponseObj(null)
      expect(isSuccessResponseObj(resp)).toBe(true)
      expect(resp.load).toBe(null)
    })

    it('should return a success object when a number is provided', () => {
      const resp = createSuccessResponseObj(50001)
      expect(isSuccessResponseObj(resp)).toBe(true)
      expect(typeof resp.load).toBe('number')
    })

    it('should return a success object when a string is provided', () => {
      const resp = createSuccessResponseObj('test string')
      expect(isSuccessResponseObj(resp)).toBe(true)
      expect(typeof resp.load).toBe('string')
    })

    it('should return a success object when an object is provided', () => {
      const resp = createSuccessResponseObj({ test: true })
      expect(isSuccessResponseObj(resp)).toBe(true)
      expect(typeof resp.load).toBe('object')
      expect(resp.load?.test).toBe(true)
    })

    it('should return a success object when an array is provided', () => {
      const resp = createSuccessResponseObj([1, 2, '3'])
      expect(isSuccessResponseObj(resp)).toBe(true)
      expect(Array.isArray(resp.load)).toBe(true)
    })

    it('should return a success objec\'s load to be null with undefined input', () => {
      // disable the console error
      const mockFn = jest.fn()
      console.error = mockFn

      const resp = createSuccessResponseObj(undefined as any)
      expect(isSuccessResponseObj(resp)).toBe(true)
      expect(resp.load).toBe(null)

      console.error = originalConsoleError
    })

    it('should use the error logger when an undefined load is passed', () => {
      const mockFn = jest.fn()
      console.error = mockFn

      createSuccessResponseObj(undefined as any)
      expect(mockFn.mock.calls[0][0]).toMatch(/error logger/i)

      console.error = originalConsoleError
    })
  })
})
