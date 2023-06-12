import { describe, test, expect } from '@jest/globals'
import { createErrorResponseObj } from '../../utils/serverResponseMethods'
import { isErrorResponseObj } from '../../../../shared/serverResponseMethods'

describe('Testing the server response methods', () => {
  describe('The error response obj creator', () => {
    const errorMsg = 'test error'

    test('to throw an error when input is', () => {
      expect(createErrorResponseObj(undefined as any))
        .toThrowError()
    })

    test('to throw an error when non-string type is passed', () => {
      expect(createErrorResponseObj(5 as any))
        .toThrowError()
      expect(createErrorResponseObj(5.2 as any))
        .toThrowError()
      expect(createErrorResponseObj([] as any))
        .toThrowError()
      expect(createErrorResponseObj({} as any))
        .toThrowError()
      expect(createErrorResponseObj(true as any))
        .toThrowError()
    })

    test('to return an error response object when the input is null', () => {
      expect(createErrorResponseObj(null))
        .toThrowError()
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
