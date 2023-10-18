import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useModal } from '../customHooks/ModalContext'
import { showErrorMsg } from '../services/event-bus.service.js'
import { logout } from '../store/user.actions.js'
import { SearchBar } from './SearchBar.jsx'
import { NavBar } from './NavBar.jsx'
import { UserDropdown } from './UserDropdown.jsx'

export function AppHeader() {
    const [searchQuery, setSearchQuery] = useState('')
    const [headerStage, setHeaderStage] = useState(0)
    const [showDropdown, setShowDropdown] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.user)
    const { showModal, openLogin, openSignup } = useModal()
    const categories = [
        "Graphics & Design", "Programming & Tech", "Digital Marketing", "Video & Animation",
        "Writing & Translation", "Music & Audio", "Business", "Data", "Photography", "AI Services"
    ]
    const isHomePage = location.pathname === '/'

    useEffect(() => {
        const handleScroll = () => {
            if (isHomePage) {
                if (window.scrollY < 50) setHeaderStage(0)
                else if (window.scrollY < 150) setHeaderStage(1)
                else setHeaderStage(2)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isHomePage])

    useEffect(() => {
        if (isHomePage) setHeaderStage(0)
        else setHeaderStage(2)
    }, [isHomePage])

    async function onLogout() {
        try {
            navigate("/")
            await logout()
        }
        catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    useEffect(() => {
        const closeDropdown = (e) => {
            if (e.target.className !== 'user-info') setShowDropdown(false)
        }
        window.addEventListener('click', closeDropdown)

        return () => {
            window.removeEventListener('click', closeDropdown)
        }
    }, [])

    function handleSearchChange(e) {
        const newSearchQuery = e.target.value
        setSearchQuery(newSearchQuery)
    }

    function handleSearchSubmit(e) {
        e.preventDefault()
        if (!searchQuery) return

        navigate(`/explore?search=${searchQuery}`)
    }

    function toggleDropdown(e) {
        e.stopPropagation()
        setShowDropdown(!showDropdown)
    }

    const headerBgColor = headerStage >= 1 ? '#fff' : 'transparent'
    const searchVisibility = headerStage === 2 ? 'visible' : 'hidden'
    const mainNavBorder = headerStage === 2 ? '1px solid #ced1d6' : 'none'
    const categoryNavDisplay = headerStage === 2 ? 'flex' : 'none'
    const textColor = (isHomePage && headerStage === 0) ? '#fff' : '#62646a'
    const joinBtnColor = (headerStage >= 1 || !isHomePage) ? '#1dbf73' : '#fff'

    return (
        <header className={`app-header flex column full ${isHomePage ? 'home-page' : ''} ${showModal ? 'show-modal' : ''}`} style={{ backgroundColor: headerBgColor }}>
            <nav className="main-nav" style={{ borderBottom: mainNavBorder }}>
                <div className="container flex row" style={{ color: textColor }}>
                    <Link to="/" style={{ color: textColor }}>
                        <h1 className="logo">Giggler<span>.</span></h1>
                    </Link>
                    <SearchBar
                        placeholder="Search for any service..."
                        searchQuery={searchQuery}
                        onSearchChange={handleSearchChange}
                        onSearchSubmit={handleSearchSubmit}
                        visibility={searchVisibility}
                    />
                    <ul className="nav-links flex">
                        <li><Link to="/explore" style={{ color: textColor }}>Explore</Link></li>
                        {user ? (
                            <>
                                <li className="user-info flex" onClick={toggleDropdown}>
                                    {user.imgUrl && <img src={user.imgUrl} />}
                                    {showDropdown && <UserDropdown user={user} onClose={toggleDropdown} />}
                                </li>
                                <li>
                                    <button className='logout' onClick={onLogout} style={{ color: textColor }}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li><button className='login' onClick={openLogin} style={{ color: textColor }}>Sign In</button></li>
                                <li><button className='join' onClick={openSignup} style={{ color: joinBtnColor, borderColor: joinBtnColor }}>Join</button></li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
            <NavBar categories={categories} display={categoryNavDisplay} headerStage={headerStage} />
        </header>
    )
}