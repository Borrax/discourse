import type { ErrorResponse, SuccessResponse } from '../../../shared/ServerResponseTypes'

export const createErrorResponseObj = (msg: string): ErrorResponse => {
  return {
    err: msg
  }
}

export const createSuccessResponseObj = <T>(load: T): SuccessResponse<T> => {
  return {
    load
  }
}
