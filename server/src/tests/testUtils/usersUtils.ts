import type { UserLoginData } from '../../../../shared/types/UserSharedTypes'

/**
* @function A function that get the information of an existing user in the test db
* and returns the username and password to be used for testing
*/
export const getExistingUser = (): UserLoginData => {
  return {
    username: 'existing_username',
    password: 'some_password'
  }
}

/**
* @function A function that returns login data of a user that doesn't
* in the test db
*/
export const getNonExistentUser = (): UserLoginData => {
  return {
    username: 'someUser',
    password: 'somePass'
  }
}
