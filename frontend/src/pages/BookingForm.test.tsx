import { render, screen } from '@testing-library/react'
import BookingForm from './BookingForm'
// import your component here

describe('BookingForm', () => {
  it('renders all form fields and a submit button', () => {
    // Arrange: render the component
    render(<BookingForm />)
    
    // Assert: check that the name field exists
    const name = screen.getByLabelText(/your name/i)
    expect(name).toBeInTheDocument()

    // Assert: check that the phone number field exists
    const phone = screen.getByLabelText(/phone number/i)
    expect(phone).toBeInTheDocument()

    // Assert: check that the name field exists
    const email = screen.getByLabelText(/your email/i)
    expect(email).toBeInTheDocument()

    // Assert: check that the date field exists  
    const date = screen.getByLabelText(/date/i)
    expect(date).toBeInTheDocument()

    // Assert: check that the name field exists
    const time = screen.getByLabelText(/time/i)
    expect(time).toBeInTheDocument()

    // Assert: check that the submit button exists
    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()
  })
})