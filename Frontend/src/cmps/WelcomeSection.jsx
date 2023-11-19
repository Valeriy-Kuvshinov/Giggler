import React, { useState, useEffect } from 'react'
import { galleryService } from '../services/gallery.service.js'
import { SearchBar } from './SearchBar.jsx'

export function WelcomeSection({ onHandleFilter }) {
    const { personImages } = galleryService
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [showImage, setShowImage] = useState(true)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [searchQuery, setSearchQuery] = useState('')

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
            setShowImage(false)
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % personImages.length)
                setShowImage(true)
            }, 1000)
        }, 10000)
        return () => clearInterval(interval)
    }, [])

    let backgroundImage = ''
    if (windowWidth >= 1160) {
        backgroundImage = personImages[currentImageIndex].big
    }
    else if (windowWidth >= 900) {
        backgroundImage = personImages[currentImageIndex].medium
    }

    function handleSearchChange(e) {
        const newSearchQuery = e.target.value
        setSearchQuery(newSearchQuery)
    }

    function handleSearchSubmit(e) {
        e.preventDefault()
        if (!searchQuery) return
        onHandleFilter(e, { search: searchQuery })
    }
    return (
        <main className="welcome-wrapper"
            style={{
                backgroundColor: `${personImages[currentImageIndex].backgroundColor}`
            }}>
            <div className="background-content" style={{
                backgroundImage: `url("${backgroundImage}")`,
                opacity: showImage ? '1' : '0'
            }}>
            </div>

            <section className="welcome-section">
                <div className="welcome-text-search">
                    <h1>Find the right <span>freelance</span> service, right away</h1>
                    <SearchBar
                        placeholder="Search for any service..."
                        searchQuery={searchQuery}
                        onSearchChange={handleSearchChange}
                        onSearchSubmit={handleSearchSubmit}
                        controlDimming={false}
                    />
                    <div className="quick-search flex row">
                        <h4>Popular:</h4>
                        <a onClick={(e) => onHandleFilter(e, { cat: 'Graphics & Design', tag: 'Web & App Design', })} href="">Website Design</a>
                        <a onClick={(e) => onHandleFilter(e, { cat: 'Programming & Tech', tag: 'Website Development', })} href="">WordPress</a>
                        <a onClick={(e) => onHandleFilter(e, { cat: 'Graphics & Design', tag: 'Logo & Brand Identity', })} href="">Logo Design</a>
                        <a onClick={(e) => onHandleFilter(e, { cat: 'AI Services', })} href="">AI Services</a>
                    </div>
                </div>
            </section>

            {windowWidth >= 900 && (
                <div className="person-info flex" style={{ opacity: showImage ? '1' : '0' }}>
                    <img src={personImages[currentImageIndex].small} alt="Small Person" className="small-img" />
                    <div className="text-content">
                        <div className="title flex">
                            {personImages[currentImageIndex].title}
                            {personImages[currentImageIndex].star && (
                                <>
                                    <span className="flex">
                                        5
                                        <img src={personImages[currentImageIndex].star} alt="Star Icon" className="star-icon" />
                                    </span>
                                </>
                            )}
                        </div>
                        <div className="subtitle">{personImages[currentImageIndex].subtitle}</div>
                    </div>
                </div>
            )}
        </main>
    )
}