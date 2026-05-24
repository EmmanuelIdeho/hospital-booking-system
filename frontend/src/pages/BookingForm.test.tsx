import { render, screen } from '@testing-library/react'
import BookingForm from './BookingForm'
import userEvent from '@testing-library/user-event'
import { fireEvent } from '@testing-library/react'
import axios from 'axios'
import { vi } from 'vitest'
import { AppointmentProvider } from '../context/AppointmentContext'

const renderWithProvider = () => {
  return render(
    <AppointmentProvider>
      <BookingForm />
    </AppointmentProvider>
  )
}


vi.mock('axios')
window.alert = vi.fn()



describe('BookingForm', () => {
    beforeEach(() => {
    vi.mocked(axios.get).mockResolvedValue({ data: [] })
    })

it('renders all form fields and a submit button', () => {
    // Arrange: render the component
    renderWithProvider()
    
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
    renderWithProvider()

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
    await interact.type(phone, "1111111111")
    await interact.type(email, "johndoe@gmail.com")
    fireEvent.change(date, {target: {value: "2026-03-03"}})
    fireEvent.change(time, { target: { value: "09:30" } })

    // Assert: button is now enabled
    expect(button).toBeEnabled()


})

it('submits the form and calls axios.post with the correct data', async() => {
    // Arrange: Required fields
    const interact = userEvent.setup() 
    renderWithProvider()

    const mockedPost = vi.mocked(axios.post)
    mockedPost.mockResolvedValueOnce({
    data: { patientName: 'John Doe', 
            phoneNumber: '1111111111',
            email: 'johndoe@gmail.com',
            date: '2026-03-03',
            time: '09:30'
    }
    })

    const name = screen.getByLabelText(/your name/i)
    const phone = screen.getByLabelText(/phone number/i)
    const email = screen.getByLabelText(/your email/i)
    const date = screen.getByLabelText(/date/i, { selector: 'input[type="date"]' })
    const time = screen.getByLabelText(/time/i, { selector: 'input[type="time"]' })
    const button = screen.getByRole("button", { name: /book appointment/i })

   

    // Act:
    await interact.type(name, "John Doe")
    await interact.type(phone, "1111111111")
    await interact.type(email, "johndoe@gmail.com")
    fireEvent.change(date, {target: {value: "2026-03-03"}})
    fireEvent.change(time, { target: { value: "09:30" } })
    await interact.click(button)
   

    // Assert:
    expect(mockedPost).toHaveBeenCalledTimes(1)
    expect(mockedPost).toHaveBeenCalledWith(
  "undefined/api/v1/appoint",
  {
    patientName: "John Doe",
    phoneNumber: "1111111111",
    email: "johndoe@gmail.com",
    date: "2026-03-03",
    time: "09:30",
  }
)

})


})