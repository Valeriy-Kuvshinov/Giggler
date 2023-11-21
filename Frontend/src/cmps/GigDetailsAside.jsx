import { useModal } from '../customHooks/ModalContext.jsx'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { gigService, packages } from '../services/gig.service.js'

import { ShareGigModal } from './ShareGigModal.jsx'
import SvgIcon from './SvgIcon.jsx'

export function GigDetailsAside({ gig, onGigChange, setChatState }) {
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()

  const { openLogin } = useModal()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState('basic')
  const [isLiked, setIsLiked] = useState(
    loggedInUser && gig.likedByUsers.includes(loggedInUser._id)
  )

  useEffect(() => {
    setIsLiked(loggedInUser && gig.likedByUsers.includes(loggedInUser._id))
  }, [loggedInUser, gig])

  function onContinue() {
    if (!loggedInUser) {
      openLogin()
      return
    }
    navigate(`/purchase/${gig._id}/?package=${selectedPackage}`)
  }

  function shareGig() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  function likeGig() {
    if (!loggedInUser) {
      openLogin()
      return
    }
    const gigToSave = { ...gig }

    if (gigToSave.likedByUsers.includes(loggedInUser._id)) {
      gigToSave.likedByUsers = gigToSave.likedByUsers.filter(
        (liker) => liker !== loggedInUser._id
      )
      setIsLiked(false)

      gigService.save(gigToSave).then(() => {
        onGigChange(gigToSave)
      })
    } else {
      gigToSave.likedByUsers.push(loggedInUser._id)

      setIsLiked(true)

      gigService.save(gigToSave).then(() => {
        onGigChange(gigToSave)
      })
    }
  }

  return (
    <section className="gig-details-aside">
      <div className="gig-interactions flex">
        <span className="heart" onClick={(e) => likeGig(e)}>
          {isLiked ? (
            <SvgIcon iconName={'heartLiked'} />
          ) : (
            <SvgIcon iconName={'heart'} />
          )}
        </span>

        <span className="liked-count flex">{gig.likedByUsers.length}</span>

        <button onClick={shareGig} className="flex" title="share the gig">
          <SvgIcon iconName={'shareSocialMediaIcon'} />
        </button>
      </div>

      <div className="package-tabs flex">
        <button
          className={`b ${selectedPackage === 'basic' ? 'checked' : ''
            }`}
          onClick={() => setSelectedPackage('basic')}
        >
          Basic
        </button>

        <button
          className={`b ${selectedPackage === 'standard' ? 'checked' : ''
            }`}
          onClick={() => setSelectedPackage('standard')}
        >
          Standard
        </button>

        <button
          className={`b ${selectedPackage === 'premium' ? 'checked' : ''
            }`}
          onClick={() => setSelectedPackage('premium')}
        >
          Premium
        </button>
      </div>

      <section className="package-content flex column">
        <div className="type-price flex">
          <span className="b">{packages[selectedPackage].type}</span>
          <span className="price">${packages[selectedPackage].price * gig.price}</span>
        </div>
        <p>{packages[selectedPackage].desc}</p>

        <div className="additional-info flex">
          <div className="delivery-wrapper flex">
            <SvgIcon iconName={'clock'} />
            <span className="delivery b">
              {' '}
              {packages[selectedPackage].time} Delivery
            </span>
          </div>
          <div className="revisions-wrapper flex">
            <SvgIcon iconName={'refresh'} />
            <span className="revisions b">{`${packages[selectedPackage].revisions} Revisions`}</span>
          </div>
        </div>
        <ul className="features">
          {packages[selectedPackage].features.map((feature, idx) => (
            <li className="flex row" key={idx}>
              <SvgIcon
                iconName={`${packages[selectedPackage].featuresCond[idx]
                  ? 'checked'
                  : 'unchecked'
                  }`}
              />
              {feature}
            </li>
          ))}
        </ul>
        <button className="flex" onClick={onContinue}>
          <span className="b"> Continue </span> <SvgIcon iconName={'pageArrowRight'} />
        </button>
      </section>
      <div className="contact-seller flex">
        <button
          onClick={() => {
            if (loggedInUser) setChatState(true)
            else openLogin()
          }}
          className="b"
        >
          Contact me
        </button>
      </div>
      {isModalOpen && <ShareGigModal onClose={closeModal} />}
    </section>
  )
}