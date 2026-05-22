import { render, screen } from '@testing-library/react'
import BookingForm from './BookingForm'
import userEvent from '@testing-library/user-event'
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

it('the submit button is disabled when required fields are empty, and enabled once they are filled in', async () => {

    // Arrange: Required fields
    const interact = userEvent.setup() 
    render(<BookingForm />)

    const name = screen.getByLabelText(/your name/i)
    const phone = screen.getByLabelText(/phone number/i)
    const email = screen.getByLabelText(/your email/i)
    const date = screen.getByLabelText(/date/i)
    const time = screen.getByLabelText(/time/i)
    const button = screen.getByRole("button")

    // Assert: button is disabled on empty form
    expect(button).toBeDisabled()

    // Act: fill in all required fields
    await interact.type(name, "John Doe")
    await interact.type(phone, "6477727132")
    await interact.type(email, "johndoe@gmail.com")
    await interact.type(date, "03/03/2026")
    await interact.type(time, "9:30")

    // Assert: button is now enabled
    expect(button).toBeEnabled()


})


})