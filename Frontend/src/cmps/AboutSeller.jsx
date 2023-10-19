import starIcon from "../assets/img/svg/star.icon.svg"

export function AboutSeller({ owner }) {
  return (
    <section className="about-seller">
      <h3>About The Seller</h3>
      <div className="seller">
        <img className="seller-picture" src={owner.imgUrl} />
        <div className="seller-stats">
          <p>{owner.fullName}</p>
          <div className="stars2">
            <img src={starIcon} alt="star" />
            {owner.rating}
          </div>
        </div>
      </div>

      <button>Contact Me</button>
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
          ipsum perspiciatis itaque. Consequuntur dicta molestiae non ipsa
          nulla?
        </p>
      </div>
    </section>
  )
}
