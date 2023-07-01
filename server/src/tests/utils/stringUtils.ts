import { randomBytes } from 'crypto'
import {describe, it, expect} from '@jest/globals'
import { getNumOfBytesUTF8 } from '../../utils/stringUtils'

describe('Testing the string related utility methods', () => {
  describe(`Testing the retriever of the number of bytes of
a UTF-8 string`, () => {
      it('should return the correct number of bytes', () => {
        const numBytes = 16
        const randomStr = randomBytes(numBytes).toString('utf-8')
        
        const resultedBytes = getNumOfBytesUTF8(randomStr)
        expect(resultedBytes).toBe(numBytes)
      })
    })
})
