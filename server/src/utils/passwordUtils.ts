import { scrypt, randomBytes } from 'crypto'
import { errorLogger } from './errorLogger'

const genHashedPass = async (plainPass: string, salt: string): Promise<string | null> => {
  const hashedPassBuff = await new Promise<Buffer>((resolve, reject) => {
    scrypt(plainPass, salt, 64, (err, derivedKey) => {
      if (err !== null) {
        reject(err)
        return
      }

      resolve(derivedKey)
    })
  }).catch(err => {
    errorLogger(new Error('Error while creating the password hash with salt', err))
  })

  if (hashedPassBuff === undefined) {
    return null
  }

  return hashedPassBuff.toString('hex')
}

/**
* @function Generates a password hash string with salt appended to it
* @param plainPass The clean password string
* @returns the hashed pass with salt in the format {hashedPass}:{salt}
*/
export const genHashedPassNSaltStr = async (plainPass: string): Promise<string | null> => {
  const salt = randomBytes(16).toString('hex')
  const hashedPass = await genHashedPass(plainPass, salt)

  if (hashedPass === null) {
    return null
  }

  return hashedPass + ':' + salt
}

/**
* @function A function that compares a plain text password and a password
* that is of a user from the database.
* @param plainPass - The password string in plain text
* @param dbUserPass - The password string taken straight from the db
* @returns a promise that resolves to boolean or null if it encountered
* an error
*/
export const comparePasswords = async (plainPass: string, dbUserPass: string): Promise<boolean | null> => {
  const splitDbPass = dbUserPass.split(':')

  if (splitDbPass.length !== 2) {
    errorLogger(new Error('Incorrect amount of : in the users db password ' +
      splitDbPass.length.toString()))
    return null
  }

  const truePass = splitDbPass[0]
  const potentialTruePass = await genHashedPass(plainPass, splitDbPass[0])

  return truePass === potentialTruePass
}
