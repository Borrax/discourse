/**
* @function Generates a random string of given length.
* Note that the characters used are from 33 to 127 of
* the ASCII table
* @param len - The length of the desired string
* @param testRegex - The regex of the allowed characters
* in the random string
*/
export const genRandomString = (len: number, testRegex: RegExp = /[w]+/): string => {
  if (!Number.isInteger(len)) {
    throw new TypeError('Expected a number for the len argument but got ' +
      typeof len)
  }

  if (!(testRegex instanceof RegExp)) {
    throw new TypeError('Expected a regular expression as an input but got' +
      typeof testRegex)
  }
  
  let allowedChars = ''
  for (let i = 33; i < 127; i++) {
    const c = String.fromCharCode(i)
    if (testRegex.test(c)) {
      allowedChars += c
    }
  }

  console.log('allowed chars', allowedChars)
  let resultStr: string = ''
  for(let i = 0; i < len; i++) {
    const randomIndex = Math.round(Math.random() * allowedChars.length)
    resultStr += allowedChars[randomIndex]
  }

  return resultStr
}
