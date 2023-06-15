import { createHash, scrypt, randomBytes } from 'crypto'
import { errorLogger } from './errorLogger'

export const genPassHash = (plainPass: string): string => {
  return createHash('sha256').update(plainPass).digest('hex')
}

export const genPassHashWSalt = async (pass: string): Promise<{
  hashedPassWSalt: string,
  salt: string
} | null> => {
  const salt = randomBytes(16).toString('hex')
  const hashedPassWSaltBuff = await new Promise<Buffer>((resolve, reject) => {
    scrypt(pass, salt, 64, (err, derivedKey) => {
      if (err !== null) {
        reject(err)
        return
      }

      resolve(derivedKey)
    })
  }).catch(err => {
      errorLogger(new Error('Error while creating the password hash with salt', err))
    })

  if (hashedPassWSaltBuff === undefined) {
    return null
  }

  const hashedPassWSalt = hashedPassWSaltBuff.toString('hex')
  
  return {
    hashedPassWSalt,
    salt
  }
}
