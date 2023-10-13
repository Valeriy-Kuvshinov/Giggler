import React from 'react'
import { Link } from 'react-router-dom'

export function UserDropdown({ user, onClose }) {
    return (
        <div className="user-dropdown" onClick={onClose}>
            <Link to={`/user/${user._id}`}>Profile</Link>
            <Link to="/">Become a Seller</Link>
            <Link to="/dashboard">Dashboard</Link>
        </div>
    )
}