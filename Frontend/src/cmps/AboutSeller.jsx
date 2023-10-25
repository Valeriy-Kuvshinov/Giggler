import { utilService } from '../services/util.service'
import { UserPreview } from './UserPreview'

export function AboutSeller({ owner }) {
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

  const createdAt = new Date(owner.createdAt * 1000)
  let month = months[createdAt.getMonth()]
  let year = createdAt.getFullYear()
  let lastDelivery = new Date(owner.lastDelivery)
  console.log('lastDelivery: ',lastDelivery)

  if (lastDelivery) {
    lastDelivery = generateRandomLastDelivery()
  }
  console.log('lastDelivery: ',lastDelivery)

  function generateRandomLastDelivery() {
    const now = new Date()
    const randomHoursAgo = utilService.getRandomIntInclusive(1, 24)
    now.setHours(now.getHours() - randomHoursAgo)

    return now
  }

  return (
    <section className="about-seller">
      <h3>About The Seller</h3>
      <UserPreview is={'gig-details-2'} owner={owner} />

      <button>Contact Me</button>
      <div className="stats-desc">
        <div className="seller-details">
          <ul className="user-stats">
            <li>
              From<strong>United States</strong>
            </li>
            <li>
              Member since
              <strong>
                {month} {year}
              </strong>
            </li>
            <li>
              Avg. response time<strong>about {average} hours ago</strong>
            </li>
            <li>
              Last delivery
              <strong>
                {lastDelivery.getMonth()+1} {lastDelivery.getFullYear()}
              </strong>
            </li>
            <li>
              <div>
                <p>Languages</p>
                <div className="language">
                  <span className="lang-type">
                    <strong>English</strong>
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <p>{owner.description}</p>
      </div>
    </section>
  )
}
