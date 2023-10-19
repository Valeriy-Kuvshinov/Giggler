import heart from "../assets/img/svg/heart.icon.svg"
import share from "../assets/img/svg/share.icon.svg"
import { CatTagDisplayBar } from "./CatTagDisplayBar"

import { gigService } from "../services/gig.service"

export function GigNavbar({ gig, user }) {
  // console.log('gig ',gig)
  // console.log('loggedin ',user)
  function shareGig() {
    console.log("share")
  }

  function likeGig() {
    const gigToSave={...gig}
    if(gigToSave.likedByUsers.findIndex(gig=>gig===user._id)!==-1){
        var likedByUsers=[...gigToSave.likedByUsers]
        likedByUsers=likedByUsers.filter(liker => liker!== user._id)
        gigToSave.likedByUsers=[...likedByUsers]
        gigService.save(gigToSave)
        console.log("unlike")
    } else {
        gigToSave.likedByUsers.push(user._id)
        gigService.save(gigToSave)
        console.log("like")
    }
  }
  return (
    <div className="gig-navbar">
      <CatTagDisplayBar category={gig.category} tag={gig.tags[1]} />
      <div className="gig-interactions">
        <button onClick={likeGig}>
          <img src={heart} title="liked the gig" />
        </button>
        <span>{gig.likedByUsers.length}</span>
        <button onClick={shareGig} className="share" title="share the gig">
          <img src={share} />
        </button>
      </div>
    </div>
  )
}
