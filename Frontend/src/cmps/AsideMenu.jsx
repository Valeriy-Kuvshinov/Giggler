import { Link, useNavigate } from 'react-router-dom'
import { useModal } from '../customHooks/ModalContext.jsx'

import { logout } from '../store/user.actions.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function AsideMenu({ loggedInUser, onClose }) {
  const navigate = useNavigate()
  const { openLogin, openSignup } = useModal()

  async function onLogout() {
    try {
      navigate('/')
      await logout()
    } catch (err) {
      showErrorMsg(
        {
          title: 'FAILED TO LOGOUT',
          body: `This is awkward...`,
        },
        {
          userMsgLeft: '55%',
          messageAreaPadding: '2em 1.5em 2em 8em',
          msgStatusTranslateX: '-12em',
        }
      )
    }
  }

  return (
    <main className="aside-menu-wrapper flex">
      <section
        className="aside-menu flex column"
        onClick={(e) => e.stopPropagation()}
      >
        {loggedInUser ? (
          <>
            <div className="top-icons flex row">
              <div className="user-info flex row">
                <img src={loggedInUser.imgUrl} alt="user" />
                <span>{loggedInUser.username}</span>
              </div>
            </div>
            <Link to={`/user/${loggedInUser._id}`} onClick={onClose}>
              Profile
            </Link>

            <Link to="/explore" onClick={onClose}>
              {' '}
              Explore{' '}
            </Link>

            <Link to="/" onClick={onClose}>
              Become a Seller
            </Link>

            <Link to="/dashboard" onClick={onClose}>
              Dashboard
            </Link>

            <Link to="/orders" onClick={onClose}>
              Orders
            </Link>

            <button className="logout" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="join"
              onClick={() => {
                onClose()
                openSignup()
              }}
            >
              Join
            </button>
            <button
              className="login"
              onClick={() => {
                onClose()
                openLogin()
              }}
            >
              Sign In
            </button>
            <Link to="/explore" onClick={onClose}>
              {' '}
              Explore{' '}
            </Link>
            <Link to="/" onClick={onClose}>
              Become a Seller
            </Link>
          </>
        )}
      </section>
    </main>
  )
}
