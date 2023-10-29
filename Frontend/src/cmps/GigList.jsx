import { GigPreview } from './GigPreview.jsx'

import _ from 'lodash'

export function GigList({ gigs }) {
  const is = 'explore'

  return (
    <ul className="gig-list layout-row">
      {gigs.map((gig) => (
        <GigPreview is={is} gig={gig} key={gig._id} />
      ))}
    </ul>
  )
}