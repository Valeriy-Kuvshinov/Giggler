import { Link } from 'react-router-dom'

import { GigPreview } from './GigPreview.jsx'

export function UserGigs({ user, gigs }) {
    const is = 'userProfile'

    if (!gigs || gigs.length === 0) return <div>No gigs yet, maybe create one ^_^</div>

    const userGigs = gigs.filter(gig => gig.ownerId === user._id)

    return (
        <section className="user-gigs">
            <div className='info-block title'>
                Active Gigs
            </div>
            <div className='info-block gig'>
                <Link to="/gig/edit" className="gig-creation-btn">
                    <button>+</button>
                    <span>Create a new Gig</span>
                </Link>
            </div>

            {userGigs.map(gig => (
                <div className='info-block' key={gig._id}>
                    <GigPreview is={is} gig={gig} />
                </div>
            ))}
        </section>
    )
}