import { useEffect } from "react"
import { useSelector } from "react-redux"

import { loadOrders } from "../store/order.actions"

import starIcon from "../assets/img/svg/star.icon.svg"

export function AboutSeller({ owner }) {
  const orders = useSelector((storeState) => storeState.orderModule.orders)
  var sellerOrders = orders.filter((order) => order.sellerId === owner._id)
  var completedOrders=sellerOrders.filter((order) => order.deniedAt || order.acceptedAt)
  var sum=0
  completedOrders.map((order)=>{
    if (order.deniedAt) sum += order.deniedAt - order.createdAt
    if (order.acceptedAt) sum += order.acceptedAt - order.createdAt
  })

  // console.log(sum/86400000)
  var average= sum / 86400000 / completedOrders.length
  // console.log(average)

  useEffect(() => {
    loadTheOrders()
  }, [])

  async function loadTheOrders() {
    try {
      await loadOrders()
    } catch (err) {
      console.log("couldnt load orders : ", err)
    }
  }
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const time = new Date(owner.createdAt * 1000)
  let month = months[time.getMonth()]
  let year = time.getFullYear()
  const time2 = new Date(owner.lastDelivery)
  let month2 = months[time2.getMonth()]
  let year2 = time2.getFullYear()

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
              <span>{Math.floor(average)} days</span>
            </div>
          </div>
          <div className="inner-details">
            <div className="inner-inner-details">
              <span>Member since</span>
              <span>
                {month} {year}
              </span>
            </div>
            <div className="inner-inner-details">
              <span>Last delivery</span>
              <span>
                {month2} {year2}
              </span>
            </div>
          </div>
        </div>
        <p>
          {owner.description}
        </p>
      </div>
    </section>
  )
}
