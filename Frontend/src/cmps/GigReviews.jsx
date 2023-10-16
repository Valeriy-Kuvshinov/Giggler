import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { GigReview } from "./GigReview.jsx"
import { userService } from '../services/user.service.js'
import { reviewService } from '../services/review.service.js'

export function GigReviews({ reviews, gig }) {
    const [fullReviews, setFullReviews] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(1);
    const user = useSelector(storeState => storeState.userModule.user);

    useEffect(() => {
        const fetchFullReviews = async () => {
            const fetchedReviews = await Promise.all(reviews.map(reviewId => reviewService.getById(reviewId)));
            console.log('correct reviews ',fetchedReviews)
            const reviewsWithUser = await Promise.all(fetchedReviews.map(async review => {
                const user = await userService.getById(review.userId);
                return {
                    ...review,
                    userName: user.username,
                    imgUrl: user.imgUrl
                }
            }));
            setFullReviews(reviewsWithUser);
        };
        fetchFullReviews();
    }, [
        // reviews
    ]);

    const submitReview = async () => {
        const review = {
            userId: user._id,
            gigId: gig._id,
            rating: reviewRating,
            text: reviewText
        };
        console.log('review to add ',review)
        await reviewService.addReview(review);
        setReviewText('');
        setReviewRating(1);
        const updatedReviews = [...reviews, review._id];
        setFullReviews(updatedReviews);
    };

    console.log('fullReviews ',fullReviews)
    if(fullReviews.length===0) return

    return (
        <section className="gig-reviews">
            <div className='review-addition'>
                <input
                    type='text'
                    placeholder="good service"
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                    className='text'
                />
                <input
                    type='range'
                    min={1}
                    max={5}
                    step={1}
                    value={reviewRating}
                    onChange={e => setReviewRating(e.target.value)}
                />
                <button onClick={submitReview}>submit review</button>
            </div>

            {(fullReviews.length !== 0) && <ul>
                {fullReviews.map((review) =>
                    <li key={review._id}>
                        <GigReview review={review} />
                    </li>
                )}
            </ul>}
        </section>
    );
}