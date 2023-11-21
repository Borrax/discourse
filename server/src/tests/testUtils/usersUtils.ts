/**
* @function A function that yields the login data of an exsiting
* in the test db user
*/
export const getExistingUserLoginData = (): {
  username: string
  password: string
} => {
  return {
    username: 'existing_username',
    password: 'some_password'
  }
}

/**
* @function A function that returns valid login data of a user that doesn't
* in the test db
*/
export const getNonExistentUserLoginData = (): {
  username: string
  password: string
} => {
  return {
    username: 'someUser',
    password: 'somePass'
  }
}

/**
* @function A function that yields the data that is needed
* for registration of an already existing in the test db
* user
*/
export const getExistingUserRegData = (): {
  username: string
  password: string
} => {
  return {
    username: 'existing_username',
    password: 'some_password'
  }
}

/**
* @function A function that yields the valid registration
* data needed of an non-existing in the test DB user
*/
export const getNonExistingUserRegData = (): {
  username: string
  password: string
} => {
  return {
    username: 'testUsername',
    password: 'testPassword'
  }
}
