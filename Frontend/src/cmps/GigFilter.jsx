import { useParams, useSearchParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import home from '../assets/img/svg/home.icon.svg'
// import { categories as cat } from '../services/gig.service.local.js'

export function GigFilter(filterBy) {
  const [searchParams] = useSearchParams()
  const queryParams = {}

  for (const [key, value] of searchParams) {
    queryParams[key] = value
  }

  useEffect(() => {
    console.log(queryParams.param1)
  }, [searchParams])

  return (
    <>
      {/* {quaryParams.search ? (
        <section className="search-param">
          <span className="title">
            results for <span className="search-word"></span>
          </span>
        </section>
      ) : (
        quaryParams.cat && (
          <section className="explore-category">
            <img src={home} alt="home-icon" />
          </section>
        )
      )} */}

      <section className="floating-top-bar"></section>
    </>
  )
}
