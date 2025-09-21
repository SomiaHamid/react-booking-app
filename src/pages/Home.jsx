import React, { useEffect, useState } from 'react'
import EventCard from '../components/EventCard'
import mockEvents from '../data/mockEvents'
import '../styles/Home.css'

export default function Home() {
    const [events, setEvents] = useState([])
    const [currentImage, setCurrentImage] = useState(0)

    const images = [
        '/images/gallery-header.jpg',
        '/images/gallery-header2.jpeg',
        '/images/gallery-header3.jpeg',
        '/images/gallery-header4.jpeg'
    ]

    useEffect(() => {
        setEvents(mockEvents)

        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div>
            {/* Hero Section */}
            <div 
              className="hero" 
              style={{ backgroundImage: `url(${images[currentImage]})` }}
            ></div>

            {/* Events Section */}
            <div className="container">
                <div className="events-grid">
                    {events.map(ev => <EventCard key={ev.id} event={ev} />)}
                </div>
            </div>

            <footer>
                <p><strong>Contact us:</strong> <a href="mailto:Sust.edu@gmail.com">Sust.edu@gmail.com</a></p>
                <p>SUST University</p>
                <p>&copy; 2025 SUST University. All rights reserved.</p>
            </footer>
        </div>
    )
}
