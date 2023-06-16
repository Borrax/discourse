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

export const genHashedPassNSaltStr = async (plainPass: string): Promise<string | null> => {
  const salt = randomBytes(16).toString('hex')
  const hashedPass = await genHashedPass(plainPass, salt)

  if (hashedPass === null) {
    return null
  }

  return hashedPass + ':' + salt
}
