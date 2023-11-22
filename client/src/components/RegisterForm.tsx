// import type { UserRegEntry } from '../../../shared/types/UserSharedTypes'
import type { FormEvent } from 'react'

import { useRef } from 'react'
import { allowedUserRegLengths, regDataValidationRegex } from '../../../shared/UserConstraintsShared'

export const RegisterForm = (): JSX.Element => {
  const usernameRef = useRef<HTMLInputElement>(null)

  const {
    MAX_USERNAME_LEN,
    MIN_USERNAME_LEN
  } = allowedUserRegLengths

  const { USERNAME_REGEX } = regDataValidationRegex

  const getUsernameValidationErr = (username: string | undefined): string | null => {
    if (username == null || username.length === 0) {
      return 'Missing username'
    }

    if (username.length < MIN_USERNAME_LEN ||
      username.length > MAX_USERNAME_LEN) {
      return `Username must be between ${MIN_USERNAME_LEN} and ${MAX_USERNAME_LEN}`
    }

    if (!USERNAME_REGEX.test(username)) {
      return 'The username is having forbidden symbols'
    }

    return null
  }

  const handleRegSubmit = (e: FormEvent): void => {
    e.preventDefault()
    console.log(getUsernameValidationErr(usernameRef.current?.value))
  }

  return (
  <form onSubmit={handleRegSubmit} className="register-form">
      <div className="field-container">
        <input name="username" ref={usernameRef}
          type="text" placeholder='Username'/>
      </div>
      <div className="field-container">
        <input name="password" type="password"
          placeholder='Password'/>
      </div>
      <input type="submit" value="Register" />
  </form>
  )
}
