import heart from "../assets/img/svg/heart.icon.svg"
import likedHeart from "../assets/img/svg/liked.heart.icon.svg"
import share from "../assets/img/svg/share.icon.svg"

import { useSelector } from 'react-redux'

import { CatTagDisplayBar } from "./CatTagDisplayBar"

import { gigService } from "../services/gig.service"

export function GigNavbar({ gig }) {

  const user2 = useSelector(storeState => storeState.userModule.user)
  const isLiked=((gig.likedByUsers.findIndex(liked => liked===user2._id))!==-1) ? true : false
  console.log('isLiked ',isLiked)
  // console.log('loggedin ',user2)

  function shareGig() {
    console.log("share")
  }

  function likeGig() {
    const gigToSave={...gig}
    if(gigToSave.likedByUsers.findIndex(gig=>gig===user2._id)!==-1){
        var likedByUsers=[...gigToSave.likedByUsers]
        likedByUsers=likedByUsers.filter(liker => liker!== user2._id)
        gigToSave.likedByUsers=[...likedByUsers]
        gigService.save(gigToSave)
        console.log("unlike")
    } else {
        gigToSave.likedByUsers.push(user2._id)
        gigService.save(gigToSave)
        console.log("like")
    }
  }
  return (
    <div className="gig-navbar">
      <CatTagDisplayBar category={gig.category} tag={gig.tags[1]} />
      <div className="gig-interactions">
        <button onClick={likeGig}>
          <img src={(isLiked)?likedHeart:heart} title="liked the gig"/>
        </button>
        <span>{gig.likedByUsers.length}</span>
        <button onClick={shareGig} className="share" title="share the gig">
          <img src={share} />
        </button>
      </div>
    </div>
  )
}
