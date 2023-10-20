import heart from "../assets/img/svg/heart.icon.svg"
import likedHeart from "../assets/img/svg/liked.heart.icon.svg"
import share from "../assets/img/svg/share.icon.svg"

import { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import { useModal } from "../customHooks/ModalContext"

import { CatTagDisplayBar } from "./CatTagDisplayBar.jsx"
import { ShareGigModal } from "./ShareGigModal.jsx"
import { gigService } from "../services/gig.service.js"

export function GigNavbar({ gig, onGigChange }) {
  const user = useSelector(storeState => storeState.userModule.user)

  const { openLogin } = useModal()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(
    user && gig.likedByUsers.includes(user._id)
  )

  useEffect(() => {
    setIsLiked(user && gig.likedByUsers.includes(user._id))
  }, [user, gig])

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
        liker => liker !== user._id
      )
      setIsLiked(false)

      gigService.save(gigToSave)
        .then(() => {
          onGigChange(gigToSave)
        })
    }
    else {
      gigToSave.likedByUsers.push(user._id)

      setIsLiked(true)

      gigService.save(gigToSave)
        .then(() => {
          onGigChange(gigToSave)
        })
    }
  }

  return (
    <div className="gig-navbar">
      <CatTagDisplayBar category={gig.category} tag={gig.tags[1]} />

      <div className="gig-interactions">
        <button className="heart" onClick={likeGig}>
          <img src={isLiked ? likedHeart : heart} title="liked the gig" />
        </button>

        <span>{gig.likedByUsers.length}</span>

        <button onClick={shareGig} className="share" title="share the gig">
          <img src={share} />
        </button>
      </div>
      {isModalOpen && <ShareGigModal onClose={closeModal} />}
    </div>
  )
}