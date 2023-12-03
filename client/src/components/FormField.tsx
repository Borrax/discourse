import type { Ref } from 'react'

type FormFieldProps = {
  name: string
  inputType: 'text' | 'password' | 'email'
  ref: Ref<HTMLInputElement>
}

export const FormField = (props: FormFieldProps): JSX.Element => {
  return (
    <div className="field-container">
      <input name={props.name} ref={props.ref}
        type={props.inputType} placeholder={props.name}/>
    </div>
  )
}
