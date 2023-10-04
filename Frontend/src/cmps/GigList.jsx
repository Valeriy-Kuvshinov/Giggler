import React, { useState } from 'react'
import { GigPreview } from './GigPreview.jsx'
import _ from 'lodash'

export function GigList({ gigs, onRemoveGig, onUpdateGig, onAddGig }) {
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const is = 'explore'

  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(criteria)
      setSortOrder('asc')
    }
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const sortedGigs = _.orderBy(gigs, sortBy, sortOrder)

  return (
      <ul className="gig-list layout-row">
        {sortedGigs.map((gig) => (
          <li className="gig-preview" key={gig._id}>
            <GigPreview
              is={is}
              gig={gig}
              key={gig._id}
            />
          </li>
        ))}
      </ul>
  )
}
