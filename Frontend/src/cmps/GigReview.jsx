import starIcon from '../assets/img/svg/star.icon.svg'

export function GigReview({review}){
    const rating=review.rating
    var stars = ''
    for (var i = 0; i < rating; i++) {
        stars += '<img src=/src/assets/img/svg/star.icon.svg />'
    }
    function load() {
        document.getElementById(`${review.id}`).innerHTML = stars + `${rating}` 
    }
    setTimeout(load, 10)
    return (<section className="gig-review">
            <span>{review.userName}</span>
            <p className={`stars3`} id={review.id}>{rating}</p>
            <span>{review.text}</span>
            </section>)
}