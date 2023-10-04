import { Link } from 'react-router-dom'

export function UserGigs(){
    return (<section className="user-gigs">
            <div className='info-block title'>
                Active Gigs
            </div>
            <div className='info-block gig'>
                <Link to="editgig" className="gig-creation-btn">
                    <button>+</button>
                    <span>Create a new Gig</span>
                </Link>
            </div>
           </section>)
}