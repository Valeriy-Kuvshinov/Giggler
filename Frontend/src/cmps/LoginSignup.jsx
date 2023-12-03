import { useRef, useState, useEffect } from 'react'
import { ImgUploader } from './ImgUploader.jsx'
import { login, signup } from '../store/user.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
const loginSignupImg =
  'https://res.cloudinary.com/dgwgcf6mk/image/upload/v1701539882/Giggler/other/ig0he3ezrfszaiqg6joe.png'
import checkmarkImg from '../assets/img/svg/checkmark.white.icon.svg'
import { utilService } from '../services/util.service.js'
import SvgIcon from './SvgIcon.jsx'
import { useDeviceType } from '../customHooks/DeviceTypeContext.jsx'

export function LoginSignup({ closeModal, mode }) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    fullName: '',
    imgUrl: '',
  })
  const wrapperRef = useRef(null)
  const [isSignup, setIsSignup] = useState(mode === 'signup')
  const deviceType = useDeviceType()

  const clearState = () =>
    setCredentials({ username: '', password: '', fullName: '', imgUrl: '' })

  const handleChange = ({ target: { name, value } }) =>
    setCredentials((prev) => ({ ...prev, [name]: value }))

  const handleAuth = async (ev, isSignUp) => {
    ev.preventDefault()

    if (
      !credentials.username ||
      (isSignUp && (!credentials.password || !credentials.fullName))
    )
      return

    const action = isSignUp ? signup : login
    const creds = { ...credentials }
    if (isSignUp && !creds.imgUrl) {
      const randColor = utilService.getRandomMidColor().substring(1)
      creds.imgUrl = `https://placehold.co/${100}/${randColor}/ffffff?text=${creds.fullName[0].toUpperCase()}`
    }

    try {
      await action(creds)
      showSuccessMsg(
        {
          title: 'USER LOGGED IN',
          body: `Welcome ${creds.username}!`,
        },
        {
          userMsgLeft: '65%',
          messageAreaPadding: '2em 1.5em 2em 7em',
          msgStatusTranslateX: '-10em',
        }
      )
      closeModal()
    } catch (err) {
      showErrorMsg(
        {
          title: 'LOGIN FAILED',
          body: `Invalid username / password`,
        },
        {
          userMsgLeft: '55%',
          messageAreaPadding: '2em 1.5em 2em 7em',
          msgStatusTranslateX: '-11.5em',
        }
      )
    }

    clearState()
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        closeModal()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [closeModal])

  return (
    <main className="user-login-wrapper" ref={wrapperRef}>
      <section
        className="login-notes flex column"
        style={{ backgroundImage: `url("${loginSignupImg}")` }}
      >
        <div className="text">
          <h2>Success starts here</h2>
          <ul>
            <li className="flex row">
              <img src={checkmarkImg} />
              <h3>Over 600 categories</h3>
            </li>
            <li className="flex row">
              <img src={checkmarkImg} />
              <h3>Pay per project, not per hour</h3>
            </li>
            <li className="flex row">
              <img src={checkmarkImg} />
              <h3>Access to talent and businesses across the globe</h3>
            </li>
          </ul>
        </div>
      </section>

      <section className="user-interaction flex column">
        {deviceType === 'mobile' &&
          <span className="close" onClick={() => closeModal()}>
            <SvgIcon iconName={'remove'} />
          </span>
        }
        <div>
          <h2>
            {isSignup ? 'Create a new account' : 'Sign in to your account'}
          </h2>
          <h3>
            {isSignup ? 'Already have an account?' : 'Don’t have an account?'}{' '}
            <span onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? 'Sign in' : 'Join here'}
            </span>
          </h3>
        </div>
        <form className="flex column" onSubmit={(e) => handleAuth(e, isSignup)}>
          <div
            className={
              isSignup ? 'signup-section flex column' : 'login-section flex column'
            }
          >
            <div className="flex column">
              <label htmlFor={`${isSignup ? 'signup' : 'login'}-username`}>
                Username
              </label>
              <input
                id={`${isSignup ? 'signup' : 'login'}-username`}
                type="text"
                name="username"
                value={credentials.username}
                placeholder="Username"
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
            <div className="flex column">
              <label htmlFor={`${isSignup ? 'signup' : 'login'}-password`}>
                Password
              </label>
              <input
                id={`${isSignup ? 'signup' : 'login'}-password`}
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
                <div className="flex column">
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
              </>
            )}
          </div>
          <button type="submit">Continue</button>
        </form>
        <p>
          By joining, you agree to the Giggler Terms of Service and to
          occasionally receive emails from us. Please read our Privacy Policy to
          learn how we use your personal data.
        </p>
      </section>
    </main>
  )
}
