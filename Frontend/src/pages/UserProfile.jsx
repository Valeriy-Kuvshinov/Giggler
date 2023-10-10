import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { UserGigs } from '../cmps/UserGigs.jsx'
import { UserInfo } from '../cmps/UserInfo.jsx'
import { UserOrders } from '../cmps/UserOrders.jsx'

import { loadGigs } from '../store/gig.actions.js'

export function UserProfile() {
  const user = useSelector(storeState => storeState.userModule.user)
  const gigs = useSelector(storeState => storeState.gigModule.gigs)
  const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)

  useEffect(() => {
    try {
      loadsGigs()
    }
    catch (err) {
      console.log('Oops.. something went wrong fetching gigs, try again', err)
    }
  }, [filterBy])

  async function loadsGigs() {
    await loadGigs(filterBy)
  }

  return (
    <section className="main-container full">
      <div className="user-profile">
        <UserInfo user={user} />
        <UserGigs gigs={gigs} user={user} />
      </div>
      <UserOrders user={user} />
    </section>
  )
}