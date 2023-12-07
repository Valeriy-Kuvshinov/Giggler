import { Link, useNavigate } from 'react-router-dom'

import { logout } from '../store/user.actions.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function UserDropdown({ loggedInUser, onClose }) {
    const navigate = useNavigate()

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
        <div className="user-dropdown" onClick={onClose}>
            <Link to={`/user/${loggedInUser._id}`}>Profile</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/">Become a Seller</Link>
            <button onClick={onLogout}>Logout</button>
        </div>
    )
}