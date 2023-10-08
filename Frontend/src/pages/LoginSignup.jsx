import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ImgUploader } from '../cmps/ImgUploader.jsx'
import { login, signup, loadUsers } from '../store/user.actions.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function LoginSignup() {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const location = useLocation()
    const navigate = useNavigate()
    const initialIsSignup = location.pathname === '/join'
    const [isSignup, setIsSignup] = useState(initialIsSignup)
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function fetchUsers() {
            const loadedUsers = await loadUsers()
            setUsers(loadedUsers)
        }
        fetchUsers()
    }, [])

    function clearState() {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
        setIsSignup(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    async function handleLogin(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username) return
        try {
            await login(credentials)
            navigate("/")
        } catch (err) {
            showErrorMsg('Cannot login')
        }
        clearState()
    }

    async function handleSignup(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullname) return
        try {
            await signup(credentials)
            navigate("/")
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
        clearState()
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
    }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
    }

    return (
        <div className="login-page">
            <p>
                <button className="btn-link" onClick={toggleSignup}>{!isSignup ? 'Join' : 'Sign In'}</button>
            </p>
            <form onSubmit={isSignup ? handleSignup : handleLogin}>
                {!isSignup && (
                    <>
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            placeholder="Username"
                            onChange={handleChange}
                            required
                            autoFocus
                        />
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                    </>
                )}
                {isSignup && (
                    <div className="signup-section">
                        <input
                            type="text"
                            name="fullname"
                            value={credentials.fullname}
                            placeholder="Fullname"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            placeholder="Username"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                        <ImgUploader onUploaded={onUploaded} />
                    </div>
                )}
                <button type="submit">{isSignup ? 'Sign Up' : 'Log In'}</button>
            </form>
        </div>
    )
}