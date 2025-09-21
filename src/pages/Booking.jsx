import React, { useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import mockEvents from '../data/mockEvents'
import AuthContext from '../contexts/AuthContext'
import '../styles/booking.css';


export default function Booking() {
  const { id } = useParams()
  const event = mockEvents.find(e => e.id.toString() === id)
  const navigate = useNavigate()
  const { user, addBooking, getUserBookings } = useContext(AuthContext)
  // local form state for name and seats
  const [form, setForm] = useState({ name: '', seats: 1 })
  // handle input changes and update state
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    // check if user is logged in
    if (!user) {
      alert('you should log in first!')
      navigate('/login')
      return
    }
    // check if user has already booked this event or not to prevent double booking
    const existingBookings = getUserBookings(user.email)
    const alreadyBooked = existingBookings.some(b => b.eventId === id)

    if (alreadyBooked) {
      alert('you have already booked this event!')
      return
    }
    // validate number of seats ( max 5 seats )
    const seatsRequested = Number(form.seats)
    if (seatsRequested > 5) {
      alert('you cannot book more than 5 seats !')
      return
    }

    // check if enough seats are available
    const availableSeats = event.capacity - event.bookedSeats
    if (seatsRequested > availableSeats) {
      alert('Not enough available seats !')
      return
    }
    // create booking object and save it
    const booking = {
      id: Date.now().toString(),
      eventId: id,
      eventTitle: event.title,
      ...form,
    }

    addBooking(user.email, booking)
    //decrease the number of available seats for the event
    event.bookedSeats += seatsRequested

    alert('Booking successful ')
    navigate('/dashboard')
  }
  // if event not found
  if (!event) return <div className="container">Event not found</div>

  return (
    <div className="container">
      <h2>Booking: {event.title}</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Number of Seats</label>
        <input
          name="seats"
          type="number"
          min="1"
          max="5"
          value={form.seats}
          onChange={handleChange}
          required
        />

        <p>Remaining Seats: {event.capacity - event.bookedSeats}</p>

        <button className="btn btn-primary" type="submit">
          Confirm Booking
        </button>
      </form>
    </div>
  )
}
