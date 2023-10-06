import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { galleryService } from '../services/gallery.service.js'
import searchIconSvg from '../assets/img/svg/search.icon.svg'

export function WelcomeSection() {
    const { personImages } = galleryService
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % personImages.length)
        }, 10000)

        return () => clearInterval(interval)
    }, [])

    let backgroundImage = ''
    if (windowWidth >= 1160) {
        backgroundImage = personImages[currentImageIndex].big
    } else if (windowWidth >= 900) {
        backgroundImage = personImages[currentImageIndex].medium
    }

    function handleSearchChange(e) {
        const newSearchQuery = e.target.value
        setSearchQuery(newSearchQuery)
    }

    function handleSearchSubmit(e) {
        e.preventDefault()
        if (!searchQuery) return

        navigate(`/explore?search=${searchQuery}`)
    }
    return (
        <main className="welcome-wrapper" style={{ backgroundColor: `${personImages[currentImageIndex].backgroundColor}` }}>
            <section className='welcome-section' style={{ backgroundImage: `url("${backgroundImage}")` }}>
                <div className="welcome-text-search">
                    <h1>Find the right <span>freelance</span> service, right away</h1>
                    <div className="search-bar flex">
                        <input
                            type="text"
                            placeholder="Search for any service..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button type="submit">
                            <img src={searchIconSvg} alt="Search" onClick={handleSearchSubmit} />
                        </button>
                    </div>
                    <div className='flex row'>
                        <h4>Popular:</h4>
                        <a href="">Website Design</a>
                        <a href="">WordPress</a>
                        <a href="">Logo Design</a>
                        <a href="">AI Services</a>
                    </div>
                </div>
            </section>
            {windowWidth >= 900 && (
                <div className="person-info">
                    <img src={personImages[currentImageIndex].small} alt="Small Person" className="small-img" />
                    <div className="text-content">
                        <div className="title">{personImages[currentImageIndex].title}</div>
                        <div className="subtitle">{personImages[currentImageIndex].subtitle}</div>
                    </div>
                </div>
            )}
        </main>
    )
}