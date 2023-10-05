import { Link } from 'react-router-dom'
import { GigPreview } from './GigPreview'

export function UserGigs({ gigs }) {
    const is = 'userProfile'
    if (gigs.length === 0) return

    return (<section className="user-gigs">
        <div className='info-block title'>
            Active Gigs
        </div>
        <div className='info-block gig'>
            <Link to="/gig/edit" className="gig-creation-btn">
                <button>+</button>
                <span>Create a new Gig</span>
            </Link>
        </div>
<<<<<<< HEAD
        
        {gigs.map((gig) => <GigPreview gig={gig} />)}

=======

        {gigs.map((gig) => 
        <div className='info-block '>
        <GigPreview is={is} gig={gig} />
        </div>     
        )}
>>>>>>> e760d6fa0afaabd50721191e8f1915e7201c6b61
    </section>)
}
