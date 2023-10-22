import { useState } from "react"
import { updateUser } from "../store/user.actions.js"

export function UserEditModal({ user, closeModal }) {
    const [imgUrl, setImgUrl] = useState(user.imgUrl)

    function onChangeImage() {
        console.log('change image!')
    }

    async function onConfirmChange() {
        const updatedUser = { ...user, imgUrl }
        console.log('new user : ', updatedUser)
    
        await updateUser(updatedUser)
        closeModal()
    }

    return (
        <section className="user-modal">
            <span>profile picture: </span>
            <img onClick={onChangeImage} src={imgUrl} />

            <button onClick={onConfirmChange}>confirm change</button>
        </section>
    )
}