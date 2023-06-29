/**
* @function A function that return the number of bytes of
* a UTF-8 encoded string
*/
export const getNumOfBytesUTF8 = (str: string): number => {
  const encoder = new TextEncoder()

  return encoder.encode(str).length
}
