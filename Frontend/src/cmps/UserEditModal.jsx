import { userService } from "../services/user.service"

export function UserEditModal({user , closeModal}){

    // console.log(user)

    function loadInfo(){
        document.getElementById('fullname').value=user.fullName
        document.getElementById('description').value=user.description
    }

    function onChangeImage(){
        console.log('change image!')
    }

    function onConfirmChange(){
        const fullName=document.getElementById('fullname').value
        const description=document.getElementById('description').value
        const imageUrl=document.getElementById('profilePicture').src
        const newUser={...user,fullName:fullName,description:description,imageUrl:imageUrl}
        console.log('new user : ',newUser)
        console.log('user changed')
    }

    setTimeout(loadInfo,1)

    return (<section className="user-modal">
                <span>profile picture: </span>
                <img onClick={onChangeImage} id="profilePicture" src={user.imgUrl}/>
                <span>full name: </span>
                <input type="text" id="fullname"/>
                <span>description: </span>
                <input type="text" id="description"/>
                <button onClick={onConfirmChange}>confirm change</button>
           </section>)
}