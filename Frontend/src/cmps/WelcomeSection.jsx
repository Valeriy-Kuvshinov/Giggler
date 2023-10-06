import React, { useState, useEffect } from 'react'
import { galleryService } from '../services/gallery.service.js'

export function WelcomeSection() {
    const { personImages } = galleryService
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % personImages.length)
        }, 10000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="welcome-section" style={{ backgroundImage: `url(${personImages[currentImageIndex].big})` }}>
            <div className="welcome-text-search">
                <h1>Find the right freelance service, right away</h1>
                <h4>Popular:</h4>
            </div>
            <div className="person-info">
                <img src={personImages[currentImageIndex].small} alt="Small Person" className="small-img" />
                <div className="text-content">
                    <div className="title">{personImages[currentImageIndex].title}</div>
                    <div className="subtitle">{personImages[currentImageIndex].subtitle}</div>
                </div>
            </div>
        </section>
    )
}