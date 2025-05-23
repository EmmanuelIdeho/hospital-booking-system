//import axios from 'axios'
function BookingForm(){
    return(
        <>
      <form>
        <input type="text" name="name" id="name" placeholder="Your Name" required />
        <input type="date" name="date" id="date" required />
        <input type="time" name="time" id="time" required />
        <input type="submit" name="submit" id="submit" />
      </form>
    </>
    )
}

export default BookingForm