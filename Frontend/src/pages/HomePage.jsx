import React, { useState, useEffect, useRef } from 'react'
import { galleryService } from '../services/gallery.service.js'
import leftArrowSvg from '../assets/img/svg/left.side.icon.svg'
import rightArrowSvg from '../assets/img/svg/right.side.icon.svg'

export function HomePage() {
    const { personImages, companyImages, serviceImages, categoryIcons, serviceTexts } = galleryService
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const servicesCarouselRef = useRef(null)
    const [isAtStart, setIsAtStart] = useState(true)
    const [isAtEnd, setIsAtEnd] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % personImages.length)
        }, 10000)
        return () => clearInterval(interval)
    }, [])

    function scrollServicesCarousel(direction) {
        const carousel = servicesCarouselRef.current;
        const scrollAmount = 250;

        if (direction === 'left') carousel.scrollLeft -= scrollAmount
        else if (direction === 'right') carousel.scrollLeft += scrollAmount
    }

    useEffect(() => {
        const checkScrollPosition = () => {
            if (!servicesCarouselRef.current) return
            setIsAtStart(servicesCarouselRef.current.scrollLeft === 0)
            setIsAtEnd(servicesCarouselRef.current.scrollLeft + servicesCarouselRef.current.offsetWidth === servicesCarouselRef.current.scrollWidth)
        }
        servicesCarouselRef.current.addEventListener('scroll', checkScrollPosition)

        checkScrollPosition()
        return () => {
            // servicesCarouselRef.current.removeEventListener('scroll', checkScrollPosition)
        }
    }, [])
    return (
        <section className='home-wrapper'>
            <section className='welcome-section'>
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
                {!isAtStart && (
                    <button className="carousel-btn left-side" onClick={() => scrollServicesCarousel('left')}>
                        <img src={leftArrowSvg} alt="Left Arrow" />
                    </button>
                )}
                <div className='services flex row' ref={servicesCarouselRef}>
                    {serviceImages.map((service, index) => (
                        <div className="service" key={index}>
                            <img src={service} />
                            <h4 className="service-text">
                                {serviceTexts[index].title}
                                <br />
                                {serviceTexts[index].subtitle}
                            </h4>
                        </div>
                    ))}
                </div>
                {!isAtEnd && (
                    <button className="carousel-btn right-side" onClick={() => scrollServicesCarousel('right')}>
                        <img src={rightArrowSvg} alt="Right Arrow" />
                    </button>
                )}
            </section>
            <section className='home-categories-section'>
                <div className='categories flex row'>
                    <h2>You need it, we've got it</h2>
                    {categoryIcons.map((category, index) => (
                        <div key={index}>
                            <img src={category} />
                            <p>Graphics & Design</p>
                        </div>
                    ))}
                </div>
            </section>
        </section>
    )
}