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
import { gigService } from '../services/gig.service.js'
import { UserChat } from '../cmps/UserChat.jsx'

export function GigDetails() {
  const params = useParams()
  const [gig, setGig] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900)
  const [chatState, setChatState] = useState(false)


  const user = useSelector((storeState) => storeState.userModule.watchedUser)

  useEffect(() => {
    fetchData()
  }, [params.id])

  async function fetchData() {
    try {
      const fetchedGig = await gigService.getById(params.id)
      setGig(fetchedGig)

      if (fetchedGig) await loadUser(fetchedGig.ownerId)
    } catch (err) {
      console.error('Error loading data:', err)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!gig || !user) return <Loader />

  return (
    <>
    <section className="gig-details grid layout-row">
      {isMobile ? (
        <>
          <main>
            <CatTagDisplayBar category={gig.category} tag={gig.tags[1]} />
            <GigDetailsHeader gig={gig} owner={user} />
            <GigDetailsAside gig={gig} onGigChange={(updatedGig) => setGig(updatedGig)} />
            <section className="about-gig" style={{ overflow: 'hidden' }}>
              <h3>About This Gig</h3>
              <p className='gig-description'>{gig.description}</p>
            </section>
            <AboutSeller owner={user} />
            <GigReviews gig={gig} />
          </main>
        </>
      ) : (
        <>
          <main>
            <CatTagDisplayBar category={gig.category} tag={gig.tags[1]} />
            <GigDetailsHeader gig={gig} owner={user} />
            <section className="about-gig" style={{ overflow: 'hidden' }}>
              <h3>About This Gig</h3>
              <p>{gig.description}</p>
            </section>
            <AboutSeller owner={user} />
            <GigReviews gig={gig} />
          </main>
          <GigDetailsAside gig={gig} onGigChange={(updatedGig) => setGig(updatedGig)} setChatState={setChatState}/>
        </>
      )}
    </section>
    <UserChat  owner={user} window={isMobile} chatState={chatState} setChatState={setChatState}/>
    </>
  )
}