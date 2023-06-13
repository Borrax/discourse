import { describe, test, expect, it } from '@jest/globals'
import { createErrorResponseObj, createSuccessResponseObj } from '../../utils/serverResponseMethods'
import { isErrorResponseObj, isSuccessResponseObj } from '../../../../shared/serverResponseMethods'

describe('Testing the server response methods', () => {
  describe('The error response obj creator', () => {
    const errorMsg = 'test error'

    test('to throw an error when input is undefined', () => {
      expect(() => createErrorResponseObj(undefined as any))
        .toThrow(TypeError)
    })

    test('to throw an error when non-string type is passed', () => {
      expect(() => createErrorResponseObj(5 as any))
        .toThrow(TypeError)
      expect(() => createErrorResponseObj(5.2 as any))
        .toThrow(TypeError)
      expect(() => createErrorResponseObj([] as any))
        .toThrow(TypeError)
      expect(() => createErrorResponseObj({} as any))
        .toThrow(TypeError)
      expect(() => createErrorResponseObj(true as any))
        .toThrow(TypeError)
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
  })
})
