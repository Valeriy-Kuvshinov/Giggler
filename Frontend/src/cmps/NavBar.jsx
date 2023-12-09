import { useRef, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import SvgIcon from './SvgIcon'

export function NavBar({ categories, display, headerStage, setCatFilter, style }) {
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
    }, [headerStage])

    return (
        <nav className="category-nav" style={style}>
            {!isAtStart && (
                <div className="carousel-btn left-side" onClick={() => scrollCarousel('left')}>
                    <SvgIcon iconName='leftArrow' />
                </div>
            )}
            <div className={`container flex ${display === 'none' ? 'hidden' : ''}`} ref={carouselRef}>
                {categories.map(category => (
                    <NavLink key={category} onClick={() => setCatFilter(category)} to={`/explore`}>
                        {category}
                    </NavLink>
                ))}
            </div>
            {!isAtEnd && (
                <div className="carousel-btn right-side" onClick={() => scrollCarousel('right')}>
                    <SvgIcon iconName='rightArrow' />
                </div>
            )}
        </nav>
    )
}