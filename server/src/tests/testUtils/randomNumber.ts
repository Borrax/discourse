/**
* @function A function that generates a random number withing a given
* range
* @returns A floating point random number
*/
export const genRandomNum = (lower: number, upper: number): number => {
  if (typeof lower !== 'number' || typeof upper !== 'number') {
    throw new TypeError('One of the arguments is not a number')
  }

  if (upper < lower) {
    throw new Error('Upper bound is smaller than the lower')
  }

  return lower + Math.random() * (upper - lower)
}

export const genRandomInt = (lower: number, upper: number): number => {
  return Math.round(genRandomNum(lower, upper))
}
