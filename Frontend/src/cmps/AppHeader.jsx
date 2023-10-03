import React, { useRef, useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import leftArrowSvg from '../assets/img/svg/left.side.icon.svg'
import rightArrowSvg from '../assets/img/svg/right.side.icon.svg'
import searchIconSvg from '../assets/img/svg/search.icon.svg'

export function AppHeader() {
    const carouselRef = useRef(null)
    const [isAtStart, setIsAtStart] = useState(true)
    const [isAtEnd, setIsAtEnd] = useState(false)

    const user = useSelector(storeState => storeState.userModule.user)
    const categories = ["Graphics & Design", "Programming & Tech", "Digital Marketing", "Video & Animation",
        "Writing & Translation", "Music & Audio", "Business", "Data", "Photography", "AI Services"]

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }

    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    function scrollCarousel(direction) {
        const carousel = carouselRef.current
        const scrollAmount = 250

        if (direction === 'left') carousel.scrollLeft -= scrollAmount
        else if (direction === 'right') carousel.scrollLeft += scrollAmount
    }

    useEffect(() => {
        const checkScrollPosition = () => {
            if (!carouselRef.current) return
            setIsAtStart(carouselRef.current.scrollLeft === 0)
            setIsAtEnd(carouselRef.current.scrollLeft + carouselRef.current.offsetWidth === carouselRef.current.scrollWidth)
        }
        carouselRef.current.addEventListener('scroll', checkScrollPosition)

        checkScrollPosition()
        return () => {
            carouselRef.current.removeEventListener('scroll', checkScrollPosition)
        }
    }, [])

    return (
        <header className="app-header flex column">
            <nav className="main-nav">
                <div className="container flex row">
                    <Link to="/">
                        <h1 className="logo">fiverr<span>.</span></h1>
                    </Link>

                    <div className="search-bar flex">
                        <input type="text" placeholder="What service are you looking for today?" />
                        <button type="submit">
                            <img src={searchIconSvg} alt="Search" />
                        </button>
                    </div>

                    <ul className="nav-links flex">
                        <li><Link to="/">Explore</Link></li>
                        <li><Link to="/">Become a Seller</Link></li>

                        {user ? (
                            <>
                                <li className="user-info">
                                    <Link to={`user/${user._id}`}>
                                        {user.imgUrl && <img src={user.imgUrl} />}
                                        {user.fullname}
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={onLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li><Link to="#" onClick={onLogin}>Sign In</Link></li>
                                <li><Link to="#" onClick={onSignup}>Join</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
            <nav className="category-nav">
                {!isAtStart && (
                    <div className="carousel-btn left-side" onClick={() => scrollCarousel('left')}>
                        <img src={leftArrowSvg} alt="Left Arrow" />
                    </div>
                )}
                <div className="container flex" ref={carouselRef}>
                    {categories.map(category => (
                        <NavLink key={category} to={`/${category.replace(' ', '-').toLowerCase()}`}>
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
        </header>
    )
}