export type SuccessResponse<T> = {
  load: T
}

export type ErrorResponse = {
  err: String | null
}

export type ServerResponse<T> = SuccessResponse<T> | ErrorResponse
