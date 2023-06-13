import type { ErrorResponse, SuccessResponse } from '../../../shared/types/ServerResponseTypes'

/**
* @function A function that creates an object of an error server response type
* that will be sent to the client
* @returns An error server response onject
*/
export const createErrorResponseObj = (msg: string | null): ErrorResponse => {
  if (typeof msg !== 'string' && msg !== null) {
    throw new TypeError('Wrong input of the error response creator\n' +
      'Expected string or null and got ' + typeof msg)
  }

  return {
    err: msg
  }
}

/**
* @function A function that creates an object of an success server response type
* that will be sent to the client
* @returns An success server response onject
*/
export const createSuccessResponseObj = <T>(load: T | null): SuccessResponse<T> => {
  return {
    load
  }
}
