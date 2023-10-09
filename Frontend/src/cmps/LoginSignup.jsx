import React, { useRef, useState, useEffect } from 'react'
import { ImgUploader } from './ImgUploader.jsx'
import { login, signup, loadUsers } from '../store/user.actions.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import loginSignupImg from '../assets/img/login-signup.png'
import checkmarkImg from '../assets/img/svg/checkmark.icon.svg'

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
            <section className='login-notes flex column' style={{ backgroundImage: `url("${loginSignupImg}")` }}>
                <div className='text'>
                    <h2>Success starts here</h2>
                    <ul>
                        <li className='flex row'>
                            <img src={checkmarkImg} />
                            <h3>Over 600 categories</h3>
                        </li>
                        <li className='flex row'>
                            <img src={checkmarkImg} />
                            <h3>Pay per project, not per hour</h3>
                        </li>
                        <li className='flex row'>
                            <img src={checkmarkImg} />
                            <h3>Access to talent and businesses across the globe</h3>
                        </li>
                    </ul>
                </div>
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
                <form className='flex column' onSubmit={isSignup ? handleSignup : handleLogin}>
                    {!isSignup && (
                        <>
                            <div className="login-section flex column">
                                <div className='flex column'>
                                    <label htmlFor="login-username">Username</label>
                                    <input
                                        id="login-username"
                                        type="text"
                                        name="username"
                                        value={credentials.username}
                                        placeholder="Username"
                                        onChange={handleChange}
                                        required
                                        autoFocus
                                    />
                                </div>
                                <div className='flex column'>
                                    <label htmlFor="login-password">Password</label>
                                    <input
                                        id="login-password"
                                        type="password"
                                        name="password"
                                        value={credentials.password}
                                        placeholder="Password"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    {isSignup && (
                        <div className="signup-section flex column">
                            <div className='flex column'>
                                <label htmlFor="signup-fullname">Full Name</label>
                                <input
                                    id="signup-fullname"
                                    type="text"
                                    name="fullname"
                                    value={credentials.fullname}
                                    placeholder="Fullname"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='flex column'>
                                <label htmlFor="signup-username">Username</label>
                                <input
                                    id="signup-username"
                                    type="text"
                                    name="username"
                                    value={credentials.username}
                                    placeholder="Username"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='flex column'>
                                <label htmlFor="signup-password">Password</label>
                                <input
                                    id="signup-password"
                                    type="password"
                                    name="password"
                                    value={credentials.password}
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <ImgUploader onUploaded={onUploaded} />
                        </div>
                    )}
                    <button type="submit">Continue</button>
                    <p>By joining, you agree to the Fiverr Terms of Service and to occasionally receive emails from us. Please read our Privacy Policy to learn how we use your personal data.</p>
                </form>
            </section>
        </main>
    )
}