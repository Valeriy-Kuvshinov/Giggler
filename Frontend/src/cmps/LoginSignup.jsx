import React, { useRef, useState, useEffect } from 'react'
import { ImgUploader } from './ImgUploader.jsx'
import { login, signup, loadUsers } from '../store/user.actions.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import loginSignupPicture from '../assets/img/login-signup.png'

export function LoginSignup({ closeModal, mode }) {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const wrapperRef = useRef(null)
    const [isSignup, setIsSignup] = useState(mode === 'signup')
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
            closeModal()
        } catch (err) {
            showErrorMsg('Cannot login')
        }
        clearState()
    }

    async function handleSignup(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username || !credentials.password
            || !credentials.fullname) return
        try {
            await signup(credentials)
            closeModal()
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
        clearState()
    }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                closeModal()
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [closeModal])

    return (
        <main className="user-login-wrapper" ref={wrapperRef}>
            <section className='login-notes flex column'>
                <img src={loginSignupPicture} />
            </section>
            <section className='user-interaction flex column'>
                {isSignup ? (
                    <>
                        <h2>Create a new account</h2>
                        <h3>Already have an account? <span onClick={() => setIsSignup(false)}>Sign in</span></h3>
                    </>
                ) : (
                    <>
                        <h2>Sign in to your account</h2>
                        <h3>Don’t have an account? <span onClick={() => setIsSignup(true)}>Join here</span></h3>
                    </>
                )}
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
                    <button type="submit">Continue</button>
                </form>
            </section>
        </main>
    )
}