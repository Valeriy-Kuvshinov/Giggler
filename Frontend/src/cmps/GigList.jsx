// import { GigPreview } from './GigPreview.jsx'

// import _ from 'lodash'
// import { Loader } from './Loader.jsx'

// export function GigList({ gigs }) {
//   const isFrom = 'explore'

//   // if (!gigs.length) return <Loader />

//   return (
//     <ul className="gig-list layout-row">
//       {gigs.map((gig) => (
//         <GigPreview isFrom={isFrom} gig={gig} key={gig._id} />
//       ))}
//     </ul>
//   )
// }

import React, { useState, useEffect } from 'react'
import { GigPreview } from './GigPreview.jsx'

export function GigList({ gigs }) {
  const [showGigs, setShowGigs] = useState(false)
  const isFrom = 'explore'

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowGigs(true)
    }, 500)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <ul className={`gig-list layout-row ${showGigs ? 'show' : ''}`}>
      {gigs.map((gig) => (
        <GigPreview isFrom={isFrom} gig={gig} key={gig._id} />
      ))}
    </ul>
  )
}
