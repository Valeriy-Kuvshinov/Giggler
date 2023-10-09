import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { GigPreview } from './GigPreview.jsx'

import { gigService } from '../services/gig.service.local.js'

export function UserGigs({ user }) {
    const is = 'userProfile'
    const [gigs, setGigs] = useState([])

    useEffect(() => {
        gigService.query({ userId: user._id }).then((gigs) => setGigs(gigs))
    }, [])

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

        {gigs.map((gig) =>
            <div className='info-block' key={gig._id}>
                <GigPreview is={is} gig={gig} />
            </div>
        )}
    </section>)
}