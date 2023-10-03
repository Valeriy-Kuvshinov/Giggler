
import star from "../assets/img/svg/star.icon.svg"
import catto from "../assets/img/catto.avif"

export function AboutSeller(){
    return (<section className="about-seller">
           <h3>About The Seller</h3>
           <div className="seller">
           <img className='catto' src={catto}/>
            <div>
            <p>Roei</p>
            <p>
                <img src={star}/>
                <img src={star}/>
                <img src={star}/>
                <img src={star}/>
                <img src={star}/>
                5
                (420)
            </p>
            <button>Contact Me</button>
            </div>
           </div>

           </section>)
}