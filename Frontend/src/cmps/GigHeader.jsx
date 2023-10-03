
import star from "../assets/img/svg/star.icon.svg"
import cat from "../assets/img/cat.jpg"
import catto from "../assets/img/catto.avif"

export function GigHeader(){
    return (
        <section className="gig-header">
        <h2>its a good gig</h2>
        <div className="rating">
            <img className='catto' src={catto}/>
            <p>Roei</p>
            |
            <p>
                <img src={star}/>
                <img src={star}/>
                <img src={star}/>
                <img src={star}/>
                <img src={star}/>
                5
                (420)
            </p>
        </div>
        <img src={cat}/>
        <div className='gig-images'>
           <img src={cat}/>
           <img src={cat}/>
           <img src={cat}/>
           <img src={cat}/>
           <img src={cat}/>
        </div>
        </section>)
}