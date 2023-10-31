import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { GigDetailsHeader } from '../cmps/GigDetailsHeader.jsx'
import { AboutSeller } from '../cmps/AboutSeller.jsx'
import { GigDetailsAside } from '../cmps/GigDetailsAside.jsx'
import { GigReviews } from '../cmps/GigReviews.jsx'
import { CatTagDisplayBar } from '../cmps/CatTagDisplayBar.jsx'
import { Loader } from '../cmps/Loader.jsx'

import { loadUser } from '../store/user.actions.js'
import { loadReviews } from '../store/review.actions.js'

import { gigService } from '../services/gig.service.js'

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

  useEffect(() => {
    fetchData()
  }, [params.id])

  async function fetchData() {
    try {
      const fetchedGig = await gigService.getById(params.id)
      setGig(fetchedGig)
      await loadReviews()

      if (fetchedGig) await loadUser(fetchedGig.ownerId)
    } catch (err) {
      console.error('Error loading data:', err)
    }
  }
  if (!gig || !user) return <Loader />

  return (
    <section className="gig-details grid layout-row">
      <main>
        <CatTagDisplayBar category={gig.category} tag={gig.tags[1]} />

        <GigDetailsHeader gig={gig} owner={user} />

        <section style={{ overflow: 'hidden' }}>
          <h3>About This Gig</h3>
          <p>{gig.description}</p>
        </section>

        <AboutSeller owner={user} />

        <GigReviews reviews={filteredReviewIds} gig={gig} />
      </main>

      <GigDetailsAside
        gig={gig}
        onGigChange={(updatedGig) => setGig(updatedGig)}
      />
    </section>
  )
}