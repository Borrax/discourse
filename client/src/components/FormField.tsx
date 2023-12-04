import type { RefObject } from 'react'

import { useState } from 'react'

type FormFieldProps = {
  name: string
  inputType: 'text' | 'password' | 'email'
  inputRef: RefObject<HTMLInputElement>
}

export const FormField = (props: FormFieldProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword)
  }
  return (
    <div className="field-container">
      <input name={props.name} ref={props.inputRef}
        type={ showPassword
          ? 'text'
          : 'password'
        } placeholder={props.name}/>
      { props.inputType === 'password'
        ? <button onClick={toggleShowPassword}>&#x1F441;</button>
        : null
      }
    </div>
  )
}
