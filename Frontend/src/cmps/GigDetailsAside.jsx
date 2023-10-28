import clock from '../assets/img/svg/clock.icon.svg'
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
  const [SelectedPackage ,setSelectedPackage] = useState('basic')
  const [isLiked, setIsLiked] = useState(
    user && gig.likedByUsers.includes(user._id)
  )

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

      <section className="gig-order">
        <div className="package-tabs">
          <button className={`package tab-1 ${SelectedPackage === 'basic' ? 'checked' : ''}`} onClick={()=>setSelectedPackage('basic')}>Basic</button>
          <button className={`package tab-2 ${SelectedPackage === 'standard' ? 'checked' : ''}`} onClick={()=>setSelectedPackage('standard')}>Standard</button>
          <button className={`package tab-3 ${SelectedPackage === 'premium' ? 'checked' : ''}`} onClick={()=>setSelectedPackage('premium')}>Premium</button>
        </div>



        <div className="title">
          <span>Order Details</span>
          <span>${gig.price}</span>
        </div>
        <p>
          1 custom logo + high resolution file + 3d mockup + logo transparency +
          300dpi
        </p>
        <div className="shipping-info">
          <div className="inside-shipping">
            <img src={clock} />
            <span> {gig.daysToMake} Delivery</span>
          </div>

          <div className="inside-shipping">
            <img src={refresh} />
            <span>Unlimited Revisions</span>
          </div>
        </div>
        <ul>
          <li>
            <img src={checkmark} />1 concept included
          </li>

          <li>
            <img src={checkmark} />
            Logo transparency
          </li>

          <li>
            <img src={checkmark} />
            Vector file
          </li>

          <li>
            <img src={checkmark} />
            Printable file
          </li>

          <li>
            <img src={checkmark} />
            Include 3D mockup
          </li>

          <li>
            <img src={checkmark} />
            Include source file
          </li>

          <li>
            <img src={checkmark} />
            Include social media kit
          </li>
        </ul>

        <span className="btn-continue" onClick={onContinue}>
          <span>Continue</span> <SvgIcon iconName={'pageArrowRight'} />
        </span>
      </section>
    </section>
  )
}
