import type { ErrorResponse, SuccessResponse } from '../../../shared/types/ServerResponseTypes'

/**
* @function A function that creates an object of an error server response type
* that will be sent to the client
* @returns An error server response onject
*/
export const createErrorResponseObj = (msg: string | null): ErrorResponse => {
  return {
    err: msg
  }
}

/**
* @function A function that creates an object of an success server response type
* that will be sent to the client
* @returns An success server response onject
*/
export const createSuccessResponseObj = <T>(load: T): SuccessResponse<T> => {
  return {
    load
  }
}
