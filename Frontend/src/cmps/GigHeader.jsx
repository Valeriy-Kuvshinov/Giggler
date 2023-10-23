import starIcon from "../assets/img/svg/star.icon.svg"
import houseIcon from "../assets/img/svg/home.icon.svg"

import { useEffect } from "react"
import { useSelector } from "react-redux"

import { loadOrders } from "../store/order.actions"

import { Link } from "react-router-dom"

export function GigHeader({ gig, owner }) {
  const orders = useSelector((storeState) => storeState.orderModule.orders)
  var sellerOrders = orders.filter((order) => order.sellerId === owner._id)
  var completedOrders = sellerOrders.filter(
    (order) => order.deniedAt || order.acceptedAt
  )

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

  return (
    <section style={{ overflow: "hidden" }} className="gig-header">
      <h2>{gig.title}</h2>
      <div className="header">
        <img
          className="seller-picture"
          src={owner.imgUrl}
          alt="Seller Avatar"
        />
        <div className="user-stats">
          <p>{owner.fullName}</p>

          <p className="stars">
            <div>
              <img src={starIcon} alt="star" />
              <span>{owner.rating}</span>
            </div>
            <span className="divider">|</span>
            <span className="orders-in-queue">
              <span>{sellerOrders.length - completedOrders.length}</span>
              <span>
                {sellerOrders.length - completedOrders.length !== 1
                  ? "Orders"
                  : "Order"}
              </span>
              <span>in Queue</span>
            </span>
          </p>
        </div>
      </div>
      <img src={gig.imgUrls[0]} alt="Main gig" />

      <div className="gig-images">
        {gig.imgUrls.map((imgUrl, idx) => (
          <img src={imgUrl} key={idx} alt={`Gig image ${idx}`} />
        ))}
      </div>
    </section>
  )
}
