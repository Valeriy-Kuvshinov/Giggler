import icon from "../assets/img/svg/user.icon.svg"
import location from "../assets/img/svg/location.icon.svg"
import { UserEditModal } from "./UserEditModal"
import { useState } from "react"

export function UserInfo({ user }) {

  const [isModal,setModal]=useState(false)

  function loadModal(){
    setModal(true)
  }
  function closeModal(){
    setModal(false)
  }

  // console.log(user)

  return (
    <section className="user-info">
      <div className="info-block">
        <img src={user.imgUrl} onClick={loadModal}/>
        <h2 onClick={loadModal}>{user.fullName}</h2>

        <div className="into-line" onClick={loadModal}>
          <span>
            <img src={location} /> Country
          </span>
          <span>Israel</span>
        </div>

        <div className="into-line">
          <span>
            <img src={icon} /> Member Since
          </span>
          <span>May 42069</span>
        </div>
      </div>
      <div className="info-block" onClick={loadModal}>
        <h3>Description</h3>
        <p>
          {user.description}
        </p>
      </div>

      {isModal && <UserEditModal user={user} closeModal={closeModal}/>}
      {isModal && <div className="modal-background" onClick={closeModal}></div>}

    </section>
  )
}
