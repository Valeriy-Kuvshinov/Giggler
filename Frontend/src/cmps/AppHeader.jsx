import { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useModal } from '../customHooks/ModalContext.jsx'
import { useDeviceType } from '../customHooks/DeviceTypeContext.jsx'

import { SearchBar } from './SearchBar.jsx'
import { NavBar } from './NavBar.jsx'
import { UserDropdown } from './UserDropdown.jsx'
import { BuyerOrdersDropdown } from './BuyerOrdersDropdown.jsx'
import { AsideMenu } from './AsideMenu.jsx'
import SvgIcon from './SvgIcon.jsx'

import { category } from '../services/gig.service.js'
import { setFilter } from '../store/gig.actions.js'
import { socketService } from '../services/socket.service.js'

export function AppHeader() {
  const [searchQuery, setSearchQuery] = useState('')
  const [headerStage, setHeaderStage] = useState(0)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [showOrdersDropdown, setShowOrdersDropdown] = useState(false)
  const [showAsideMenu, setshowAsideMenu] = useState(false)
  // const [chatNotification, setChatNotification] = useState(false)
  const [notification, setNotification] = useState(false)
  const [headerPlaceholderText, setHeaderPlaceholderText] = useState('')

  const userInfoRef = useRef(null)
  const asideMenuRef = useRef(null)
  const navigate = useNavigate()

  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
  const { openLogin, openSignup } = useModal()
  const deviceType = useDeviceType()

  const categories = category
  const isHomePage = useLocation().pathname === '/'
  const isDashboardSellerPage = useLocation().pathname === '/dashboard'
  const isDashboardBuyerPage = useLocation().pathname === '/orders'
  const isGigPage = useLocation().pathname.startsWith('/gig/')

  const logoColor = headerStage === 0 ? '#fff' : '#404145'
  const headerStyles = {
    backgroundColor: headerStage >= 1 ? '#fff' : 'transparent',
    color: isHomePage && headerStage === 0 ? '#fff' : '#62646a',
  }
  const navBarStyles = {
    borderBottom: headerStage >= 2 ? '1px solid #e4e5e7' : 'none',
    borderTop: headerStage >= 2 ? '1px solid #e4e5e7' : 'none',
    display: (isDashboardSellerPage || isDashboardBuyerPage) ? 'none' : '',
  }
  const joinButtonStyles = {
    color: headerStage === 0 && isHomePage ? '#fff' : '#1dbf73',
    borderColor: headerStage === 0 && isHomePage ? '#fff' : '#1dbf73',
  }

  // function promptSellerChat(buyer) {
  //   setNotification(true)
  //   setChatNotification(true)
  //   setTheBuyer(buyer)
  // }

  function newOrderNotification() {
    setNotification(true)
  }

  const closeDropdown = (e) => {
    if (userInfoRef.current && !userInfoRef.current.contains(e.target)) {
      setShowUserDropdown(false)
      setShowOrdersDropdown(false)
    }
  }

  const closeAsideMenu = (e) => {
    if (asideMenuRef.current && !asideMenuRef.current.contains(e.target)) {
      setshowAsideMenu(false)
    }
  }

  // useEffect(() => {
  //   socketService.on('chat_seller_prompt', promptSellerChat)
  //   socketService.on('notify_seller_new_order', newOrderNotification)
  //   return () => {
  //     socketService.off('chat_seller_prompt', promptSellerChat)
  //     socketService.off('notify_seller_new_order', newOrderNotification)
  //   }
  // }, [])

  useEffect(() => {
    if (
      !isHomePage ||
      deviceType === 'mini-tablet' ||
      deviceType === 'mobile'
    ) {
      setHeaderStage(2)
      setHeaderPlaceholderText('Find services...')
    } else {
      setHeaderStage(0)
      setHeaderPlaceholderText('What service are you looking for today?')
    }
  }, [deviceType, isHomePage])

  useEffect(() => {
    const handleScroll = () => {
      if (deviceType !== 'mini-tablet' && deviceType !== 'mobile') {
        const newStage = window.scrollY < 50 ? 0 : window.scrollY < 150 ? 1 : 2
        setHeaderStage(newStage)
      }
    }
    if (isHomePage && deviceType !== 'mini-tablet' && deviceType !== 'mobile') {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [isHomePage, deviceType])

  useEffect(() => {
    window.addEventListener('click', closeDropdown)
    window.addEventListener('click', closeAsideMenu)
    return () => {
      window.removeEventListener('click', closeDropdown)
      window.removeEventListener('click', closeAsideMenu)
    }
  }, [])

  function handleSearchChange(e) {
    const newSearchQuery = e.target.value
    setSearchQuery(newSearchQuery)
  }

  function handleSearchSubmit(e) {
    e.preventDefault()
    if (!searchQuery) return
    setFilter({ ...filterBy, search: searchQuery })
    navigate(`/explore`)
    setSearchQuery('')
  }

  function setCatFilter(category) {
    setFilter({ ...filterBy, cat: category })
  }

  // function onChatState(e) {
  //   e.preventDefault()
  //   setChatState(true)
  // }

  if (isGigPage && deviceType === 'mobile') {
    return null
  }

  return (
    <header
      className={`app-header flex column full ${isHomePage ? 'home-page' : ''}`}
      style={headerStyles}
    >
      <nav className="main-nav">
        <div className="container flex row">
          <div
            className={`dropdown flex ${notification ? 'notification' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              setshowAsideMenu(!showAsideMenu)
              setNotification(false)
            }}
            ref={asideMenuRef}
          >
            <SvgIcon
              iconName={
                headerStage === 0 ? 'headerDropdownWhite' : 'headerDropdownGray'
              }
            />
            {showAsideMenu && (
              <AsideMenu
                loggedInUser={loggedinUser}
                onClose={() => setshowAsideMenu(false)}
              />
            )}
          </div>
          <Link to="/" style={{ color: headerStyles.color }}>
            <h1 style={{ color: logoColor }} className="flex row">
              Giggler
              <span className="flex">
                <SvgIcon iconName={'greenDotIcon'} />
              </span>
            </h1>
          </Link>

          <SearchBar
            placeholder={headerPlaceholderText}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onSearchSubmit={handleSearchSubmit}
            visibility={headerStage >= 1 ? 'visible' : 'hidden'}
          />
          <ul className="nav-links flex">
            <li>
              <Link to="/explore" style={{ color: headerStyles.color }}>
                Explore
              </Link>
            </li>
            {loggedinUser ? (
              <>
                <li
                  className="orders-info"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowOrdersDropdown(!showOrdersDropdown)
                  }}
                  ref={userInfoRef}
                >
                  <button
                    className="header-btn orders"
                    style={{ color: headerStyles.color }}
                  >
                    Orders
                  </button>
                  {showOrdersDropdown && (
                    <BuyerOrdersDropdown
                      loggedInUser={loggedinUser}
                      onClose={() => setShowOrdersDropdown(false)}
                    />
                  )}
                </li>

                {loggedinUser && (
                  <li>
                    <Link to={`/chat/${loggedinUser._id}`} className={headerStage === 0 ? 'clr-one' : 'clr-two'}>
                      <SvgIcon iconName={'appEnvelopeIcon'} />
                    </Link>
                  </li>
                )}

                <li
                  className="user-info flex"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowUserDropdown(!showUserDropdown)
                  }}
                  ref={userInfoRef}
                >
                  {loggedinUser.imgUrl && (
                    <img src={loggedinUser.imgUrl} alt="User" />
                  )}
                  {showUserDropdown && (
                    <UserDropdown
                      loggedInUser={loggedinUser}
                      onClose={() => setShowUserDropdown(false)}
                    />
                  )}
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" style={{ color: headerStyles.color }}>
                    Become a Seller
                  </Link>
                </li>

                <li>
                  <button
                    className="header-btn login"
                    onClick={openLogin}
                    style={{ color: headerStyles.color }}
                  >
                    Sign In
                  </button>
                </li>

                <li>
                  <button
                    className="header-btn join"
                    onClick={openSignup}
                    style={joinButtonStyles}
                  >
                    Join
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <NavBar
        categories={categories}
        display={headerStage === 2 ? 'flex' : 'none'}
        headerStage={headerStage}
        setCatFilter={setCatFilter}
        style={navBarStyles}
      />
    </header>
  )
}
