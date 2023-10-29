import seller from '../assets/img/svg/become.seller.icon.svg'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { GigPreview } from './GigPreview.jsx'

import { UserReviews } from './UserReviews.jsx'

import { loadReviews } from '../store/review.actions'

export function UserGigs({ user, gigs }) {
    const loggedinUser = useSelector((storeState) => storeState.userModule.user)
    const is = 'userProfile'
    const reviews = useSelector((storeState) => storeState.reviewModule.reviews)
    const filteredReviews = user
      ? reviews.filter((review) => review.sellerId === user._id)
      : []
  
    if (!gigs) return <div>No gigs yet, maybe create one ^_^</div>

    useEffect(() => {
        loadReviews()
    }, [])

    // gigs=[]

    const userGigs = gigs.filter(gig => gig.ownerId === user._id)

    console.log(loggedinUser)
    console.log(user)

    return (
        <section className="user-gigs flex column">
            {gigs.length !== 0 && <div className="title flex">
                {(user._id === loggedinUser._id) ? 'Your' : user.fullName } Gigs
            </div>}

            {(gigs.length === 0) && <div className="info-block gig seller">
                <Link to="/gig/edit" className="gig-creation-btn">
                    <img src={seller} className='seller-img'/>
                    <span className='ready'>Ready to earn on your own terms?</span>
                    <span className='become-seller'>Become a seller</span>
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
            
          <UserReviews user={user} reviews={filteredReviews} />
        </section>
    )
}