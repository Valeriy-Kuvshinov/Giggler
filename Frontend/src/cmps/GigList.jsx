
import React, { useState, useEffect } from "react"

import { GigPreview } from "./GigPreview.jsx"
import { Loader } from "./Loader.jsx"

export function GigList({ gigs , isLoading}) {
  const [showGigs, setShowGigs] = useState(false)
  const isFrom = "explore"

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowGigs(true)
    }, 500)

    return () => clearTimeout(timeout)
  }, [])

  if (isLoading) return <Loader />
  return (
    <ul className={`gig-list layout-row ${showGigs ? "show" : ""}`}>
      {gigs.map((gig) => (
        <GigPreview isFrom={isFrom} gig={gig} key={gig._id} />
      ))}
    </ul>
  )
}
