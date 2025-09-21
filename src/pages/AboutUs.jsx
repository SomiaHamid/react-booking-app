import React, { useEffect, useState } from 'react'
import '../styles/Home.css' 

export default function AboutUs() {
    const [currentImage, setCurrentImage] = useState(0)

    const images = [
        '/images/aboutUs1.jpeg',
        '/images/aboutUs2.jpeg',
        '/images/aboutUs3.jpeg'
    ]
//slideshow effect for the hero section
    useEffect(() => {
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

            {/* About Section */}
            <div className="container">
                <div className="about-box">
                    <h1>About Us</h1>
                    <p>
                        Welcome to SUST Events Hub – the official 
                        platform for discovering and booking events at our university.
                    </p>
                    <p>
                        We’re more than just a calendar. Our goal is to bring students, 
                        faculty, and campus organizations together through workshops, 
                        seminars, competitions, and social activities.
                    </p>
                    <p>
                        This platform was created to make event booking simple, fast, and 
                        accessible for everyone in our community. Whether you’re looking 
                        to learn, connect, or celebrate – you’ll find your place here.
                    </p>
                    <p>
                        <strong>Our vision</strong> is to empower the university community 
                        by fostering collaboration, knowledge sharing, and memorable experiences.
                    </p>
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
