import { useState } from 'react'

import { ImageCarousel } from './ImageCarousel.jsx'
import { UserPreview } from './UserPreview.jsx'

export function GigDetailsHeader({ gig, owner }) {
  const [newImgIndex, setNewImgIndex] = useState(0)

  return (
    <section className="gig-details-header flex column">
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