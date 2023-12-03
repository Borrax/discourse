import type { Ref } from 'react'

type FormProps = {
  name: string
  inputType: string
  ref: Ref<HTMLInputElement>
}

export const FormField = (props: FormProps): JSX.Element => {
  return (
    <div className="field-container">
      <input name={props.name} ref={props.ref}
        type={props.inputType} placeholder={props.name}/>
    </div>
  )
}
