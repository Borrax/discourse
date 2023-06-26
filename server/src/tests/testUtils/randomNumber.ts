export const genRandomNum = (lower: number, upper: number): number => {
  if (typeof lower !== 'number' || typeof upper !== 'number') {
    throw new TypeError('One of the arguments is not a number')
  }

  if (upper < lower) {
    throw new Error('Upper bound is smaller than the lower')
  }

  return lower + Math.random() * (upper - lower)
}
