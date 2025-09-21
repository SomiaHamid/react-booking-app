import React from 'react'
import { useParams, Link } from 'react-router-dom'
import mockEvents from '../data/mockEvents'
import '../styles/eventDetails.css'

export default function EventDetails() {
  const { id } = useParams()
  const event = mockEvents.find(e => e.id === id)
  if (!event) return <div className="event-container">the event not found</div>

  return (
    <div className="event-container">
      <div className="event-card">
        <img src={event.image} alt={event.title} className="event-image" />
        <div className="event-body">
          <h2 className="event-title">{event.title}</h2>
          <p className="event-description">{event.description}</p>
          <p className="event-meta">
            {event.date} • {event.location}
          </p>
          <p className="event-price">
            {event.price ? `EGP ${event.price}` : ' Free'}
          </p>
          <Link to={`/booking/${event.id}`} className="btn-primary">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  )
}
