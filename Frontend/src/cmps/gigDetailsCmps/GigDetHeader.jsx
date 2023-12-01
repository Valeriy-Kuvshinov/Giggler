import { useState } from 'react'

import { ImageCarousel } from '../ImageCarousel.jsx'
import { UserPreview } from '../UserPreview.jsx'

export function GigDetHeader({ gig, owner, deviceType }) {
  const [newImgIndex, setNewImgIndex] = useState(0)

  return (
    <>
      {deviceType === 'mobile' ? (
        <section className="gig-details-header flex column">
          {gig.imgUrls && (<ImageCarousel
            isFrom={'gig-details'}
            images={gig.imgUrls}
            gigId={gig._id}
            newImgIndex={newImgIndex}
            setNewImgIndex={setNewImgIndex}
          />)}
          <div className="gig-overview">
            <UserPreview isFrom={'gig-details'} owner={owner} />
            <h2>{gig.title}</h2>
          </div>
        </section>
      ) : (
        <section className="gig-details-header flex column">
          <div className="gig-overview">
            <h2>{gig.title}</h2>
            <UserPreview isFrom={'gig-details'} owner={owner} />
          </div>
          {gig.imgUrls && (<ImageCarousel
            isFrom={'gig-details'}
            images={gig.imgUrls}
            gigId={gig._id}
            newImgIndex={newImgIndex}
            setNewImgIndex={setNewImgIndex}
          />)}
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
      )}
    </>
  )
}