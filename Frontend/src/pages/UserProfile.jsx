import { useSelector } from 'react-redux'
import { useState , useEffect } from 'react'

import { UserGigs } from '../cmps/UserGigs.jsx'
import { UserInfo } from '../cmps/UserInfo.jsx'
import { UserOrders } from '../cmps/UserOrders.jsx'

import { userService } from '../services/user.service.js'
import { gigBackendService } from '../services/gig.backend.service.js'

export function UserProfile() {
  const [user,setUser]=useState(null)
  const [gigs,setGigs]=useState([])
  // const user = useSelector(storeState => storeState.userModule.user)
  // const gigs = useSelector(storeState => storeState.gigModule.gigs)

  useEffect(()=>{
    loadGigs()
    loadUser()
  },[])

  async function loadGigs(){
    try{
      const gigs= await gigBackendService.query()
      setGigs(gigs)
    } catch (err){
      console.log('couldnt load gigs : ',err)
    }
  }

  async function loadUser(){
    try{
      const user= await userService.getLoggedinUser()
      setUser(user)
    } catch (err){
      console.log('couldnt load user : ',err)
    }
  }
  
  // console.log(user)
  // console.log(gigs)
  
  if(user===null||gigs===null) return <div>loading...</div>
  

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