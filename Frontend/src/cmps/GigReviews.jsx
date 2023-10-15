
import { useSelector } from 'react-redux'

import { GigReview } from "./GigReview.jsx"

import { gigService } from '../services/gig.service.js'

export function GigReviews({reviews,gig}) {
    
    const user = useSelector(storeState => storeState.userModule.user)
    // console.log(user)
    // if(reviews.length===0) return <div>no reviews?</div>

    function submitReview(){
        const userName=user.username
        const reviewText=document.getElementById('reviewText').value
        const reviewRating=document.getElementById('reviewRating').value
        const review={userName:userName,rating:reviewRating,text:reviewText}
        console.log(review)
        gigService.addReview(gig,review)
    }
    
    return (<section className="gig-reviews">

            <div className='review-addition'>
                <input type='text' placeholder="good service" id='reviewText' className='text'/>
                <input type='range' min={1} max={5} step={1} id='reviewRating'/>
                <button onClick={submitReview}>submit review</button>
            </div>

            {(reviews.length!==0) && <ul>
                {reviews.map((review)=>
                    <li key={review.id}>
                        <GigReview review={review}/>
                    </li>
                )}
            </ul>}

            </section>)
}