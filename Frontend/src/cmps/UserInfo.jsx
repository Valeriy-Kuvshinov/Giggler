import { useState } from "react"

import icon from "../assets/img/svg/user.icon.svg"
import location from "../assets/img/svg/location.icon.svg"

import { UserEditModal } from "./UserEditModal.jsx"
import { updateUser } from "../store/user.actions.js"

export function UserInfo({ user }) {
  const [isModal, setModal] = useState(false)
  const [isEditing, setEditing] = useState(false)
  const [isEditingFullName, setIsEditingFullName] = useState(false)
  const [description, setDescription] = useState(user.description)
  const [fullName, setFullName] = useState(user.fullName)

  function loadModal() {
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
      <div className="info-block">
        <img src={user.imgUrl} onClick={loadModal} />

        <h2>
          {isEditingFullName ? (
            <input
              type="text"
              style={{ padding: '0', border: 'none', textAlign: 'center' }}
              value={fullName}
              onChange={handleFullNameChange}
              onBlur={handleConfirmChange}
            />
          ) : (
            <span onClick={handleFullNameEditClick}>{user.fullName}</span>
          )}
        </h2>

        <div className="info-line" onClick={loadModal}>
          <span>
            <img src={location} /> Country
          </span>
          <span>Israel</span>
        </div>

        <div className="info-line">
          <span>
            <img src={icon} /> Member Since
          </span>
          <span>May 42069</span>
        </div>
      </div>

      <div className="info-block">
        <h3>Description</h3>
        {isEditing ? (
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