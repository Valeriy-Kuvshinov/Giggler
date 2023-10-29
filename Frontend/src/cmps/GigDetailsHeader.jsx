import { useEffect, useState } from 'react'

import { loadOrders } from '../store/order.actions'

import { ImageCarousel } from './ImageCarousel'
import { UserPreview } from './UserPreview'

export function GigDetailsHeader({ gig, owner }) {
  const [newImgIndex, setNewImgIndex] = useState(0)

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
      <ImageCarousel
        isFrom={'gig-details'}
        images={gig.imgUrls}
        gigId={gig._id}
        newImgIndex={newImgIndex}
        setNewImgIndex={setNewImgIndex}
      />
      <div className="gig-thumbnail">
        {gig.imgUrls.map((imgUrl, idx) => (
          <img
            className={`${idx === newImgIndex ? 'selected' : ''}`}
            onClick={() => setNewImgIndex(idx)}
            src={imgUrl}
            key={idx}
            alt={`Gig image ${idx}`}
          />
        ))}
      </div>
    </section>
  )
}