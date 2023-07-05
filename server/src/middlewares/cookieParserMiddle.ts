import type { ExpressMiddleware } from './middlewareTypes'

import { cookieConfig } from '../configs/cookieConfig'
import { getNumOfBytesUTF8 } from '../utils/stringUtils'
import { createErrorResponseObj } from '../utils/serverResponseMethods'

/**
* @function Obtains the cookie name and value from a provided string
* @param cookie - A string containing the name and the value seperated
* by "=" as the http convention requires
* @returns An object containing the trimmed name and value. If the value
* is an empty string that means the cookie is not in the right format
*/
const getCookieNameNVal = (cookie: string): {
  name: string | ''
  value: string | ''
} => {
  const allowedChars = cookieConfig.allowedChars
  let name = ''
  let value = ''

  for (let i = 0; i < cookie.length; i++) {
    const currChar = cookie[i]

    if (currChar === '=') {
      // it is fine because it will return a '' if the
      // the index is bigger than the string's length
      value = cookie.substring(i + 1).trim()
      break
    }

    name += currChar
  }

  name = name.trim()

  if (!allowedChars.name.test(name) ||
    !allowedChars.value.test(value)) {
    return {
      name: '',
      value: ''
    }
  }

  return {
    name,
    value
  }
}

/**
* @function A middleware that parses the cookies in the incoming http request and
* adds them to the request object as req.cookies.
*/
export const cookieParserMiddle: ExpressMiddleware = (req, res, next) => {
  if (req.headers.cookie != null) {
    if (getNumOfBytesUTF8(req.headers.cookie) > cookieConfig.maxHeaderSize) {
      res.status(400).json(createErrorResponseObj('Request\'s headers are too big'))
      return
    }

    const cookieStrings = req.headers.cookie.split(';')

    req.cookies = {}

    for (const cStr of cookieStrings) {
      const { name, value } = getCookieNameNVal(cStr)

      if (value === '') {
        continue
      }

      req.cookies[name] = value
    }
  }

  next()
}
