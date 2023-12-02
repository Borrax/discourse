import { useState } from 'react'
import { RegisterForm } from '../components/RegisterForm'

export const Home = (): JSX.Element => {
  const [showForms, setShowForms] = useState({
    register: false,
    login: false
  })

  const toggleForms = (isRegForm: boolean): void => {
    if (isRegForm) {
      setShowForms({
        register: !showForms.register,
        login: false
      })

      return
    }

    setShowForms({
      login: !showForms.login,
      register: false
    })
  }

  return (
    <section>
      <h1>DISCOURSE</h1>
      <div>
        <button onClick={() => { toggleForms(false) }}>
          Log In
        </button>
        <button onClick={() => { toggleForms(true) }}>
          Register
        </button>
        <div>
          { showForms.register
            ? <RegisterForm />
            : null }
        </div>
      </div>
    </section>
  )
}
