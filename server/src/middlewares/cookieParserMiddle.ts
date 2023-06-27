import type { ExpressMiddleware } from './middlewareTypes'

/**
* @function A middleware that parses the cookies in the incoming http request and
* adds them to the request object as req.cookies.
*/
export const cookieParserMiddle: ExpressMiddleware = (req, _res, next) => {
  if (req.headers.cookie != null) {
    const cookieStrings = req.headers.cookie.split(';')

    req.cookies = {}

    for (const cStr of cookieStrings) {
      const [cookieName, cookieValue] = cStr.split('=')
      req.cookies[cookieName.trim()] = cookieValue.trim()
    }
  }

  next()
}
