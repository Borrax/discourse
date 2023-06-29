import type { ExpressMiddleware } from './middlewareTypes'

/**
* @function Obtains the cookie name and value from a provided string
* @param cookie - A string containing the name and the value seperated
* by "=" as the http convention requires
* @returns An object containing the trimmed name and value. If the value
* is null the cookie string is not in the right format
*/
const getCookieNameNVal = (cookie: string): {
  name: string
  value: string | null
} => {
  let name = ''
  let value = null

  for (let i = 0; i < cookie.length; i++) {
    const currChar = cookie[i]

    if (currChar === '=') {
      value = cookie.substring(i + 1).trim()
      break
    }

    name += currChar
  }

  return {
    name: name.trim(),
    value
  }
}

/**
* @function A middleware that parses the cookies in the incoming http request and
* adds them to the request object as req.cookies.
*/
export const cookieParserMiddle: ExpressMiddleware = (req, _res, next) => {
  if (req.headers.cookie != null) {
    const cookieStrings = req.headers.cookie.split(';')

    req.cookies = {}

    for (const cStr of cookieStrings) {
      const { name, value } = getCookieNameNVal(cStr)

      if (value === null) {
        continue
      }

      req.cookies[name] = value
    }
  }

  next()
}
