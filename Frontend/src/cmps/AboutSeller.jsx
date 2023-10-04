import star from "../assets/img/svg/star.icon.svg"
import catto from "../assets/img/catto.avif"

export function AboutSeller({gig}) {
  const rating=gig.owner.rate
    var stars=''
    for(var i=0;i<rating;i++){
        stars+='<img src=/src/assets/img/svg/star.icon.svg />'
    }
    function load(){
        document.querySelector(".stars2").innerHTML=stars+`${rating}`+`(${gig.likedByUsers.length})`
    }
    setTimeout(load,10)

  return (
    <section className="about-seller">
      <h3>About The Seller</h3>
      <div className="seller">
        <img className="catto" src={catto} />

        <div>
          <p>Roei</p>
          <p className="stars2">
          </p>
          <button>Contact Me</button>
        </div>
      </div>
      
      <div className="seller-info">
      <div className="seller-details">
        <div className="inner-details">
          <div className="inner-inner-details">
            <span>From</span>
            <span>Breadville</span>
          </div>
          <div className="inner-inner-details">
            <span>Avg. response time</span>
            <span>69 Hours</span>
          </div>
        </div>
        <div className="inner-details">
          <div className="inner-inner-details">
            <span>Member since</span>
            <span>May 42069</span>
          </div>
          <div className="inner-inner-details">
            <span>Last delivery</span>
            <span>April 69420</span>
          </div>
        </div>
      </div>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit esse,
        nobis a qui accusantium beatae enim non adipisci saepe, labore illo
        ipsum perspiciatis itaque. Consequuntur dicta molestiae non ipsa nulla?
      </p>
      </div>
    </section>
  )
}
