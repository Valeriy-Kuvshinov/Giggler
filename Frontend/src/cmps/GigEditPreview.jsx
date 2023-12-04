import { useState } from 'react'

import { UserPreview } from "./UserPreview.jsx"
import { ImageCarousel } from './ImageCarousel.jsx'

export function GigEditPreview({ gig, loggedInUser }) {
    const [newImgIndex, setNewImgIndex] = useState(0)

    return (
        <div className="gig-preview-container grid">
            <div className="gig-preview-header flex row">
                <h3>{gig.title || "I will perform a freelancer service of an X type for a fee..."}</h3>
                <p>${gig.price}</p>
            </div>
            <UserPreview isFrom={'gig-details'} owner={loggedInUser} />

            <div className="gig-preview-images grid">
                {gig.imgUrls && (<ImageCarousel
                    isFrom={'gig-details'}
                    images={gig.imgUrls}
                    newImgIndex={newImgIndex}
                    setNewImgIndex={setNewImgIndex}
                />)}
                <div className="images-selection">
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
            </div>
            <p className="gig-description">{gig.description
                || "Hello! My name is X, and I specialize in X, if you came looking for X service, you came to the right place!..."}</p>

            <div className="gig-preview-filters grid">
                <h3>Your gig will be found under the following filters:</h3>
                <div className="info flex column">
                    <h4>Category:</h4>
                    <p><strong>{gig.category}</strong></p>
                </div>
                <div className="info flex column">
                    <h4>Subcategories:</h4>
                    <div>
                        {gig.tags.map((tag, idx) => (
                            <p key={idx}><strong>{tag}</strong></p>
                        ))}
                    </div>
                </div>
                <div className="info flex column">
                    <h4>Delivery time:</h4>
                    <p><strong>{gig.daysToMake}</strong></p>
                </div>
            </div>
        </div>
    )
}