import type { FormEvent } from 'react'
import type { UserRegEntry, UserRegResponse } from '../../../shared/types/UserSharedTypes'

import { useRef, useState } from 'react'
import { allowedUserRegLengths, regDataValidationRegex } from '../../../shared/UserConstraintsShared'
import { registerUser } from '../apis/users/register'
import { ErrorResponse } from '../../../shared/types/ServerResponseTypes'

enum RegFormFields {
  username = 'username',
  password = 'password'
}

export const RegisterForm = (): JSX.Element => {
  const [errMsg, setErrMsg] = useState<string | null>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const {
    MAX_USERNAME_LEN,
    MIN_USERNAME_LEN,
    MIN_PASSWORD_LEN,
    MAX_PASSWORD_LEN
  } = allowedUserRegLengths

  const { USERNAME_REGEX, PASSWORD_REGEX } = regDataValidationRegex

  const getUsernameValidationErr = (username: string | undefined | null): string | null => {
    if (username == null || username.length === 0) {
      return 'Missing username'
    }

    if (username.length < MIN_USERNAME_LEN ||
      username.length > MAX_USERNAME_LEN) {
      return `Username must be between ${MIN_USERNAME_LEN} and ${MAX_USERNAME_LEN} long`
    }

    if (!USERNAME_REGEX.test(username)) {
      return 'The username is having forbidden symbols'
    }

    return null
  }

  const getPasswordValidationErr = (password: string | undefined | null): string | null => {
    if (password == null || password.length === 0) {
      return 'Missing password'
    }

    if (password.length < MIN_PASSWORD_LEN ||
      password.length > MAX_PASSWORD_LEN) {
      return `Password must be between ${MIN_PASSWORD_LEN} and ${MAX_PASSWORD_LEN} long`
    }

    if (!PASSWORD_REGEX.test(password)) {
      return 'The password is having forbidden symbols'
    }

    return null
  }

  const showError = (errMsg: string): void => {
    setErrMsg(errMsg)
  }

  const isErrorResp = (resp: UserRegResponse): resp is ErrorResponse => {
    if ((resp as ErrorResponse).err != null) {
      return true
    }

    return false
  }

  const tryRegister = async (data: UserRegEntry): Promise<void> => {
    try {
      const res = await registerUser(data)
      if (isErrorResp(res)) {
        showError(res.err)
      }
    } catch (_err) {
      showError('Something went wrong registering you')
    }
  }

  const handleRegSubmit = (e: FormEvent): void => {
    e.preventDefault()
    let username = usernameRef.current?.value
    let password = passwordRef.current?.value

    const usernameErr = getUsernameValidationErr(username)

    if (usernameErr !== null) {
      showError(usernameErr)
      return
    }

    const passwordErr = getPasswordValidationErr(password)

    if (passwordErr !== null) {
      showError(passwordErr)
      return
    }

    username = username as string
    password = password as string

    tryRegister({
      username,
      password
    }).catch(() => {})
  }

  return (
  <form onSubmit={handleRegSubmit} className="register-form">
      <div className="erorr-msg-container">
        { errMsg }
      </div>
      <div className="field-container">
        <input name={RegFormFields.username} ref={usernameRef}
          type="text" placeholder="Username"/>
      </div>
      <div className="field-container">
        <input name={RegFormFields.password} type="password"
          placeholder="Password" ref={passwordRef}/>
      </div>
      <button type="submit">Register</button>
  </form>
  )
}
