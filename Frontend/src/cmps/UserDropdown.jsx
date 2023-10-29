import { Link, useNavigate } from 'react-router-dom'

import { logout } from '../store/user.actions.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function UserDropdown({ user, onClose }) {
    const navigate = useNavigate()

    async function onLogout() {
        try {
            navigate('/')
            await logout()
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <div className="user-dropdown" onClick={onClose}>
            <Link to={`/user/${user._id}`}>Profile</Link>
            <Link to="/">Become a Seller</Link>
            <Link to="/dashboard">Orders</Link>
            <button onClick={onLogout}>Logout</button>
        </div>
    )
}