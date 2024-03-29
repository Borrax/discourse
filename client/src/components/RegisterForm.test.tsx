import { render, screen, fireEvent } from '@testing-library/react'
import { RegisterForm } from './RegisterForm'

describe('RegisterForm', () => {
  it('should render', () => {
    const { container } = render(<RegisterForm />)

    expect(container.firstChild).toBeInTheDocument()
  })

  it('should have a username field', () => {
    render(<RegisterForm />)

    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'username')
  })

  it('should have password a field', () => {
    const { container } = render(<RegisterForm />)
    const passEl = container.querySelector('input[type=\'password\']')

    expect(passEl).toBeDefined()
  })

  it('should have a register button', () => {
    render(<RegisterForm />)

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('should show an error on empty input', () => {
    const { getByText, getByTestId } = render(<RegisterForm />)

    const btn = getByText(/register/i)
    fireEvent.click(btn)

    expect(getByTestId('error-msg')).toBeDefined()
  })
})
