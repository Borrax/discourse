import type { ErrorResponse, SuccessResponse } from '../../../shared/types/ServerResponseTypes'

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
