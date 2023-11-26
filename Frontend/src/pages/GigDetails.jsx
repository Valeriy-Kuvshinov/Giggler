import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useModal } from '../customHooks/ModalContext.jsx'

import { GigDetailsHeader } from '../cmps/GigDetailsHeader.jsx'
import { AboutSeller } from '../cmps/AboutSeller.jsx'
import { GigDetailsAside } from '../cmps/GigDetailsAside.jsx'
import { GigReviews } from '../cmps/GigReviews.jsx'
import { CatTagDisplayBar } from '../cmps/CatTagDisplayBar.jsx'
import { Loader } from '../cmps/Loader.jsx'
import { UserChat } from '../cmps/UserChat.jsx'

import { loadUser } from '../store/user.actions.js'
import { gigService } from '../services/gig.service.js'

export function GigDetails() {
  const [gig, setGig] = useState(null)
  const [gigOwner, setGigOwner] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900)
  const [chatState, setChatState] = useState(false)

  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()
  const { id } = useParams()
  const { openLogin } = useModal()

  useEffect(() => {
    if (!id || id.length !== 24) {
      navigate('/explore')
      return
    }
    const loadData = async () => {
      try {
        const fetchedGig = await gigService.getById(id)
        setGig(fetchedGig)

        if (fetchedGig) {
          const owner = await loadUser(fetchedGig.ownerId)
          setGigOwner(owner)
        }
      } catch (err) {
        console.error("Error loading gig: ", err)
      }
    }
    loadData()
  }, [id, navigate])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleOpenChat = () => {
    if (loggedInUser) setChatState(true)
    else openLogin()
  }

  if (!gig || !gigOwner) return <Loader />

  return (
    <>
      <section className="gig-details grid layout-row">
        {isMobile ? (
          <>
            <main>
              <CatTagDisplayBar
                isFrom={'gigDetails'}
                category={gig.category}
                tag={gig.tags[1]}
              />
              <GigDetailsHeader gig={gig} owner={gigOwner} />
              <GigDetailsAside
                gig={gig}
                loggedInUser={loggedInUser}
                onGigChange={(updatedGig) => setGig(updatedGig)}
                setChatState={setChatState}
              />
              <section className="about-gig" style={{ overflow: 'hidden' }}>
                <h3>About This Gig</h3>
                <p className="gig-description">{gig.description}</p>
              </section>
              <AboutSeller owner={gigOwner} />
              <GigReviews gig={gig} />
            </main>
          </>
        ) : (
          <>
            <main>
              <CatTagDisplayBar isFrom={'gigDetails'} category={gig.category} tag={gig.tags[1]} />
              <GigDetailsHeader gig={gig} owner={gigOwner} />
              <section className="about-gig" style={{ overflow: 'hidden' }}>
                <h3>About This Gig</h3>
                <p>{gig.description}</p>
              </section>
              <AboutSeller owner={gigOwner} />
              <GigReviews gig={gig} />
            </main>
            <GigDetailsAside
              gig={gig}
              loggedInUser={loggedInUser}
              onGigChange={(updatedGig) => setGig(updatedGig)}
              setChatState={setChatState}
            />
          </>
        )}
      </section>
      <section
        onClick={handleOpenChat}
        className="mini-message-bar"
      >
        <div className="mini-message-bar-container grid">
          <div
            style={{
              height: isMobile ? '32px' : '48px',
              width: isMobile ? '32px' : '48px',
            }}
            className="avatar"
          >
            <img src={gigOwner.imgUrl} alt={gigOwner.username} />
            <span
              style={{
                height: isMobile ? '.65em' : '1em',
                width: isMobile ? '.65em' : '1em',
              }}
              className="status-dot"
            ></span>
          </div>
          <div className="owner-info flex column">
            <span className="message">{`Message${isMobile ? '' : ` ${gigOwner.fullName}`
              }`}</span>
            {!isMobile && (
              <span className="response-time flex">
                <span>Online</span>
                <span className="dot flex"></span>
                <span>
                  Avg. response time: <span className="b">1 Hour</span>
                </span>
              </span>
            )}
          </div>
        </div>
      </section>
      {chatState && (
        <UserChat
          owner={gigOwner}
          chatState={chatState}
          setChatState={setChatState}
        />
      )}
    </>
  )
}