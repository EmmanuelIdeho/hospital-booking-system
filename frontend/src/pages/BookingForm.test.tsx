import { render, screen } from '@testing-library/react'
import BookingForm from './BookingForm'
import userEvent from '@testing-library/user-event'
import { fireEvent } from '@testing-library/react'
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
    const date = screen.getByLabelText(/date/i, { selector: 'input[type="date"]' })
    expect(date).toBeInTheDocument()

    // Assert: check that the name field exists
    const time = screen.getByLabelText(/time/i, { selector: 'input[type="time"]' })
    expect(time).toBeInTheDocument()

    // Assert: check that the submit button exists
    const button = screen.getByRole("button", { name: /book appointment/i })
    expect(button).toBeInTheDocument()
})

it('the submit button is disabled when required fields are empty, and enabled once they are filled in', async () => {

    // Arrange: Required fields
    const interact = userEvent.setup() 
    render(<BookingForm />)

    const name = screen.getByLabelText(/your name/i)
    const phone = screen.getByLabelText(/phone number/i)
    const email = screen.getByLabelText(/your email/i)
    const date = screen.getByLabelText(/date/i, { selector: 'input[type="date"]' })
    const time = screen.getByLabelText(/time/i, { selector: 'input[type="time"]' })
    const button = screen.getByRole("button", { name: /book appointment/i })

    // Assert: button is disabled on empty form
    expect(button).toBeDisabled()

    // Act: fill in all required fields
    await interact.type(name, "John Doe")
    await interact.type(phone, "6477727132")
    await interact.type(email, "johndoe@gmail.com")
    fireEvent.change(date, {target: {value: "2026-03-03"}})
    fireEvent.change(time, { target: { value: "09:30" } })

    // Assert: button is now enabled
    expect(button).toBeEnabled()


})


})