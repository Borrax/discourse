import type { UserRegData } from './UserSharedTypes'

// the new user's username and password length lower and upper limits
const MIN_USERNAME_LEN = 3
const MAX_USERNAME_LEN = 20
const MIN_PASSWORD_LEN = 6
const MAX_PASSWORD_LEN = 30
// matches the string unless it contains spaces
const USERNAME_REGEX = /^\S*$/
const PASSWORD_REGEX = USERNAME_REGEX

/**
* @function Goes through the the fields of the user registration
* and looks for inconsistencies
* @return A string with the error message if it finds
* anything or null if it doesn't
*/
export const findErrInRegData = (regData: UserRegData | null): string | null => {
  if (regData === null || typeof regData !== 'object') {
    return 'No registration data provided'
  }

  const { username, password } = regData

  if (username == null || typeof username !== 'string') {
    return 'Missing username'
  }

  if (username.length < MIN_USERNAME_LEN ||
    username.length > MAX_USERNAME_LEN) {
    return `Username should be between ${MIN_USERNAME_LEN} and ${MAX_USERNAME_LEN} characters long`
  }

  if (!USERNAME_REGEX.test(username)) {
    return 'The username contains forbidden symbols'
  }

  if (password == null || typeof password !== 'string') {
    return 'Missing password'
  }

  if (password.length < MIN_PASSWORD_LEN ||
  password.length > MAX_PASSWORD_LEN) {
    return `Password should be between ${MIN_PASSWORD_LEN} and ${MAX_PASSWORD_LEN} characters long`
  }

  if (!PASSWORD_REGEX.test(password)) {
    return 'The password contains forbidden symbols'
  }

  return null
}
