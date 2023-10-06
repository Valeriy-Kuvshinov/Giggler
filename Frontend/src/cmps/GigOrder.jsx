import clock from "../assets/img/svg/clock.icon.svg"
import refresh from "../assets/img/svg/refresh.icon.svg"
import checkmark from "../assets/img/svg/checkmark.icon.svg"
import arrow from "../assets/img/svg/arrow.icon.svg"
import { Link } from "react-router-dom"

export function GigOrder({ gig }) {
  function onContinue() {
    console.log("continue!")
  }

  return (
    <section className="gig-order">
      <div className="title">
        <span>Order Details</span>
        <span>US${gig.price}</span>
      </div>
      <p>
        1 custom logo+high resolution file+3d mockup+logo transparency+ 300dpi
      </p>
      <div className="shipping-info">
        <div className="inside-shipping">
          <img src={clock} />
          <span> {gig.daysToMake} Days Delivery</span>
        </div>
        <div className="inside-shipping">
          <img src={refresh} />
          <span>Unlimited Revisions</span>
        </div>
      </div>
      <ul>
        <li>
          <img src={checkmark} />1 concept included
        </li>
        <li>
          <img src={checkmark} />
          Logo transparency
        </li>
        <li>
          <img src={checkmark} />
          Vector file
        </li>
        <li>
          <img src={checkmark} />
          Printable file
        </li>
        <li>
          <img src={checkmark} />
          Include 3D mockup
        </li>
        <li>
          <img src={checkmark} />
          Include source file
        </li>
        <li>
          <img src={checkmark} />
          Include social media kit
        </li>
      </ul>
      <Link to={`/purchase/${gig._id}`}>
        <div className="continue">
          <button onClick={onContinue}>
            Continue <img src={arrow} />
          </button>
        </div>
      </Link>
    </section>
  )
}
