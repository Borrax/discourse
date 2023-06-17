/**
* @function Generates a random string of given length.
* Note that the characters used are from 32 to 127 of
* the ASCII table
* @param len - The length of the desired string
* @param testRegex - The regex of the allowed characters
* in the random string (optional). By default it will
* include any character between 32 and 127
*/
export const genRandomString = (len: number, testRegex: RegExp = /./): string => {
  if (!Number.isInteger(len)) {
    throw new TypeError('Expected a number for the len argument but got ' +
      typeof len)
  }

  if (!(testRegex instanceof RegExp)) {
    throw new TypeError('Expected a regular expression as an input but got' +
      typeof testRegex)
  }

  let allowedChars = ''
  for (let i = 32; i < 127; i++) {
    const c = String.fromCharCode(i)
    if (testRegex.test(c)) {
      allowedChars += c
    }
  }

  let resultStr: string = ''
  for (let i = 0; i < len; i++) {
    const randomIndex = Math.round(Math.random() * allowedChars.length)
    resultStr += allowedChars[randomIndex]
  }

  return resultStr
}

/**
* @function A function that generates a random string with a mix of allowed and
* forbidden characters. The pool of characters is the first 128 of the ASCII table.
* @param len - The length of the desired string
* @param testRegex - The characters that test true to this regex will be the allowed ones
* and the rest - the forbidden
*/
export const genRandomStrWBadChars = (len: number, testRegex: RegExp): string => {
  if (!Number.isInteger(len)) {
    throw new TypeError('Expected a number for the len argument but got ' +
      typeof len)
  }

  if (!(testRegex instanceof RegExp)) {
    throw new TypeError('Expected a regular expression as an input but got' +
      typeof testRegex)
  }

  const allowedChars: string[] = []
  const forbiddenCHars: string[] = []
  for (let i = 0; i < 128; i++) {
    const c = String.fromCharCode(i)
    if (testRegex.test(c)) {
      allowedChars.push(c)
    } else {
      forbiddenCHars.push(c)
    }
  }

  let resultStr: string = ''
  for (let i = 0; i < len; i++) {
    const arrToPickFrom = Math.round(Math.random())

    if (arrToPickFrom === 0) {
      const randomIndex = Math.round(Math.random() * allowedChars.length)
      resultStr += allowedChars[randomIndex]
    } else {
      const randomIndex = Math.round(Math.random() * forbiddenCHars.length)
      resultStr += forbiddenCHars[randomIndex]
    }
  }

  return resultStr
}
