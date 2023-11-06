import { Link, useNavigate } from 'react-router-dom'
import { useModal } from '../customHooks/ModalContext.jsx'

import { BuyerOrders } from './BuyerOrders.jsx'

import { logout } from '../store/user.actions.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function AsideMenu({ user, onClose }) {
    const navigate = useNavigate()
    const { openLogin, openSignup } = useModal()

    async function onLogout() {
        try {
            navigate('/')
            await logout()
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <div className="aside-menu flex column" onClick={onClose}>
            {user ? (
                <>
                    <Link to="/explore"> Explore </Link>
                    <Link to="/">Become a Seller</Link>
                    <Link to={`/user/${user._id}`}>Profile</Link>
                    <Link to="/dashboard">Dashboard</Link>
                    <button className="orders">Orders</button>
                    <button className="logout"
                        onClick={onLogout}>Logout</button>
                </>
            ) : (
                <>
                    <button className="join"
                        onClick={() => {
                            onClose()
                            openSignup()
                        }}
                    >
                        Join Giggler
                    </button>
                    <button className="login"
                        onClick={() => {
                            onClose()
                            openLogin()
                        }}
                    >
                        Sign In
                    </button>
                    <Link to="/explore"> Explore </Link>
                    <Link to="/">Become a Seller</Link>
                </>
            )}
        </div>
    )
}