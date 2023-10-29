import refresh from '../assets/img/svg/refresh.icon.svg'
import checkmark from '../assets/img/svg/checkmark.icon.svg'
import arrow from '../assets/img/svg/arrow.icon.svg'
import share from '../assets/img/svg/share.icon.svg'

import { useModal } from '../customHooks/ModalContext'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { gigService } from '../services/gig.service.js'

import { ShareGigModal } from './ShareGigModal'
import SvgIcon from './SvgIcon'

export function GigDetailsAside({ gig, onGigChange }) {
  const user = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()

  const { openLogin } = useModal()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [SelectedPackage, setSelectedPackage] = useState('basic')
  const [isLiked, setIsLiked] = useState(
    user && gig.likedByUsers.includes(user._id)
  )
  const packages = {
    basic: {
      type: 'Starter Package',
      price: 1 * gig.price,
      desc: `2 logo concepts, jpg, transparent png`,
      time: gig.daysToMake,
      revisions: '8',
      features: [
        '2 concepts included',
        'Logo transparency',
        'Vector file',
        'Printable file',
        'Include 3D mockup',
        'Include source file',
      ],
      featuresCond: [true, true, false, true, true, false],
    },
    standard: {
      type: 'Standard Package',
      price: 3 * gig.price,
      desc: `2 logo concepts + jpg file, transparent png, source files + 3D Mockup`,
      time: gig.daysToMake,
      revisions: 'Unlimited',
      features: [
        '2 concepts included',
        'Logo transparency',
        'Vector file',
        'Printable file',
        'Include 3D mockup',
        'Include source file',
      ],
      featuresCond: [true, true, false, true, true, true],
    },
    premium: {
      type: 'Pro Package',
      price: 5 * gig.price,
      desc: `3 logo concepts+ jpg, png+ all source & vector files + 3D Mockup`,
      time: gig.daysToMake,
      revisions: 'Unlimited',
      features: [
        '3 concepts included',
        'Logo transparency',
        'Vector file',
        'Printable file',
        'Include 3D mockup',
        'Include source file',
      ],
      featuresCond: [true, true, true, true, true, true],
    },
  }

  useEffect(() => {
    setIsLiked(user && gig.likedByUsers.includes(user._id))
  }, [user, gig])

  function onContinue() {
    if (!user) {
      openLogin()
      return
    }
    navigate(`/purchase/${gig._id}`)
  }

  function shareGig() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  function likeGig() {
    if (!user) {
      openLogin()
      return
    }
    const gigToSave = { ...gig }

    if (gigToSave.likedByUsers.includes(user._id)) {
      gigToSave.likedByUsers = gigToSave.likedByUsers.filter(
        (liker) => liker !== user._id
      )
      setIsLiked(false)

      gigService.save(gigToSave).then(() => {
        onGigChange(gigToSave)
      })
    } else {
      gigToSave.likedByUsers.push(user._id)

      setIsLiked(true)

      gigService.save(gigToSave).then(() => {
        onGigChange(gigToSave)
      })
    }
  }

  return (
    <section className="gig-details-aside">
      <div className="gig-interactions">
        <span className="heart" onClick={(e) => likeGig(e)}>
          {isLiked ? (
            <SvgIcon iconName={'heartLiked'} />
          ) : (
            <SvgIcon iconName={'heart'} />
          )}
        </span>

        <span className="liked-count">{gig.likedByUsers.length}</span>

        <button onClick={shareGig} className="share" title="share the gig">
          <img src={share} />
        </button>
      </div>

      {isModalOpen && <ShareGigModal onClose={closeModal} />}

      <div className="package-tabs">
        <button
          className={`btn-package tab-1 ${
            SelectedPackage === 'basic' ? 'checked' : ''
          }`}
          onClick={() => setSelectedPackage('basic')}
        >
          Basic
        </button>
        <button
          className={`btn-package tab-2 ${
            SelectedPackage === 'standard' ? 'checked' : ''
          }`}
          onClick={() => setSelectedPackage('standard')}
        >
          Standard
        </button>
        <button
          className={`btn-package tab-3 ${
            SelectedPackage === 'premium' ? 'checked' : ''
          }`}
          onClick={() => setSelectedPackage('premium')}
        >
          Premium
        </button>
      </div>

      <section className="package-content">
        <div className="type-price">
          <span className="type">{packages[SelectedPackage].type}</span>
          <span className="price">${packages[SelectedPackage].price}</span>
        </div>
        <p>{packages[SelectedPackage].desc}</p>
        <div className="additional-info">
          <div className="delivery-wrapper">
            <SvgIcon iconName={'clock'} />
            <span className="delivery b">
              {' '}
              {packages[SelectedPackage].time} Delivery
            </span>
          </div>
          <div className="revisions-wrapper">
            <SvgIcon iconName={'refresh'} />
            <span className="revisions b">{`${packages[SelectedPackage].revisions} Revisions`}</span>
          </div>
        </div>
        <ul className="features">
          {packages[SelectedPackage].features.map((feature, idx) => (
            <li key={idx}>
              <SvgIcon
                iconName={`${
                  packages[SelectedPackage].featuresCond[idx]
                    ? 'checked'
                    : 'unchecked'
                }`}
              />
              {feature}
            </li>
          ))}
        </ul>
        <span className="btn-continue" onClick={onContinue}>
          <span>Continue</span> <SvgIcon iconName={'pageArrowRight'} />
        </span>
      </section>
      <div className="contact-seller-wrapper">
        <span className="contact-seller b">Contact me</span>
      </div>

    </section>
  )
}
