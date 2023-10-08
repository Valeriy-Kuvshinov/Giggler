import { GigReview } from "./GigReview.jsx"

export function GigReviews({reviews}) {
    
    return (<section className="gig-reviews">

            <ul>
                {reviews.map((review)=>
                    <li key={review.id}>
                        <GigReview review={review}/>
                    </li>
                )}
            </ul>

            </section>)
}