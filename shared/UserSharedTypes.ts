import type { ServerResponse } from './ServerResponseTypes'

/**
 * @type The type of data that is needed by
* the server to register the user
*/
export type UserRegData = {
  username: string,
  password: string
}

export type UserRegResponse = ServerResponse<{
  username: String
}>
