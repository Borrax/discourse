import type { UserLoginData } from '../../../../shared/types/UserSharedTypes'

/**
* @function A function that yields the login data of an exsiting
* in the test db user
*/
export const getExistingUserLoginData = (): UserLoginData => {
  return {
    username: 'existing_username',
    password: 'some_password'
  }
}

/**
* @function A function that returns login data of a user that doesn't
* in the test db
*/
export const getNonExistentUserLoginData = (): UserLoginData => {
  return {
    username: 'someUser',
    password: 'somePass'
  }
}
