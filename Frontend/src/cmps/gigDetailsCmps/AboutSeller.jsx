import { useModal } from '../../customHooks/ModalContext.jsx'
import { useSelector } from 'react-redux'

import { UserPreview } from '../UserPreview.jsx'

import { utilService } from '../../services/util.service.js'

export function AboutSeller({ owner }) {
  const user = useSelector((storeState) => storeState.userModule.user)

  const { openLogin } = useModal()

  function onContactOwner() {
    if (!user) {
      openLogin()
      return
    }
    console.log('user logged in')
  }

  const average = utilService.getRandomIntInclusive(1, 24)

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const createdAt = new Date(owner.createdAt)
  let month = months[createdAt.getMonth()]
  let year = createdAt.getFullYear()
  let lastDelivery = new Date(owner.lastDelivery)

  if (lastDelivery) {
    lastDelivery = generateRandomLastDelivery()
  }

  function generateRandomLastDelivery() {
    const now = new Date()
    const randomHoursAgo = utilService.getRandomIntInclusive(1, 24)
    now.setHours(now.getHours() - randomHoursAgo)

    return now
  }

  return (
    <section className="about-seller">
      <div className="seller-wrapper">
        <h3>About The Seller</h3>
        <UserPreview isFrom={'gig-details-2'} owner={owner} />

        <button className="btn-contact b" onClick={(e) => onContactOwner(e)}>
          Contact me
        </button>
      </div>
      <div className="stats-desc">
        <ul className="user-stats grid">
          <li>
            From<strong>{owner.country}</strong>
          </li>
          <li>
            Member since
            <strong>
              {month} {year}
            </strong>
          </li>
          <li>
            Avg. response time
            <strong>about {average} hours ago</strong>
          </li>
          <li>
            Last delivery
            <strong>
              {months[lastDelivery.getMonth()]} {lastDelivery.getFullYear()}
            </strong>
          </li>
          <li className="language">
            Languages
            <span className="lang-type">
              {owner.languages.map((lang, idx) => (
                <span key={idx}>{lang.language}, </span>
              ))}
            </span>
          </li>
        </ul>
        {owner.description && (
          <div className="seller-desc">
            <span>{owner.description}</span>
          </div>
        )}
      </div>
    </section>
  )
}
