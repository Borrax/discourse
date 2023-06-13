import { describe, test, expect } from '@jest/globals'
import { createErrorResponseObj } from '../../utils/serverResponseMethods'
import { isErrorResponseObj } from '../../../../shared/serverResponseMethods'

describe('Testing the server response methods', () => {
  describe('The error response obj creator', () => {
    const errorMsg = 'test error'

    test('to throw an error when input is', () => {
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
})
