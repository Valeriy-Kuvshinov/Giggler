import icon from '../assets/img/svg/user.icon.svg'
import location from '../assets/img/svg/location.icon.svg'

export function UserInfo({ user }) {
    return (<section className='user-info'>
        <div className='info-block'>
            <img src={user.imgUrl} />
            <h2>{user.fullName}</h2>

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
    </section>
    )
}