import icon from '../assets/img/svg/user.icon.svg'
import location from '../assets/img/svg/location.icon.svg'
import { UserEditModal } from './UserEditModal'

export function UserInfo({ user }) {

    function onChangeUserInfo(){

    }

    return (<section className='user-info'>
        <div className='info-block'>
            <img src={user.imgUrl} />
            <h2 onClick={onChangeUserInfo}>{user.fullName}</h2>

            <div className='into-line'>
                <span><img src={location} /> Country</span>
                <span>Israel</span>
            </div>

            <div className='into-line'>
                <span><img src={icon} /> Member Since</span>
                <span>May 42069</span>
            </div>
        </div>
        <div className='info-block'>
            <h3>Description</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Sint voluptatum eius architecto assumenda, quaerat a.
                Beatae consequuntur possimus iste,pariatur hic impedit at modi,
                rem quam velit debitis. Fugiat, magni!</p>
        </div>

        <UserEditModal user={user}/>
    </section>
    )
}