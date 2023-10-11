import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { GigPreview } from './GigPreview.jsx'

import { gigBackendService } from '../services/gig.backend.service.js'

export function UserGigs({ user }) {
    const is = 'userProfile'
    
    const [gigs,setGigs]=useState([])

    useEffect(()=>{
        loadGigs()
    },[])

    async function loadGigs(){
        try{
            var gigs=await gigBackendService.query()
            gigs=gigs.filter((gig)=>{
                // console.log(gig)
                // console.log(user._id)
                if(gig.owner._id.localeCompare(user._id)===0){
                    return true
                } else {
                    return false
                }
            })
            setGigs(gigs)
        } catch (err){
            console.log('couldnt load gig : ',err)
        }
    }
    
    if (gigs.length === 0) return
    
    // console.log('gigs :',gigs)

    return (<section className="user-gigs">
        <div className='info-block title'>
            Active Gigs
        </div>
        <div className='info-block gig'>
            <Link to="/gig/edit" className="gig-creation-btn">
                <button>+</button>
                <span>Create a new Gig</span>
            </Link>
        </div>

        {gigs.map((gig) =>
            <div className='info-block' key={gig._id}>
                <GigPreview is={is} gig={gig} />
            </div>
        )}
    </section>)
}