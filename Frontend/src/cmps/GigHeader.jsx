
export function GigHeader({ gig }) {
    const rating = gig.owner.rate
    var stars = ''
    for (var i = 0; i < rating; i++) {
        stars += '<img src=/src/assets/img/svg/star.icon.svg />'
    }
    function load() {
        document.querySelector(".stars").innerHTML = stars + `${rating}` + `(${gig.likedByUsers.length})`
    }
    setTimeout(load, 10)
    return (
        <section style={{ overflow: 'hidden' }} className="gig-header">
            <h2>{gig.title}</h2>
            <div className="rating">
                <img className='seller-picture' src={gig.owner.imgUrl} />
                <p>{gig.owner.fullName}</p>
                |
                <p className="stars">
                </p>
            </div>
            <img src={gig.imgUrls[0]} />
            <div className='gig-images'>
                {/* {gig.imgUrls.map((image)=>{
                <img src={`${image}`}/>
            })} */}
                <img src={gig.imgUrls[0]} />
                <img src={gig.imgUrls[1]} />
                <img src={gig.imgUrls[2]} />
                <img src={gig.imgUrls[3]} />
                <img src={gig.imgUrls[4]} />
            </div>
        </section>)
}