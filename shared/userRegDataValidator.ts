import type { UserRegData } from './types/UserSharedTypes'

/**
* @const An object containing regexes for validating the user string 
* containing fields when registering
*/
export const regDataValidationRegex: {
  [ket: string]: RegExp
} = {
  USERNAME_REGEX: /^\S*$/,
  PASSWORD_REGEX: /^\S*$/
} 

/**
* @const An object containing all the allowed limits for the username
* and the password lengths of the registering user
*/
export const allowedUserRegLengths: {
  [key: string]: number
} = {
  MIN_USERNAME_LEN: 3,
  MAX_USERNAME_LEN: 20,
  MIN_PASSWORD_LEN: 6,
  MAX_PASSWORD_LEN: 30
}

const { MIN_USERNAME_LEN, MAX_USERNAME_LEN, MIN_PASSWORD_LEN, MAX_PASSWORD_LEN } = 
  allowedUserRegLengths

const { USERNAME_REGEX, PASSWORD_REGEX } = regDataValidationRegex

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
