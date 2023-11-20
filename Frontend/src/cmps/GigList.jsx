import { GigPreview } from './GigPreview.jsx'

import _ from 'lodash'
import { Loader } from './Loader.jsx'

export function GigList({ gigs }) {
  const isFrom = 'explore'

  if (!gigs.length) return <Loader />

  return (
    <ul className="gig-list layout-row">
      {gigs.map((gig) => (
        <GigPreview isFrom={isFrom} gig={gig} key={gig._id} />
      ))}
    </ul>
  )
}
