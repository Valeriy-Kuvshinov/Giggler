import React, { useState, useEffect, useRef } from 'react'
import { galleryService } from '../services/gallery.service.js'
import leftArrowSvg from '../assets/img/svg/left.side.icon.svg'
import rightArrowSvg from '../assets/img/svg/right.side.icon.svg'

export function HomePage() {
    const { personImages, companyImages, serviceImages, categoryIcons, serviceTexts, categoryTexts } = galleryService
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [visibleStartIndex, setVisibleStartIndex] = useState(0)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % personImages.length)
        }, 10000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    let itemsPerPage = 5
    if (windowWidth < 1300) itemsPerPage = 4
    if (windowWidth < 1100) itemsPerPage = 3

    function scrollServicesCarousel(direction) {
        if (direction === 'left') {
            if (visibleStartIndex - itemsPerPage < 0) {
                setVisibleStartIndex(serviceImages.length - itemsPerPage)
            } else {
                setVisibleStartIndex(visibleStartIndex - itemsPerPage)
            }
        } else if (direction === 'right') {
            if (visibleStartIndex + itemsPerPage >= serviceImages.length) {
                setVisibleStartIndex(0)
            } else {
                setVisibleStartIndex(visibleStartIndex + itemsPerPage)
            }
        }
    }

    function getCurrentDisplayItems() {
        let items = []
        for (let i = 0; i < itemsPerPage; i++) {
            items.push(serviceImages[(visibleStartIndex + i) % serviceImages.length])
        }
        return items
    }
    const displayItems = getCurrentDisplayItems()

    return (
        <section className='home-wrapper'>
            <section className='welcome-section'>
                <div className='welcome-text-search'>
                    <h1>Find the right freelance service, right away</h1>
                    
                </div>
                {personImages.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        className={index === currentImageIndex ? 'active' : ''}
                    />
                ))}
            </section>
            <section className='home-companies-section'>
                <div className='companies flex row'>
                    <h4>Trusted by: </h4>
                    {companyImages.map((company, index) => (
                        <img key={index} src={company} />
                    ))}
                </div>
            </section>
            <section className='home-services-section'>
                <h2>Popular services</h2>
                <button className="carousel-btn left-side" onClick={() => scrollServicesCarousel('left')}>
                    <img src={leftArrowSvg} alt="Left Arrow" />
                </button>
                <div className='services flex row'>
                    {displayItems.map((service, index) => (
                        <div className="service" key={index}>
                            <img src={service} />
                            <h4 className="service-text">
                                <span>{serviceTexts[(visibleStartIndex + index) % serviceTexts.length].title}</span>
                                <br />
                                {serviceTexts[(visibleStartIndex + index) % serviceTexts.length].subtitle}
                            </h4>
                        </div>
                    ))}
                </div>
                <button className="carousel-btn right-side" onClick={() => scrollServicesCarousel('right')}>
                    <img src={rightArrowSvg} alt="Right Arrow" />
                </button>
            </section>
            <section className='home-categories-section'>
                <h2>You need it, we've got it</h2>
                <div className='categories grid'>
                    {categoryIcons.map((category, index) => (
                        <div key={index}>
                            <img src={category} />
                            <p>{categoryTexts[index]}</p>
                        </div>
                    ))}
                </div>
            </section>
        </section>
    )
}