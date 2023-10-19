import heart from '../assets/img/svg/heart.icon.svg'
import share from '../assets/img/svg/share.icon.svg'
import { CatTagDisplayBar } from './CatTagDisplayBar'

export function GigNavbar({gig , user}){
    // console.log('gig ',gig)
    // console.log('loggedin ',user)
    function shareGig(){
        console.log('share')
    }

    function likeGig(){
        console.log('like')
    }
    return (<div className='gig-navbar'>
            <CatTagDisplayBar category={gig.category} tag={gig.tags[1]}/>
            <div className='gig-interactions'>
                <img onClick={likeGig} src={heart}/>
                <span>{gig.likedByUsers.length}</span>
                <div>
                <img onClick={shareGig} className='share' src={share}/>
                </div>
            </div>
            </div>)
}