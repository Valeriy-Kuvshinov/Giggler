import { useState } from "react"
import { useSelector } from "react-redux"

import icon from "../assets/img/svg/user.icon.svg"
import location from "../assets/img/svg/location.icon.svg"

import { UserEditModal } from "./UserEditModal.jsx"
import { updateUser } from "../store/user.actions.js"

export function UserInfo({ user }) {
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  const [isModal, setModal] = useState(false)
  const [isEditing, setEditing] = useState(false)
  const [isEditingFullName, setIsEditingFullName] = useState(false)
  const [description, setDescription] = useState(user.description)
  const [fullName, setFullName] = useState(user.fullName)

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

  return (
    <section className="user-info">
      <div className="info-block flex column">
        <img src={user.imgUrl} onClick={loadModal} />

        <h2>
          {(isEditingFullName && loggedinUser._id === user._id) ? (
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

        <span className="username">{user.username}</span>

        <div className="location-and-time">
          <div className="info-line flex" onClick={loadModal}>
            <span>
              <img src={location} /> From
            </span>
            <span>Israel</span>
          </div>

          <div className="info-line flex">
            <span>
              <img src={icon} /> Member Since
            </span>
            <span>
              {month.slice(0, 3)} {year}
            </span>
          </div>
        </div>

      </div>

      <div className="info-block flex column">
        <h3>Description</h3>
        {(isEditing && loggedinUser._id === user._id) ? (
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
