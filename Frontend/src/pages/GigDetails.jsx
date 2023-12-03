import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useModal } from '../customHooks/ModalContext.jsx'
import { useDeviceType } from '../customHooks/DeviceTypeContext.jsx'

import { GigDetHeader } from '../cmps/gigDetailsCmps/GigDetHeader.jsx'
import { AboutSeller } from '../cmps/gigDetailsCmps/AboutSeller.jsx'
import { AboutGig } from '../cmps/gigDetailsCmps/AboutGig.jsx'
import { GigDetAside } from '../cmps/gigDetailsCmps/GigDetAside.jsx'
import { GigDetInteractions } from '../cmps/gigDetailsCmps/GigDetInteractions.jsx'
import { ChatBubble } from '../cmps/gigDetailsCmps/ChatBubble.jsx'

import { GigReviews } from '../cmps/GigReviews.jsx'
import { CatTagDisplayBar } from '../cmps/CatTagDisplayBar.jsx'
import { Loader } from '../cmps/Loader.jsx'
import { UserChat } from '../cmps/UserChat.jsx'

import { loadUser } from '../store/user.actions.js'
import { gigService } from '../services/gig.service.js'

export function GigDetails() {
  const [gig, setGig] = useState(null)
  const [gigOwner, setGigOwner] = useState(null)
  const [chatState, setChatState] = useState(false)

  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()
  const { id } = useParams()
  const { openLogin } = useModal()
  const deviceType = useDeviceType()

  useEffect(() => {
    if (!id || id.length !== 24) {
      navigate('/explore')
      return
    }
    async function loadData() {
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

  const handleOpenChat = () => {
    if (loggedInUser) setChatState(true)
    else openLogin()
  }

  if (!gig || !gigOwner) return <Loader />

  return (
    <>
      {deviceType === 'mobile' ? (
        <section className="gig-details grid full layout-row">
          <main>
            <GigDetInteractions
              gig={gig}
              loggedInUser={loggedInUser}
              deviceType={deviceType}
              onGigChange={(updatedGig) => setGig(updatedGig)}
            />
            <GigDetHeader
              gig={gig}
              owner={gigOwner}
              deviceType={deviceType}
            />
            <AboutGig gig={gig} deviceType={deviceType} />
            <GigDetAside
              gig={gig}
              loggedInUser={loggedInUser}
              deviceType={deviceType}
              onGigChange={(updatedGig) => setGig(updatedGig)}
              setChatState={setChatState}
            />
            <GigReviews gig={gig} />
          </main>
        </section>
      ) : deviceType === 'tablet' || deviceType === 'mini-tablet' ? (
        <section className="gig-details grid layout-row">
          <main>
            <CatTagDisplayBar
              isFrom={'gigDetails'}
              category={gig.category}
              tag={gig.tags[1]}
            />
            <GigDetHeader
              gig={gig}
              owner={gigOwner}
              deviceType={deviceType}
            />
            <GigDetAside
              gig={gig}
              loggedInUser={loggedInUser}
              onGigChange={(updatedGig) => setGig(updatedGig)}
              setChatState={setChatState}
            />
            <AboutGig gig={gig} deviceType={deviceType} />
            <AboutSeller owner={gigOwner} />
            <GigReviews gig={gig} />
          </main>
        </section>
      ) : (
        <section className="gig-details grid layout-row">
          <main>
            <CatTagDisplayBar
              isFrom={'gigDetails'}
              category={gig.category}
              tag={gig.tags[1]} />
            <GigDetHeader
              gig={gig}
              owner={gigOwner}
              deviceType={deviceType}
            />
            <AboutGig gig={gig} deviceType={deviceType} />
            <AboutSeller owner={gigOwner} />
            <GigReviews gig={gig} />
          </main>
          <GigDetAside
            gig={gig}
            loggedInUser={loggedInUser}
            deviceType={deviceType}
            onGigChange={(updatedGig) => setGig(updatedGig)}
            setChatState={setChatState}
          />
        </section>
      )}
      <ChatBubble
        gigOwner={gigOwner}
        deviceType={deviceType}
        handleOpenChat={handleOpenChat} />
      {chatState && (
        <UserChat
          owner={gigOwner}
          chatState={chatState}
          setChatState={setChatState}
          buyer={null}
          gig={gig}
        />
      )}
    </>
  )
}