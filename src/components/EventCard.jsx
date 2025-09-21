import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

//this function is to display each event in a card format
export default function EventCard({ event }) {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleBook = (e) => {
        e.preventDefault()
        if (!user) {
            navigate('/login')
        } else {
            navigate(`/booking/${event.id}`)
        }
    }
//the return is to show the event card with its details and booking buttons
    return (
        <div className="event-card">
            <img src={event.image} alt={event.title} />
            <div className="event-body">
                <h3>{event.title}</h3>
                <p>{event.date} • {event.location}</p>
                <p>{event.price ? `EGP ${event.price}` : 'Free'}</p>
                <div style={{ marginTop: 8 }}>
                    <Link to={`/events/${event.id}`} className="btn">Details</Link>
                    <button 
                        onClick={handleBook} 
                        style={{ marginLeft: 8 }} 
                        className="btn btn-primary"
                    >
                        Book
                    </button>
                </div>
            </div>
        </div>
    )
}
