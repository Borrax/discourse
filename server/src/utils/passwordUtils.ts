import { scrypt, randomBytes } from 'crypto'
import { errorLogger } from './errorLogger'

const genPassHashNSalt = async (plainPass: string): Promise<{
  hashedPass: string
  salt: string
} | null> => {
  const salt = randomBytes(16).toString('hex')
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

  const hashedPass = hashedPassBuff.toString('hex')

  return {
    hashedPass,
    salt
  }
}

export const genHashedPassNSaltStr = () => async (plainPass: string): Promise<
string | null> => {
  const hashedPassNSaltObj = await genPassHashNSalt(plainPass)

  if (hashedPassNSaltObj === null) {
    return null
  }

  return hashedPassNSaltObj.hashedPass +
    ':' + hashedPassNSaltObj.salt
}
