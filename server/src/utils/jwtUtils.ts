import jwt from 'jsonwebtoken'

export const createJWT = (payload: object,
  secret: string, expiresIn: string): string => {
  return jwt.sign(payload, secret, { expiresIn })
}
