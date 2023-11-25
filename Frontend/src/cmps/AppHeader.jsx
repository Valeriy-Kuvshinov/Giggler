import { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useModal } from '../customHooks/ModalContext.jsx'

import { SearchBar } from './SearchBar.jsx'
import { NavBar } from './NavBar.jsx'
import { UserDropdown } from './UserDropdown.jsx'
import { BuyerOrders } from './BuyerOrders.jsx'
import { AsideMenu } from './AsideMenu.jsx'
import SvgIcon from './SvgIcon.jsx'
import { UserChat } from './UserChat.jsx'

import { category } from '../services/gig.service.js'
import { setFilter } from '../store/gig.actions.js'
import { socketService } from '../services/socket.service.js'

export function AppHeader() {
  const [searchQuery, setSearchQuery] = useState('')
  const [headerStage, setHeaderStage] = useState(
    window.innerWidth <= 600 ? 2 : 0)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [showOrdersDropdown, setShowOrdersDropdown] = useState(false)
  const [showAsideMenu, setshowAsideMenu] = useState(false)
  const [theBuyer, setTheBuyer] = useState('')
  const [chatNotification, setChatNotification] = useState(false)
  const [notification, setNotification] = useState(false)
  const [chatState, setChatState] = useState(false)
  const [headerPlaceholderText, setHeaderPlaceholderText] = useState(
    window.innerWidth <= 600
      ? 'Find services...'
      : 'What service are you looking for today?'
  )

  const userInfoRef = useRef(null)
  const asideMenuRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)

  const { showModal, openLogin, openSignup } = useModal()

  const categories = category
  const isHomePage = location.pathname === '/'

  const logoColor = headerStage === 0 ? '#fff' : '#404145'
  const headerStyles = {
    backgroundColor: headerStage >= 1 ? '#fff' : 'transparent',
    color: isHomePage && headerStage === 0 ? '#fff' : '#62646a',
  }
  const navBarStyles = {
    borderBottom: headerStage >= 2 ? '1px solid #e4e5e7' : 'none',
    borderTop: headerStage >= 2 ? '1px solid #e4e5e7' : 'none',
  }
  const joinButtonStyles = {
    color: headerStage === 0 && isHomePage ? '#fff' : '#1dbf73',
    borderColor: headerStage === 0 && isHomePage ? '#fff' : '#1dbf73',
  }

  function promptSellerChat(buyer) {
    setNotification(true)
    setChatNotification(true)
    setTheBuyer(buyer)
  }

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

  useEffect(() => {
    socketService.on('chat_seller_prompt', promptSellerChat)
    socketService.on('notify-seller-new-order', newOrderNotification)
    return () => {
      socketService.off('chat_seller_prompt', promptSellerChat)
    }
  }, [])

  useEffect(() => {
    if (isHomePage) {
      const handleScrollResize = () => {
        if (window.innerWidth > 600) {
          if (window.scrollY < 50) setHeaderStage(0)
          else if (window.scrollY < 150) setHeaderStage(1)
          else setHeaderStage(2)
        }
        else setHeaderStage(window.innerWidth <= 600 ? 2 : 0)
      }
      window.addEventListener('scroll', handleScrollResize)
      window.addEventListener('resize', handleScrollResize)

      return () => {
        window.removeEventListener('scroll', handleScrollResize)
        window.removeEventListener('resize', handleScrollResize)
      }
    }
    else setHeaderStage(2)
  }, [isHomePage])

  useEffect(() => {
    const updatePlaceholder = () => {
      if (window.innerWidth <= 600) setHeaderPlaceholderText('Find services...')
      else setHeaderPlaceholderText('What service are you looking for today?')
    }
    window.addEventListener('resize', updatePlaceholder)
    updatePlaceholder()
    return () => window.removeEventListener('resize', updatePlaceholder)
  }, [])

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

  function onChatState(e) {
    e.preventDefault()
    setChatState(true)
  }

  return (
    <header
      className={`app-header flex column full ${isHomePage ? 'home-page' : ''
        } ${showModal ? 'show-modal' : ''}`}
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
                theBuyer={theBuyer}
                onChatState={onChatState}
                chatNotification={chatNotification}
                setChatNotification={setChatNotification}
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
            {theBuyer && (
              <li onClick={(e) => onChatState(e)}>
                <SvgIcon iconName={'chat'} />
              </li>
            )}
            <li>
              <Link to="/explore" style={{ color: headerStyles.color }}>
                Explore
              </Link>
            </li>
            {loggedinUser ? (
              <>
                <li
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
                    <BuyerOrders
                      loggedInUser={loggedinUser}
                      onClose={() => setShowOrdersDropdown(false)}
                    />
                  )}
                </li>

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
      {chatState && (
        <UserChat
          owner={loggedinUser}
          window={null}
          chatState={chatState}
          setChatState={setChatState}
          buyer={theBuyer}
        />
      )}
    </header>
  )
}