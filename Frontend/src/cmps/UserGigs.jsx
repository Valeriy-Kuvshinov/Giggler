import seller from "../assets/img/svg/become.seller.icon.svg"

import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"

import { GigPreview } from "./GigPreview.jsx"
import { UserReviews } from "./UserReviews.jsx"

import { loadReviews } from "../store/review.actions.js"

export function UserGigs({ user, gigs }) {
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  const is = "userProfile"

  useEffect(() => {
    loadReviews()
  }, [])

  const userGigs = gigs.filter((gig) => gig.ownerId === user._id)

  if (!userGigs) return <div>No gigs yet, maybe create one ^_^</div>

  return (
    <section className="profile-content flex column">
      {gigs.length !== 0 && user._id !== loggedinUser._id && (
        <div className="title flex">{`${user.username}'s Gigs`}</div>
      )}

      {user._id === loggedinUser._id && (
        <div className="info-block gig seller">
          <Link
            to="/gig/edit"
            className={`gig-creation-btn ${gigs.length !== 0 ? "old" : ""}`}
          >
            <img src={seller} className="seller-img" />
            <span className="ready">
              {gigs.length !== 0
                ? "Ready to expand your customer base?"
                : "Ready to earn on your own terms?"}
            </span>
            <span className="become-seller">
              {gigs.length !== 0 ? "Create a new gig" : "Become a seller"}
            </span>
          </Link>
        </div>
      )}
      <div className="user-gigs">
        {gigs.length !== 0 &&
          userGigs.map((gig) => (
            <div key={gig._id}>
              <GigPreview is={is} gig={gig} />
            </div>
          ))}
      </div>
      <UserReviews gigs={userGigs} />
    </section>
  )
}