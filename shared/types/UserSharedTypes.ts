import type { ServerResponse } from './ServerResponseTypes'

/**
* @type The type of data that is needed by
* the server to register the user
*/
export type UserRegData = {
  username: string,
  password: string
}

/**
* @type The type of the payload that the server will send to the 
* client after a successful registration
*/
export type UserRegResponseLoad = {
  username: string
}

/**
* @type The type of the server response the client will get
* upon user registration call
*/
export type UserRegResponse = ServerResponse<UserRegResponseLoad>
