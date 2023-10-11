import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { GigPreview } from './GigPreview.jsx'

export function UserGigs({ user }) {
    const is = 'userProfile'

    var gigs = useSelector(storeState => storeState.gigModule.gigs)
    gigs=gigs.filter((gig)=>gig.owner._id===user._id)

    if (gigs.length === 0) return

    // console.log(gigs)

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

        {gigs.map((gig) =>
            <div className='info-block' key={gig._id}>
                <GigPreview is={is} gig={gig} />
            </div>
        )}
    </section>)
}