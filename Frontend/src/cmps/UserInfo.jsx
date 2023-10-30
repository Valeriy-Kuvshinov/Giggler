import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

import icon from "../assets/img/svg/user.icon.svg"
import location from "../assets/img/svg/location.icon.svg"

import { UserEditModal } from "./UserEditModal.jsx"
import { updateUser } from "../store/user.actions.js"
import SvgIcon from "./SvgIcon"
import { loadReviews } from "../store/review.actions"
import { utilService } from "../services/util.service"
import { loadOrders } from "../store/order.actions"

export function UserInfo({ user }) {
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  const [isModal, setModal] = useState(false)
  const [isEditing, setEditing] = useState(false)
  const [isEditingFullName, setIsEditingFullName] = useState(false)
  const [description, setDescription] = useState(user.description)
  const [fullName, setFullName] = useState(user.fullName)
  const reviews = useSelector((storeState) => storeState.reviewModule.reviews)
  const filteredReviews = user
    ? reviews.filter((review) => review.sellerId === user._id)
    : []

  useEffect(() => {
    loadReviews()
  }, [])

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const time = new Date(user.createdAt * 1000)
  let month = months[time.getMonth()]
  let year = time.getFullYear()
  let deliveredTime
  if(!user.lastDeliveredAt){
    deliveredTime=new Date(Date.now())
  } else {
    deliveredTime=new Date(user.lastDeliveredAt)
  }

  function loadModal() {
    if (loggedinUser._id !== user._id) {
      return
    }
    setModal(true)
  }

  function closeModal() {
    setModal(false)
  }

  function handleEditClick() {
    setEditing(true)
  }

  function handleFullNameEditClick() {
    setIsEditingFullName(true)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  function handleFullNameChange(e) {
    setFullName(e.target.value)
  }

  async function handleConfirmChange() {
    const updatedUser = { ...user, description, fullName }
    await updateUser(updatedUser)
    setEditing(false)
    setIsEditingFullName(false)
  }

  const renderStars = () => {
    let fullStarsCount = Math.floor(user.rating)
    const isHalfStar = user.rating % 1 >= 0.5

    const stars = [...Array(fullStarsCount)].map((_, idx) => (
      <SvgIcon iconName={'star'} key={utilService.makeId()}/>
    ))

    if (isHalfStar) {
      stars.push(<SvgIcon iconName={'halfstar'} key={utilService.makeId()}/>)
      fullStarsCount += 1
    }

    const emptyStarsCount = 5 - fullStarsCount
    for (let i = 0; i < emptyStarsCount; i++) {
      stars.push(
        <SvgIcon iconName={'emptystar'} key={utilService.makeId()}/>
      )
    }
    return stars
  }

  let userLevel=''
  if(user.level==='level 0') userLevel='newuser'
  if(user.level==='level 1') userLevel='level1'
  if(user.level==='level 2') userLevel='level2'
  if(user.level==='level 3') userLevel='topuser'

  return (
    <section className="user-info">
      <div className="info-block flex column">
        <div className="profile-picture">
        <img src={user.imgUrl} onClick={loadModal} />
        <SvgIcon iconName={userLevel}/>
        </div>

        <h2>
          {isEditingFullName && loggedinUser._id === user._id ? (
            <input
              type="text"
              style={{ padding: "0", border: "none", textAlign: "center" }}
              value={fullName}
              onChange={handleFullNameChange}
              onBlur={handleConfirmChange}
            />
          ) : (
            <span onClick={handleFullNameEditClick}>{user.fullName}</span>
          )}
        </h2>

        <span className="username">@{user.username}</span>

        <div className="stars">
          {renderStars()}
          <span className="rating">{user.rating}</span>
          <span className="review-count">({filteredReviews.length} reviews)</span>
        </div>

        <div className="location-and-time">
          <div className="info-line flex" onClick={loadModal}>
            <span className="data">
              <SvgIcon iconName={"location"} />
              <span>From</span>
            </span>
            <span className="bold">{user.country}</span>
          </div>

          <div className="info-line flex">
            <span className="data">
              <SvgIcon iconName={"user"} />
              <span>Member Since</span>
            </span>
            <span className="bold">
              {month.slice(0, 3)} {year}
            </span>
          </div>

          <div className="info-line flex">
            <span className="data">
              <SvgIcon iconName={"clock"} />
              <span>Avg. Response Time</span>
            </span>
            <span className="bold">
              {utilService.getRandomIntInclusive(2,12)} Hours
            </span>
          </div>

          <div className="info-line flex">
            <span className="data">
              <SvgIcon iconName={"airplaneIcon"} />
              <span>Last Delivery</span>
            </span>
            <span className="bold">
              {months[deliveredTime.getMonth()].slice(0, 3)} {deliveredTime.getFullYear()}
            </span>
          </div>
        </div>
      </div>

      <div className="info-block flex column">
        <h3>Description</h3>
        {isEditing && loggedinUser._id === user._id ? (
          <div>
            <textarea
              className="description-area"
              value={description}
              onChange={handleDescriptionChange}
              onBlur={handleConfirmChange}
            />
          </div>
        ) : (
          <p onClick={handleEditClick}>{description}</p>
        )}
      </div>

      {isModal && <UserEditModal user={user} closeModal={closeModal} />}
      {isModal && <div className="modal-background" onClick={closeModal}></div>}
    </section>
  )
}
