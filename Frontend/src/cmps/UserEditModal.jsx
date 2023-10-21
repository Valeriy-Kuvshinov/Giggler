import { userService } from "../services/user.service"
import { loadUser } from "../store/user.actions"

export function UserEditModal({ user, closeModal }) {
    function loadInfo() {
        document.getElementById('fullname').value = user.fullName
        document.getElementById('description').value = user.description
    }

    function onChangeImage() {
        console.log('change image!')
    }

    function onConfirmChange() {
        const fullName = document.getElementById('fullname').value
        const description = document.getElementById('description').value
        const imgUrl = document.getElementById('profilePicture').src
        const newUser = { ...user, fullName: fullName, description: description, imgUrl: imgUrl }
        console.log('new user : ', newUser)
        console.log('user changed')
        loadUser(newUser._id)
        userService.updateUser(newUser)
        closeModal()
    }

    setTimeout(loadInfo, 1)

    return (<section className="user-modal">
        <span>profile picture: </span>
        <img onClick={onChangeImage} id="profilePicture" src={user.imgUrl} />
        <span>full name: </span>
        <input type="text" id="fullname" />
        <span>description: </span>
        <input type="text" id="description" />
        <button onClick={onConfirmChange}>confirm change</button>
    </section>)
}