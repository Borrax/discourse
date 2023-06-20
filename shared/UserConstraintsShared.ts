/**
* @const An object containing regexes for validating the user string 
* containing fields when registering
*/
export const regDataValidationRegex: {
  [ket: string]: RegExp
} = {
  USERNAME_REGEX: /^[\x21-\x7E]+$/,
  PASSWORD_REGEX: /^[\x21-\x7E]+$/
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
