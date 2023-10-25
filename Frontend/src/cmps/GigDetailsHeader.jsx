import starIcon from '../assets/img/svg/star.icon.svg'
import houseIcon from '../assets/img/svg/home.icon.svg'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadOrders } from '../store/order.actions'

import { Link } from 'react-router-dom'
import { ImageCarousel } from './ImageCarousel'
import { UserPreview } from './UserPreview'

export function GigDetailsHeader({ gig, owner }) {
  // const orders = useSelector((storeState) => storeState.orderModule.orders)
  // var completedOrders = orders.filter((order) => order.sellerId === owner._id).filter(
  //   (order) => order.deniedAt || order.acceptedAt)

  useEffect(() => {
    loadTheOrders()
  }, [])

  async function loadTheOrders() {
    try {
      await loadOrders()
    } catch (err) {
      console.log('couldnt load orders : ', err)
    }
  }

  return (
    <section style={{ overflow: 'hidden' }} className="gig-details-header">
      <div className="gig-overview">
        <h2 className="gig-title">{gig.title}</h2>
        <UserPreview is={'gig-details'} owner={owner} />
      </div>
      <ImageCarousel images={gig.imgUrls} gigId={gig._id} />
      <div className="gig-thumbnail">
        {gig.imgUrls.map((imgUrl, idx) => (
          <img src={imgUrl} key={idx} alt={`Gig image ${idx}`} />
        ))}
      </div>
    </section>
  )
}
