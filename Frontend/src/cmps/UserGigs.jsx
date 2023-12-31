
import { Link } from "react-router-dom"
import { useEffect } from "react"

import { GigPreview } from "./GigPreview.jsx"
import { UserReviews } from "./UserReviews.jsx"

import { loadReviews } from "../store/review.actions.js"
import SvgIcon from "./SvgIcon.jsx"

export function UserGigs({ watchedUser, loggedinUser, gigs }) {
  const isFrom = "userProfile"

  useEffect(() => {
    loadReviews()
  }, [])

  const userGigs = gigs.filter((gig) => gig.ownerId === watchedUser._id)

  return (
    <section className="profile-content flex column">
      {gigs.length !== 0 && watchedUser._id !== loggedinUser?._id && (
        <div className="title flex">{`${watchedUser.username}'s Gigs`}</div>
      )}

      {watchedUser._id === loggedinUser?._id && (
        <div className="info-block gig seller" title="create a new gig">
          <Link
            to="/gig/edit"
            className={`gig-creation-btn ${gigs.length !== 0 ? "old" : ""}`}
          >
            <SvgIcon iconName="becomeseller" />
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
              <GigPreview isFrom={isFrom} gig={gig} />
            </div>
          ))}
      </div>
      <UserReviews gigs={userGigs} />
    </section>
  )
}