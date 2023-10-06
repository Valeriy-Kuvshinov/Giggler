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
        <section className='welcome-section'>
            <div className='welcome-text-search'>
                <h1>Find the right freelance service, right away</h1>
            </div>
            {personImages.map((img, index) => (
                <div key={index} className={`background-image ${index === currentImageIndex ? 'active' : ''}`} style={{ backgroundImage: `url(${img.big})` }}></div>
            ))}
            {personImages.map((img, index) => (
                <img key={index} src={img.small} alt="Small Person" className={`small-img ${index === currentImageIndex ? 'active' : ''}`} />
            ))}
        </section>
    )
}