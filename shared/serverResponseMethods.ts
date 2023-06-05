import type { ErrorResponse } from './ServerResponseTypes'

export const isErrorResponseObj = (resp: object | null): boolean => {
  if (resp === null) return false
  if ('err' in (resp as ErrorResponse)) return true

  return false
}

export const createErrorResponseObj = (msg: string): ErrorResponse => {
  return {
    err: msg
  }
}
