import { describe, it, expect } from '@jest/globals'
import { comparePasswords, genHashedPassNSaltStr } from '../../utils/passwordUtils'
import { getExistingUserRegData } from '../testUtils/usersUtils'
import { genRandomString } from '../testUtils/randomStrings'
import { allowedUserRegLengths, regDataValidationRegex } from '../../../../shared/userConstraintsShared'
import { genRandomNum } from '../testUtils/randomNumber'

describe('Testing the password utils', () => {
  const existingUser = getExistingUserRegData()
  const { MIN_PASSWORD_LEN, MAX_PASSWORD_LEN } = allowedUserRegLengths
  const { PASSWORD_REGEX } = regDataValidationRegex

  describe('Testing the hash and salt string creator', () => {
    it('should return a string in the format {hashPass}:{salt}', async () => {
      const regex = /^[0-9a-zA-Z]+:[0-9a-zA-Z]+$/
      const resultStr = await genHashedPassNSaltStr(existingUser.password)

      expect(typeof resultStr).toBe('string')
      expect(regex.test(resultStr as string)).toBe(true)
    })

    it('should have a hashed pass that\'s 64 bytes long', async () => {
      const resultStr = await genHashedPassNSaltStr(existingUser.password)
      if (resultStr === null) {
        throw new Error('The hashed password string with salt is null')
      }

      const hashedPass = resultStr?.split(':')[0]
      expect(hashedPass.length).toBe(128)
    })

    it('should have salt that\'s 16 bytes long', async () => {
      const resultStr = await genHashedPassNSaltStr(existingUser.password)
      if (resultStr === null) {
        throw new Error('The hashed password string with salt is null')
      }

      const salt = resultStr?.split(':')[1]
      expect(salt.length).toBe(32)
    })
  })

  describe('Testing the plain text and hashed salted password comparer', () => {
    it('should return true when the plain password is a precursor', async () => {
      const passLen = genRandomNum(MIN_PASSWORD_LEN, MAX_PASSWORD_LEN)
      const plainPass = genRandomString(passLen, PASSWORD_REGEX)

      const hashedWSalt = await genHashedPassNSaltStr(plainPass)
      if (hashedWSalt === null) {
        throw new Error('Hashed pass with salt string generator threw an error in the test')
      }

      const areEqual = await comparePasswords(plainPass, hashedWSalt)
      expect(areEqual).toBe(true)
    })
  })
})
