import { render } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import { RegisterForm } from './RegisterForm'

describe('RegisterForm', () => {
  it('should render', () => {
    const { container } = render(<RegisterForm />)

    expect(container.firstChild).toBeDefined()
  })
})
