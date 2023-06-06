import type { ErrorResponse, SuccessResponse } from './ServerResponseTypes'

export const isSuccessResponseObj = <T>(obj: SuccessResponse<T> | null): boolean => {
  if (obj === null) return false
  if ('load' in obj) return true

  return false
}

export const isErrorResponseObj = (obj: ErrorResponse | null): boolean => {
  if (obj === null) return false
  if ('err' in obj) return true

  return false
}

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

