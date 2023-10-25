import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { GigDetailsHeader } from "../cmps/GigDetailsHeader.jsx"
import { AboutSeller } from "../cmps/AboutSeller.jsx"
import { GigOrder } from "../cmps/GigOrder.jsx"
import { GigReviews } from "../cmps/GigReviews.jsx"
import { GigNavbar } from "../cmps/GigNavbar.jsx"
import { CatTagDisplayBar } from "../cmps/CatTagDisplayBar.jsx"

import { loadUser } from "../store/user.actions.js"
import { loadReviews } from "../store/review.actions.js"
import { gigService } from "../services/gig.service.js"

export function GigDetails() {
  const params = useParams()
  const [gig, setGig] = useState(null)
  const user = useSelector((storeState) => storeState.userModule.watchedUser)
  const reviews = useSelector((storeState) => storeState.reviewModule.reviews)
  const filteredReviewIds = gig
    ? reviews
        .filter((review) => review.gigId === gig._id)
        .map((review) => review._id)
    : []
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedGig = await gigService.getById(params.id)
        setGig(fetchedGig)

        await loadReviews()

        if (user === null && fetchedGig) await loadUser(fetchedGig.ownerId)
      } catch (err) {
        console.error("Error loading data:", err)
      }
    }
    fetchData()
  }, [params.id, user])

  if (!gig || !user) return <h1>loading...</h1>

  return (
    <section className="gig-details layout-row">
      {windowWidth >= 720 && (
        <section>
          {/* <GigNavbar
            gig={gig}
            onGigChange={(updatedGig) => setGig(updatedGig)}
          /> */}

          <section className="gig">
            <div className="gig-info">
              <CatTagDisplayBar category={gig.category} tag={gig.tags[1]} />

              <GigDetailsHeader gig={gig} owner={user} />

              <section style={{ overflow: "hidden" }}>
                <h3>About This Gig</h3>
                <p>{gig.description}</p>
              </section>

              <AboutSeller owner={user} />

              <GigReviews reviews={filteredReviewIds} gig={gig} />
            </div>

            <GigOrder
              gig={gig}
              onGigChange={(updatedGig) => setGig(updatedGig)}
            />
          </section>
        </section>
      )}
      {windowWidth <= 720 && (
        <section>
          {/* <GigNavbar
            gig={gig}
            onGigChange={(updatedGig) => setGig(updatedGig)}
          /> */}

          <section className="gig">
            <div className="gig-info">
              <CatTagDisplayBar category={gig.category} tag={gig.tags[1]} />

              <GigDetailsHeader gig={gig} owner={user} />

              <section style={{ overflow: "hidden" }}>
                <h3>About This Gig</h3>
                <p>{gig.description}</p>
                <GigOrder
                  gig={gig}
                  onGigChange={(updatedGig) => setGig(updatedGig)}
                />
              </section>

              <AboutSeller owner={user} />

              <GigReviews reviews={filteredReviewIds} gig={gig} />
            </div>
          </section>
        </section>
      )}
    </section>
  )
}
