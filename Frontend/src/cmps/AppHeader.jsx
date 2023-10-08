import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/user.actions.js'
import { SearchBar } from './SearchBar.jsx'
import { NavBar } from './NavBar.jsx'

export function AppHeader() {
    const [searchQuery, setSearchQuery] = useState('')
    const location = useLocation()
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.user)
    const categories = ["Graphics & Design", "Programming & Tech", "Digital Marketing", "Video & Animation",
        "Writing & Translation", "Music & Audio", "Business", "Data", "Photography", "AI Services"]
    
    async function onLogout() {
        try {
            await logout()
            navigate("/")
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    const isHomePage = location.pathname === '/'

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
        <header className={`app-header flex column full ${isHomePage ? 'home-page' : ''}`}>
            <nav className="main-nav">
                <div className="container flex row">
                    <Link to="/">
                        <h1 className="logo">giggler<span>.</span></h1>
                    </Link>

                    <SearchBar
                        placeholder="Search for any service..."
                        searchQuery={searchQuery}
                        onSearchChange={handleSearchChange}
                        onSearchSubmit={handleSearchSubmit}
                    />

                    <ul className="nav-links flex">
                        <li><Link to="/explore">Explore</Link></li>
                        <li><Link to="/profile">Become a Seller</Link></li>

                        {user ? (
                            <>
                                <li className="user-info">
                                    <Link to={`user/${user._id}`}>
                                        {user.imgUrl && <img src={user.imgUrl} />}
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={onLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login">Sign In</Link></li>
                                <li><Link to="/join">Join</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
            <NavBar categories={categories} />
        </header>
    )
}