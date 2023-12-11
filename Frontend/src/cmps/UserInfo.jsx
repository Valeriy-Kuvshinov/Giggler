import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadReviews } from '../store/review.actions.js'
import { utilService, yearlyMonths } from '../services/util.service.js'

import SvgIcon from './SvgIcon.jsx'

export function UserInfo({ watchedUser }) {
  const reviews = useSelector((storeState) => storeState.reviewModule.reviews)

  const filteredReviews = watchedUser
    ? reviews.filter((review) => review.sellerId === watchedUser._id)
    : []

  useEffect(() => {
    loadReviews()
  }, [])

  const time = new Date(watchedUser.createdAt)
  let month = yearlyMonths[time.getMonth()]
  let year = time.getFullYear()
  let deliveredTime

  if (!watchedUser.lastDeliveredAt) deliveredTime = new Date(Date.now())
  else deliveredTime = new Date(watchedUser.lastDeliveredAt)

  const renderStars = () => {
    let fullStarsCount = Math.floor(watchedUser.rating)
    const isHalfStar = watchedUser.rating % 1 >= 0.5

    const stars = [...Array(fullStarsCount)].map((_, idx) => (
      <SvgIcon iconName={'star'} key={utilService.makeId()} />
    ))

    if (isHalfStar) {
      stars.push(<SvgIcon iconName={'halfstar'} key={utilService.makeId()} />)
      fullStarsCount += 1
    }

    const emptyStarsCount = 5 - fullStarsCount
    for (let i = 0; i < emptyStarsCount; i++) {
      stars.push(<SvgIcon iconName={'emptystar'} key={utilService.makeId()} />)
    }
    return stars
  }

  let userLevel = ''
  if (watchedUser.level === 'level 0') userLevel = 'newuser'
  if (watchedUser.level === 'level 1') userLevel = 'level1'
  if (watchedUser.level === 'level 2') userLevel = 'level2'
  if (watchedUser.level === 'level 3') userLevel = 'topuser'

  return (
    <section className="user-info">
      <div className="info-block flex column">
        <div className="profile-picture">
          <img src={watchedUser.imgUrl} />
          <div className='background'><SvgIcon iconName={'user'} /></div>
          <SvgIcon iconName={userLevel} />
        </div>

        <h2>{watchedUser.fullName}</h2>

        <span className="username">@{watchedUser.username}</span>

        <div className="stars flex">
          {renderStars()}
          <span className="rating">{watchedUser.rating}</span>
          <span className="review-count">
            ({filteredReviews.length} reviews)
          </span>
        </div>

        <div className="location-and-time">
          <div className="info-line flex">
            <span className="data flex">
              <SvgIcon iconName={'location'} />
              <span>From</span>
            </span>
            <span className="bold">{watchedUser.country}</span>
          </div>

          <div className="info-line flex">
            <span className="data flex">
              <SvgIcon iconName={'user'} />
              <span>Member Since</span>
            </span>
            <span className="bold">
              {month.slice(0, 3)} {year}
            </span>
          </div>

          <div className="info-line flex">
            <span className="data flex">
              <SvgIcon iconName={'clock'} />
              <span>Avg. Response Time</span>
            </span>
            <span className="bold">
              {utilService.getRandomIntInclusive(2, 12)} Hours
            </span>
          </div>

          <div className="info-line flex">
            <span className="data flex">
              <SvgIcon iconName={'airplaneIcon'} />
              <span>Last Delivery</span>
            </span>
            <span className="bold">
              {yearlyMonths[deliveredTime.getMonth()].slice(0, 3)}{' '}
              {deliveredTime.getFullYear()}
            </span>
          </div>
        </div>
      </div>

      <div className="info-block flex column description">
        <h3 className="description-title">Description</h3>
        <div className="description-box">{watchedUser.description}</div>

        <div className="languages">
          <span className="title">Languages</span>
          {watchedUser.languages && <div className="the-languages">
            {watchedUser.languages.map((language) => (
              <div className="language" key={language.language}>
                <span>{language.language}</span>
                <span> - </span>
                <span>{language.fluency}</span>
              </div>
            ))}
          </div>}
        </div>

        <div className="skills">
          <span className="title">Skills</span>
          {watchedUser.skills && <div className="the-skills flex">
            {watchedUser.skills.map(skill =>
              <div className="skill" key={skill}>
                <span>{skill}</span>
              </div>)}
          </div>}
        </div>

        <div className="educations">
          <span className="title">Education</span>
          {watchedUser.education && <div className="the-educations">
            {watchedUser.education.map(education =>
              <div className="education flex column" key={education.graduationTime}>
                <span>{education.certificate}</span>
                <span>{education.educationPlace}, Graduated {education.graduationTime}</span>
              </div>)}
          </div>}
        </div>
      </div>
    </section>
  )
}