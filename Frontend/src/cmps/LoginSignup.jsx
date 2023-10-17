import React, { useRef, useState, useEffect } from 'react'
import { ImgUploader } from './ImgUploader.jsx'
import { login, signup } from '../store/user.actions.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import loginSignupImg from '../assets/img/login-signup.png'
import checkmarkImg from '../assets/img/svg/checkmark.icon.svg'

export function LoginSignup({ closeModal, mode }) {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        fullName: '',
        imgUrl: ''
    })
    const wrapperRef = useRef(null)
    const [isSignup, setIsSignup] = useState(mode === 'signup')

    function clearState() {
        setCredentials({ username: '', password: '', fullName: '', imgUrl: '' })
        setIsSignup(false)
    }

    function handleChange({ target: { name, value } }) {
        setCredentials(prev => ({ ...prev, [name]: value }))
    }

    async function handleLogin(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username) return

        try {
            await login(credentials)
            closeModal()
        }
        catch (err) {
            showErrorMsg('Cannot login')
        }
        clearState()
    }

    async function handleSignup(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullName) return

        const finalCredentials = { ...credentials }

        if (!finalCredentials.imgUrl) {
            finalCredentials.imgUrl = 'https://img.freepik.com/premium-photo/robot-face-with-green-eyes-black-face_14865-1671.jpg?w=2000'
        }

        try {
            await signup(finalCredentials)
            closeModal()
        }
        catch (err) {
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
                        <div>
                            <h2>Create a new account</h2>
                            <h3>Already have an account? <span onClick={() => setIsSignup(false)}>Sign in</span></h3>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <h2>Sign in to your account</h2>
                            <h3>Don’t have an account? <span onClick={() => setIsSignup(true)}>Join here</span></h3>
                        </div>
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
                                <label htmlFor="signup-fullName">Full Name</label>
                                <input
                                    id="signup-fullName"
                                    type="text"
                                    name="fullName"
                                    value={credentials.fullName}
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
                </form>
                <p>By joining, you agree to the Giggler Terms of Service and to occasionally receive emails from us. Please read our Privacy Policy to learn how we use your personal data.</p>
            </section>
        </main>
    )
}