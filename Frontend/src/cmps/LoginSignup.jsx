import { useRef, useState, useEffect } from 'react'
import { ImgUploader } from './ImgUploader.jsx'
import { login, signup } from '../store/user.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import loginSignupImg from '../assets/img/login-signup.png'
import checkmarkImg from '../assets/img/svg/checkmark.white.icon.svg'

export function LoginSignup({ closeModal, mode }) {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullName: '', imgUrl: '' })
    const wrapperRef = useRef(null)
    const [isSignup, setIsSignup] = useState(mode === 'signup')

    const clearState = () => setCredentials({ username: '', password: '', fullName: '', imgUrl: '' })

    const handleChange = ({ target: { name, value } }) => setCredentials(prev => ({ ...prev, [name]: value }))

    const handleAuth = async (ev, isSignUp) => {
        ev.preventDefault()

        if (!credentials.username || (isSignUp && (!credentials.password || !credentials.fullName))) return

        const action = isSignUp ? signup : login
        const creds = { ...credentials }

        if (isSignUp && !creds.imgUrl) {
            creds.imgUrl = 'https://img.freepik.com/premium-photo/robot-face-with-green-eyes-black-face_14865-1671.jpg?w=2000'
        }

        try {
            await action(creds)
            showSuccessMsg('Welcome user!')
            closeModal()
        }
        catch {
            showErrorMsg(`Cannot ${isSignUp ? 'signup' : 'login'}`)
        }

        clearState()
    }

    function onUploaded(imgUrl) {
        setCredentials(prevCredentials => ({ ...prevCredentials, imgUrl }))
    }

    useEffect(() => {
        const handleClickOutside = event => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                closeModal()
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
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
                <div>
                    <h2>{isSignup ? "Create a new account" : "Sign in to your account"}</h2>
                    <h3>{isSignup ? "Already have an account?" : "Don’t have an account?"} <span onClick={() => setIsSignup(!isSignup)}>{isSignup ? "Sign in" : "Join here"}</span></h3>
                </div>
                <form className='flex column' onSubmit={(e) => handleAuth(e, isSignup)}>
                    <div className={isSignup ? "signup-section" : "login-section flex column"}>
                        <div className='flex column'>
                            <label htmlFor={`${isSignup ? "signup" : "login"}-username`}>Username</label>
                            <input
                                id={`${isSignup ? "signup" : "login"}-username`}
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
                            <label htmlFor={`${isSignup ? "signup" : "login"}-password`}>Password</label>
                            <input
                                id={`${isSignup ? "signup" : "login"}-password`}
                                type="password"
                                name="password"
                                value={credentials.password}
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignup && (
                            <>
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
                                <ImgUploader onUploaded={onUploaded} />
                            </>
                        )}
                    </div>
                    <button type="submit">Continue</button>
                </form>
                <p>By joining, you agree to the Giggler Terms of Service and to occasionally receive emails from us. Please read our Privacy Policy to learn how we use your personal data.</p>
            </section>
        </main>
    )
}