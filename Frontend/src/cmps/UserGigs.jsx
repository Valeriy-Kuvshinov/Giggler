import { Link } from 'react-router-dom'

import { GigPreview } from './GigPreview.jsx'

import seller from '../assets/img/svg/become.seller.icon.svg'

export function UserGigs({ user, gigs }) {
    const is = 'userProfile'

    if (!gigs) return <div>No gigs yet, maybe create one ^_^</div>

    const userGigs = gigs.filter(gig => gig.ownerId === user._id)

    return (
        <section className="user-gigs flex column">
            <div className="info-block title flex">
                Active Gigs
            </div>

            {(gigs.length === 0) && <div className="info-block gig seller">
                <Link to="/gig/edit" className="gig-creation-btn">
                    <img src={seller} />
                    <span>Become A Seller</span>
                </Link>
            </div>
            }
            <div className="the-gigs">
                {(gigs.length !== 0) && <div className="info-block flex gig">
                    <Link to="/gig/edit" className="gig-creation-btn">
                        <button>+</button>
                        <span>Create a new Gig</span>
                    </Link>
                </div>}

                {(gigs.length !== 0) && (userGigs.map(gig => (
                    <div className="info-block flex" key={gig._id}>
                        <GigPreview is={is} gig={gig} />
                    </div>
                )))}
            </div>
        </section>
    )
}