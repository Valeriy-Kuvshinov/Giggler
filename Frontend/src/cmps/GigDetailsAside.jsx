import { useModal } from '../customHooks/ModalContext.jsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { packages } from '../services/gig.service.js'

import { GigDetInteractions } from './GigDetInteractions.jsx'
import SvgIcon from './SvgIcon.jsx'

export function GigDetailsAside({ loggedInUser, gig, deviceType, onGigChange, setChatState }) {
  const [selectedPackage, setSelectedPackage] = useState('basic')

  const navigate = useNavigate()
  const { openLogin } = useModal()

  function onContinue() {
    if (!loggedInUser) {
      openLogin()
      return
    }
    navigate(`/purchase/${gig._id}/?package=${selectedPackage}`)
  }

  return (
    <section className="gig-details-aside">
      {deviceType === 'desktop' && (
        <GigDetInteractions
          gig={gig}
          loggedInUser={loggedInUser}
          deviceType={deviceType}
          onGigChange={onGigChange}
        />
      )}
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
    </section>
  )
}