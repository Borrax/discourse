import { describe, it, expect } from '@jest/globals'
import { getNumOfBytesUTF8 } from '../../utils/stringUtils'
import { genRandomString } from '../testUtils/randomStrings'

describe('Testing the string related utility methods', () => {
  describe(`Testing the retriever of the number of bytes of
a UTF-8 string`, () => {
    it(`should return the correct number of bytes for strings between 0 
and 32 char length (32 to 127 ASCII table chars)`, () => {
      for (let i = 0; i <= 32; i++) {
        const randomStr = genRandomString(i)
        // for sure returns the correct number of bytes
        const numBytes = Buffer.byteLength(randomStr, 'utf8')

        const resultedBytes = getNumOfBytesUTF8(randomStr)
        expect(resultedBytes).toBe(numBytes)
      }
    })
  })
})
