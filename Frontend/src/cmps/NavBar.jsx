import React, { useRef, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import leftArrowSvg from '../assets/img/svg/left.side.icon.svg'
import rightArrowSvg from '../assets/img/svg/right.side.icon.svg'

export function NavBar({ categories }) {
    const carouselRef = useRef(null)
    const [isAtStart, setIsAtStart] = useState(true)
    const [isAtEnd, setIsAtEnd] = useState(false)

    function scrollCarousel(direction) {
        const carousel = carouselRef?.current
        const scrollAmount = 250

        if (direction === 'left') carousel.scrollLeft -= scrollAmount
        else if (direction === 'right') carousel.scrollLeft += scrollAmount
    }

    useEffect(() => {
        const checkScrollPosition = () => {
            if (!carouselRef?.current) return
            setIsAtStart(carouselRef.current.scrollLeft === 0)
            setIsAtEnd(carouselRef.current.scrollLeft + carouselRef.current.offsetWidth === carouselRef.current.scrollWidth)
        }
        carouselRef.current.addEventListener('scroll', checkScrollPosition)

        checkScrollPosition()
        return () => {
            if (carouselRef?.current) {
                carouselRef.current.removeEventListener('scroll', checkScrollPosition)
            }
        }
    }, [])

    return (
        <nav className="category-nav">
            {!isAtStart && (
                <div className="carousel-btn left-side" onClick={() => scrollCarousel('left')}>
                    <img src={leftArrowSvg} alt="Left Arrow" />
                </div>
            )}
            <div className="container flex" ref={carouselRef}>
                {categories.map(category => (
                    <NavLink key={category} to={`/explore?cat=${category.split(' ').join('-').replace('&', '-')}`}>
                        {category}
                    </NavLink>
                ))}
            </div>
            {!isAtEnd && (
                <div className="carousel-btn right-side" onClick={() => scrollCarousel('right')}>
                    <img src={rightArrowSvg} alt="Right Arrow" />
                </div>
            )}
        </nav>
    )
}