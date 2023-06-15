import jwt from 'jsonwebtoken'

export const createJWT = (payload: object,
  secret: string, expiresIn: string): string => {
  return jwt.sign(payload, secret, { expiresIn })
}

/**
* @function A function that determines if a given string is in the format of a json web token.
*/
export const isJWT = (token: string): boolean => {
  const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/

  return jwtRegex.test(token)
}
