import type { ServerResponse } from './ServerResponseTypes'

/**
* @type The type of data that is needed by
* the server to register the user
*/
export type UserRegEntry = {
  username: string | null,
  password: string | null
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

/**
* @type The type of data the client needs to provide the server on
* a login request
*/
export type UserLoginEntry = {
  username: string | null,
  password: string | null
}

/**
* @type The payload of the server response after a successful login
*/
export type UserLoginLoad = {
  token: string
}

/**
* @type The type of the server response on an attempt to login
* by the user
*/
export type UserLoginResponse = ServerResponse<UserLoginLoad>
